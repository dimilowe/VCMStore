const { Client } = require("@replit/object-storage");

async function initializeStorage() {
  try {
    const client = new Client();
    console.log("Initializing App Storage bucket...");
    
    await client.init("vcm-store-files");
    
    console.log("✓ App Storage bucket initialized successfully!");
    console.log("Your files will be stored in the 'vcm-store-files' bucket.");
    
  } catch (error) {
    console.error("Error initializing storage:", error);
    process.exit(1);
  }
}

initializeStorage();
