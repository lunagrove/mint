import { Auth, API } from "aws-amplify";

const fetchProfile = async (userId, email) => {
  let response;
  try {
    const session = await Auth.currentSession();
    const token = session.getAccessToken().getJwtToken();
    response = await API.get("api", "/profile", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (!response.profile) {       
      const res = await API.post("api", "/user", {
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: {
          userId: userId,
          email: email
          }
        });
        console.log('res', res);
        if (res) {
          response = res;
        }
    }
  } catch (error) {
    console.log(error);
  }
  return response ? response.profile : null;
};

const fetchIntro = async () => {
  let response;
  try {
    const session = await Auth.currentSession();
    const token = session.getAccessToken().getJwtToken();
    response = await API.get("api", "/intro", {
      headers: {
        Authorization: `Bearer ${token}`  
      }
    });
  } catch (error) {
    console.log(error);
  }
  return response ? response.statements : null;
};

const fetchSnippets = async () => {
  let response;
  try {
    const session = await Auth.currentSession();
    const token = session.getAccessToken().getJwtToken();
    response = await API.get("api", "/snippets", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    console.log(error);
  }
  return response ? response.experience : null;
};

const fetchSkills = async () => {
  let response;
  try {
    const session = await Auth.currentSession();
    const token = session.getAccessToken().getJwtToken();
    response = await API.get("api", "/skills", {
      headers: {
        Authorization: `Bearer ${token}`  
      }
    });
  } catch (error) {
    console.log(error);
  } 
  return response ? response.skills : null;
};

const fetchEducation = async () => {
  let response;
  try {
    const session = await Auth.currentSession();
    const token = session.getAccessToken().getJwtToken();
    response = await API.get("api", "/education", {
      headers: {
        Authorization: `Bearer ${token}`  
      }
    });
  } catch (error) {
    console.log(error);
  } 
  return response ? response.education : null;
};

const fetchCompanies = async () => {
  let response;
  try {
    const session = await Auth.currentSession();
    const token = session.getAccessToken().getJwtToken();
    response = await API.get("api", "/companies", {
      headers: {
        Authorization: `Bearer ${token}`  
      }
    });
  } catch (error) {
    console.log(error);
  } 
  return response ? response.companies : null;
};

const fetchHobbies = async () => {
  let response;
  try {
    const session = await Auth.currentSession();
    const token = session.getAccessToken().getJwtToken();
    response = await API.get("api", "/hobbies", {
      headers: {
        Authorization: `Bearer ${token}`  
      }
    });
  } catch (error) {
    console.log(error);
  }
  return response ? response.hobbies : null;
};

const fetchProjects = async () => {
  let response;
  try {
    const session = await Auth.currentSession();
    const token = session.getAccessToken().getJwtToken();
    response = await API.get("api", "/projects", {
      headers: {
        Authorization: `Bearer ${token}`  
      }
    });
  } catch (error) {
    console.log(error);
  }
  return response ? response.projects : null;
};

const fetchResumes = async () => {
  let response;
  try {
    const session = await Auth.currentSession();
    const token = session.getAccessToken().getJwtToken();
    response = await API.get("api", "/resumes", {
      headers: {
        Authorization: `Bearer ${token}`  
      }
    });
  } catch (error) {
    console.log(error);
  }
  return response ? response.resumes : null;
};
  
export { fetchProfile, fetchIntro, fetchSnippets, fetchSkills, fetchEducation, fetchCompanies, fetchHobbies, fetchProjects, fetchResumes };