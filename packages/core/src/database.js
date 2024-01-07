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

export async function getIntro(userId) {
  const res = await getPool().query(`
  SELECT * FROM intro
  WHERE userid = $1
  ORDER BY createdon DESC
  `, [userId]);
  return res.rows;
}

export async function createIntro(userid, statement) {
  const res = await getPool().query(`
  INSERT INTO intro (userId, snippet)
  VALUES ($1, $2)
  RETURNING *
  `, [userid, statement])
  return res.rows[0];
}

export async function deleteIntro(userId, introId) {
  const res = await getPool().query(`
  DELETE FROM intro
  WHERE userid = $1
  AND introid = $2
  RETURNING *
  `, [userId, introId])
  return res.rows[0]
}

export async function editIntro(userid, introid, statement) {
  const res = await getPool().query(`
  UPDATE intro SET snippet = $3 
  WHERE userId = $1
  AND introid = $2
  RETURNING *
  `, [userid, introid, statement])
  return res.rows[0]
}

export async function getEducation(userId) {
  const res = await getPool().query(`
  SELECT * FROM education
  WHERE userid = $1
  `, [userId]);
  return res.rows;
}

export async function createEducation(userid, institution, location) {
  const res = await getPool().query(`
  INSERT INTO education (userId, institution, location)
  VALUES ($1, $2, $3)
  RETURNING *
  `, [userid, institution, location])
  return res.rows[0];
}

export async function editEducation(userid, educationid, institution, location) {
  const res = await getPool().query(`
  UPDATE education SET institution = $3, location = $4 
  WHERE userId = $1
  AND educationid = $2
  RETURNING *
  `, [userid, educationid, institution, location])
  return res.rows[0]
}

export async function deleteEducation(userId, educationId) {
  const res = await getPool().query(`
  DELETE FROM education
  WHERE userid = $1
  AND educationid = $2
  RETURNING *
  `, [userId, educationId])
  return res.rows[0]
}

export async function getCourses(userId, educationId) {
  const res = await getPool().query(`
  SELECT * FROM course
  WHERE userid = $1 AND educationid = $2
  ORDER BY todate DESC
  `, [userId, educationId]);
  return res.rows;
}

export async function deleteCourse(userId, educationId, courseId) {
  const res = await getPool().query(`
  DELETE FROM course
  WHERE userid = $1
  AND educationid = $2
  AND courseid = $3
  RETURNING *
  `, [userId, educationId, courseId])
  return res.rows[0]
}

export async function createCourse(userid, educationId, description, fromDate, toDate, current, type ) {
  const res = await getPool().query(`
  INSERT INTO course (userId, educationId, description, fromdate, todate, current, coursetype)
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  RETURNING courseid, *
  `, [userid, educationId, description, fromDate, toDate, current, type])
  return res.rows[0];
}

export async function editCourse(userId, educationId, courseId, description, fromDate, toDate, current, type) {
  const res = await getPool().query(`
  UPDATE course SET description = $4, fromdate = $5, todate = $6, current = $7, coursetype = $8
  WHERE userid = $1
  AND educationid = $2
  AND courseid = $3
  RETURNING *
  `, [userId, educationId, courseId, description, fromDate, toDate, current, type])
  return res.rows[0]
}

export async function getCompanies(userId) {
  const res = await getPool().query(`
  SELECT * FROM company
  WHERE userid = $1
  `, [userId]);
  return res.rows;
}

export async function createCompany(userid, companyName, description) {
  const res = await getPool().query(`
  INSERT INTO company (userId, companyname, description)
  VALUES ($1, $2, $3)
  RETURNING *
  `, [userid, companyName, description])
  return res.rows[0];
}

export async function editCompany(userid, companyid, companyname, description) {
  const res = await getPool().query(`
  UPDATE company SET companyname = $3, description = $4 
  WHERE userId = $1
  AND companyid = $2
  RETURNING *
  `, [userid, companyid, companyname, description])
  return res.rows[0]
}

export async function deleteCompany(userId, companyId) {
  const res = await getPool().query(`
  DELETE FROM company
  WHERE userid = $1
  AND companyid = $2
  RETURNING *
  `, [userId, companyId])
  return res.rows[0]
}

export async function getRoles(userId, companyId) {
  const res = await getPool().query(`
  SELECT * FROM role
  WHERE userid = $1 AND companyid = $2
  ORDER BY todate DESC
  `, [userId, companyId]);
  return res.rows;
}

export async function deleteRole(userId, companyId, roleId) {
  const res = await getPool().query(`
  DELETE FROM role
  WHERE userid = $1
  AND companyid = $2
  AND roleid = $3
  RETURNING *
  `, [userId, companyId, roleId])
  return res.rows[0]
}

export async function createRole(userid, companyId, description, fromDate, toDate, current ) {
  const res = await getPool().query(`
  INSERT INTO role (userId, companyId, description, fromdate, todate, current)
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING roleid, *
  `, [userid, companyId, description, fromDate, toDate, current])
  return res.rows[0];
}

export async function editRole(userId, companyId, roleId, description, fromDate, toDate, current) {
  const res = await getPool().query(`
  UPDATE role SET description = $4, fromdate = $5, todate = $6, current = $7
  WHERE userid = $1
  AND companyid = $2
  AND roleid = $3
  RETURNING *
  `, [userId, companyId, roleId, description, fromDate, toDate, current])
  return res.rows[0]
}

export async function getHobbies(userId) {
  const res = await getPool().query(`
  SELECT * FROM hobby
  WHERE userid = $1
  ORDER BY createdon DESC
  `, [userId]);
  return res.rows;
}

export async function createHobby(userid, description, snippet ) {
  const res = await getPool().query(`
  INSERT INTO hobby (userId, description, snippet)
  VALUES ($1, $2, $3)
  RETURNING *
  `, [userid, description, snippet])
  return res.rows[0];
}

export async function deleteHobby(userId, hobbyId) {
  const res = await getPool().query(`
  DELETE FROM hobby
  WHERE userid = $1
  AND hobbyid = $2
  RETURNING *
  `, [userId, hobbyId])
  return res.rows[0]
}

export async function editHobby(userid, hobbyid, description, snippet) {
  const res = await getPool().query(`
  UPDATE hobby SET description = $3, snippet = $4 
  WHERE userId = $1
  AND hobbyid = $2
  RETURNING *
  `, [userid, hobbyid, description, snippet])
  return res.rows[0]
}

export async function getProjects(userId) {
  const res = await getPool().query(`
  SELECT * FROM project
  WHERE userid = $1
  ORDER BY createdon DESC
  `, [userId]);
  return res.rows;
}

export async function createProject(userid, description, snippet ) {
  const res = await getPool().query(`
  INSERT INTO project (userId, description, snippet)
  VALUES ($1, $2, $3)
  RETURNING *
  `, [userid, description, snippet])
  return res.rows[0];
}

export async function deleteProject(userId, projectId) {
  const res = await getPool().query(`
  DELETE FROM project
  WHERE userid = $1
  AND projectid = $2
  RETURNING *
  `, [userId, projectId])
  return res.rows[0]
}

export async function editProject(userid, projectid, description, snippet) {
  const res = await getPool().query(`
  UPDATE project SET description = $3, snippet = $4 
  WHERE userId = $1
  AND projectid = $2
  RETURNING *
  `, [userid, projectid, description, snippet])
  return res.rows[0]
}

export async function getSnippets(userId) {
  const res = await getPool().query(`
  SELECT * FROM experience
  WHERE userid = $1
  ORDER BY createdon DESC
  `, [userId]);
  return res.rows;
}

export async function createSnippet(userid, snippet, skillIds, tagId, tagType) {
  const res = await getPool().query(`
  INSERT INTO experience (userId, snippet, skillids, tagid, tagtype)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING experienceid, *
  `, [userid, snippet, skillIds, tagId, tagType])
  return res.rows[0];
}

export async function deleteSnippet(userId, snippetId) {
  const res = await getPool().query(`
  DELETE FROM experience
  WHERE userid = $1
  AND experienceid = $2
  RETURNING *
  `, [userId, snippetId])
  return res.rows[0]
}

export async function editSnippet(userid, snippetid, snippet, skills, tagid, tagtype) {
  const res = await getPool().query(`
  UPDATE experience SET snippet = $3, skillids = $4, tagid = $5, tagtype = $6 
  WHERE userId = $1
  AND experienceid = $2
  RETURNING *
  `, [userid, snippetid, snippet, skills, tagid, tagtype])
  return res.rows[0]
}

export async function removeTag(userid, tagid, tagtype) {
  try {
    const res = await getPool().query(`
      UPDATE experience 
      SET tagid = null, tagtype = '' 
      WHERE userId = $1
        AND tagid = $2
        AND tagtype = $3
    `, [userid, tagid, tagtype]);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function removeSkillTag(userid, skillId) {
  try {
    console.log('userId', userid);
    console.log('skillId', skillId);
    const res = await getPool().query(`
      UPDATE experience 
      SET skillids = array_remove(skillids, $2::UUID)
      WHERE userId = $1
        AND $2::UUID = ANY(skillids);
    `, [userid, skillId]);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
