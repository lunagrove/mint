import { useAuthenticator } from "@aws-amplify/ui-react";
import { Auth, API } from "aws-amplify";
import { FaSpinner } from "react-icons/fa";
import { IoSchoolOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Education from "../components/Education";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

function EducationPage() {

    const {user} = useAuthenticator((context) => [context.user]);

    const [education, setEducation] = useState([]);
    const [loadingEducation, setLoadingEducation] = useState(true);

    useEffect(() => {
        if (user) {
          fetchEducation();
        }
      }, [user]);

    const fetchEducation = async () => {
        try {
            const session = await Auth.currentSession();
            const token = session.getAccessToken().getJwtToken();
            const response = await API.get("api", "/education", {
                headers: {
                Authorization: `Bearer ${token}`  
                }
            });
            setEducation(response.education);
            setLoadingEducation(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="page-content">
            <div className="page-heading">
                <IoSchoolOutline className="icon-xlarge icon-margin-right" />
                <h2>Manage Education</h2>
            </div>

            {loadingEducation ? (
                <div className="page-list page-list-loading">
                    <FaSpinner className="spin icon-large" />
                </div>
            ) : (
                <>
                    <div className="page-list">
                        {education && education.length > 0 ? (education.map((item) =>
                            <Education key={item.educationId}
                                    education={item} />)
                        ) : (
                        <h2>You have no educational institutions saved. Try adding some educational institutions!</h2>
                        )}
                    </div>
                    <button type="button"
                        className="button-icon">
                            <Link to="/" className="link-text">
                                <MdOutlineKeyboardBackspace className="icon-medium icon-button"/>
                                <p>Dashboard</p>
                            </Link>
                    </button>
                </>
            )}
        </div>
  )};
  
  export default EducationPage;