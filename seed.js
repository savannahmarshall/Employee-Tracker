const pool = require('./connection'); // Import the pool

const fs = require('fs');
const path = require('path');

const seedFile = path.join(__dirname, 'db', 'seeds.sql');

const runSeed = async () => {
  const client = await pool.connect();
  try {
    const sql = fs.readFileSync(seedFile, 'utf8');
    await client.query(sql);
    console.log('Database seeded successfully');
  } catch (err) {
    console.error('Error seeding database', err);
  } finally {
    client.release();
    await pool.end(); // Ensure the pool is closed after seeding
  }
};

runSeed();