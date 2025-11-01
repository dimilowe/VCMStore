const bcrypt = require('bcryptjs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter admin password: ', async (password) => {
  if (!password) {
    console.error('Password is required');
    rl.close();
    process.exit(1);
  }

  const hash = await bcrypt.hash(password, 10);
  console.log('\nAdd this to your Secrets (in the Tools panel):');
  console.log('Key: ADMIN_PASSWORD_HASH');
  console.log('Value:', hash);
  console.log('\nAfter adding the secret, you can login at /admin');
  
  rl.close();
});
