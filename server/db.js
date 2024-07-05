import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST || 'database-datacoders.c3m48simgdzn.eu-west-3.rds.amazonaws.com',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'dataCoders2024+',
  database: process.env.DB_NAME || 'db_datacoders',
});


async function testConnection() {
  try {
    const [rows] = await db.query('SELECT * FROM user_info where id_user_info = 1');
    console.log('Database connection test successful!');
    return rows;
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
}

testConnection();

export default db;
