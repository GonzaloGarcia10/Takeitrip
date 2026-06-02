const { execSync } = require('child_process');
const { existsSync } = require('fs');

function run(cmd) {
  console.log(`> ${cmd}`);
  execSync(cmd, { stdio: 'inherit' });
}

try {
  run('npx prisma generate');

  const migrationsDir = './prisma/migrations';
  if (existsSync(migrationsDir)) {
    console.log('Migrations directory found — running prisma migrate deploy');
    run('npx prisma migrate deploy');
  } else {
    console.log('No migrations found — running prisma db push');
    run('npx prisma db push --accept-data-loss');
  }

  run('next build');
} catch (err) {
  console.error('Build script failed', err);
  process.exit(1);
}
