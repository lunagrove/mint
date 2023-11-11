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
  ORDER BY experienceId DESC LIMIT 5
  `, [userId]);
  return res.rows;
}

