import { Pool, neonConfig } from '@neondatabase/serverless';
import ws from "ws";

// Configure Neon for serverless environments (like APE)
neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Use Neon serverless driver for both dev and production
// This ensures one shared database across all environments
export const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 30000,
});

async function executeWithRetry<T>(
  operation: () => Promise<T>,
  retries = 5
): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      return await operation();
    } catch (error: any) {
      const isLastAttempt = i === retries - 1;
      const isSuspendError = error?.message?.includes('endpoint') && 
                            error?.message?.includes('disabled');
      
      if (isLastAttempt || !isSuspendError) {
        throw error;
      }
      
      const delay = 2000 * (i + 1);
      console.log(`Database connection retry ${i + 1}/${retries} after ${delay}ms (endpoint waking up)`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  throw new Error('Max retries exceeded');
}

export async function query(text: string, params?: any[]) {
  const start = Date.now();
  const res = await executeWithRetry(() => pool.query(text, params));
  const duration = Date.now() - start;
  console.log('executed query', { text, duration, rows: res.rowCount });
  return res;
}
