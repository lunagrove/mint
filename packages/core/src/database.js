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

export async function getClickCount() {
  const res = await getPool().query(`
  SELECT clickcount FROM statistics
  WHERE id = 'CLICK COUNT'
  `);
  return res.rows[0].clickcount;
}

export async function editClickCount() {
  const res = await getPool().query(`
  UPDATE statistics SET clickcount = clickcount + 1 WHERE id = 'CLICK COUNT' RETURNING clickcount
  `);
  return res.rows[0].clickcount;
}

export async function createEmail(email, fname, lname) {
  const res = await getPool().query(`
  INSERT INTO emails (email, firstname, lastname)
  VALUES ($1, $2, $3)
  RETURNING id, email`, [email, fname, lname])
  return res.rows[0];
}