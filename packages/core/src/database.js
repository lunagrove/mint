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

export async function editProfile(userid, firstname, lastname, phonenumber, location, linkedin, website) {
  const res = await getPool().query(`
  UPDATE users SET firstname = $2, lastname = $3, phonenumber = $4,
  location = $5, linkedin = $6, website = $7 
  WHERE userId = $1
  RETURNING *
  `, [userid, firstname, lastname, phonenumber, location, linkedin, website])
  return res.rows[0]
}

export async function createSkill(userid, description) {
  const res = await getPool().query(`
  INSERT INTO skill (userId, description)
  VALUES ($1, $2)
  RETURNING *
  `, [userid, description])
  return res.rows[0];
}

export async function deleteSkill(userId, skillId) {
  const res = await getPool().query(`
  DELETE FROM skill
  WHERE userid = $1
  AND skillid = $2
  RETURNING *
  `, [userId, skillId])
  return res.rows[0]
}

export async function editSkill(userid, skillid, description) {
  const res = await getPool().query(`
  UPDATE skill SET description = $3 
  WHERE userId = $1
  AND skillid = $2
  RETURNING *
  `, [userid, skillid, description])
  return res.rows[0]
}