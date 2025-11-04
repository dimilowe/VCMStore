import { query } from './db';
import bcrypt from 'bcryptjs';

export interface User {
  id: string;
  email: string;
  created_at: Date;
  is_admin?: boolean;
}

export async function createUser(email: string, password: string): Promise<User> {
  const passwordHash = await bcrypt.hash(password, 10);
  
  const result = await query(
    'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email, created_at',
    [email, passwordHash]
  );
  
  const user = result.rows[0];
  
  await query(
    'INSERT INTO profiles (id, display_name) VALUES ($1, $2)',
    [user.id, email.split('@')[0]]
  );
  
  return user;
}

export async function verifyPassword(email: string, password: string): Promise<User | null> {
  const result = await query(
    'SELECT id, email, password_hash, created_at, is_admin FROM users WHERE email = $1',
    [email]
  );
  
  if (result.rows.length === 0) {
    return null;
  }
  
  const user = result.rows[0];
  const isValid = await bcrypt.compare(password, user.password_hash);
  
  if (!isValid) {
    return null;
  }
  
  return {
    id: user.id,
    email: user.email,
    created_at: user.created_at,
    is_admin: user.is_admin,
  };
}

export async function findOrCreateUserByEmail(email: string): Promise<User> {
  const result = await query(
    'SELECT id, email, created_at FROM users WHERE email = $1',
    [email]
  );
  
  if (result.rows.length > 0) {
    return result.rows[0];
  }
  
  const newUserResult = await query(
    'INSERT INTO users (email) VALUES ($1) RETURNING id, email, created_at',
    [email]
  );
  
  const user = newUserResult.rows[0];
  
  await query(
    'INSERT INTO profiles (id, display_name) VALUES ($1, $2)',
    [user.id, email.split('@')[0]]
  );
  
  return user;
}
