import pg from 'pg';
const { Pool } = pg;

let pool;
function getPool() {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL;
    pool = new Pool({
      connectionString,
      application_name: "",
      max: 1,
    });
  }
  return pool;
}

export async function getSnippets(userId) {
  const res = await getPool().query(`
  SELECT * FROM experience
  WHERE userid = $1
  ORDER BY experienceId DESC LIMIT 3
  `, [userId]);
  return res.rows;
}

export async function getProfile(userId) {
  const res = await getPool().query(`
  SELECT * FROM users
  WHERE userid = $1
  `, [userId]);
  return res.rows[0];
}

export async function createUser(userId, emailaddress) {
  const res = await getPool().query(`
  INSERT INTO users (userId, emailaddress)
  VALUES ($1, $2)
  RETURNING userId, emailaddress`, [userId, emailaddress])
  return res.rows[0];
}

export async function getSkills(userId) {
  const res = await getPool().query(`
  SELECT * FROM skill
  WHERE userid = $1
  `, [userId]);
  return res.rows;
}