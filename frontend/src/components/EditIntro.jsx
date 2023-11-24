import React from 'react';
import { useState, useEffect } from 'react';
import EditIntroRow from './EditIntroRow';
import { FaSpinner } from "react-icons/fa";
import { Auth, API } from "aws-amplify";

const EditIntro = ({ statements, loadingIntro, onAdd, onDelete }) => {

    const [currentStatements, setCurrentStatements] = useState(statements);
    const [numStatements, setNumStatements] = useState(statements.length);
    const [statement, setStatement] = useState("");

    useEffect(() => {
        setCurrentStatements(statements);
        setNumStatements(statements.length);
    }, [statements]);

    const handleInputChange = (event) => {
        setStatement(event.target.value); 
    };

    const handleAddClick = async () => {
        try {
//            setEditingSkillId(null);
            const result = await API.post("api", "/intro", {
                    headers: {
                        Authorization: `Bearer ${(await Auth.currentSession())
                        .getAccessToken()
                        .getJwtToken()}`,
                    },
                    body: {statement: statement}
            });
            if (result) {
                    const newStatement = result.statement;
                    setCurrentStatements(prevStatements => [newStatement, ...prevStatements]);
                    setStatement("");
                    setNumStatements(prevNumStatements => {
                        const updatedNumStatements = prevNumStatements + 1;
                        return updatedNumStatements;
                    });
            }
        }
        catch (error) {
            alert(error);
        }
    };

    const handleDelete = async (introId) => {
        try {
              await API.del("api", `/intro/${introId}`, {
                headers: {
                  Authorization: `Bearer ${(await Auth.currentSession())
                    .getAccessToken()
                    .getJwtToken()}`,
                }
              });
              const indexToDelete = currentStatements.findIndex(statement => statement.introid === introId);
              if (indexToDelete !== -1) {
                    setCurrentStatements(prevStatements => {
                          const updatedStatements = [...prevStatements];
                          updatedStatements.splice(indexToDelete, 1);
                          return updatedStatements;
                    });
                    setNumStatements(prevNumStatements => {
                          const updatedNumStatements = prevNumStatements - 1;
                          return updatedNumStatements;
                    }); 
              }
        }
        catch (error) {
              alert(error);
        }
    };

    useEffect(() => {
        onAdd(numStatements);
        onDelete(numStatements);
    }, [numStatements, onAdd, onDelete]);

    return (
        <>
            <div className="modal-content">
                <div className="add-intro">
                    <form className="add-intro-form">
                            <h6 className="form-label">Introductory statement</h6>
                            <textarea className="form-textarea"
                                      id="statement" 
                                      name="statement"
                                      value={statement}
                                      rows="4"
                                      cols="50"
                                      onChange={handleInputChange}>
                            </textarea>
                    </form>
                    {statement ? (
                        <img
                            className="plus-button add-intro-button"
                            src="./plus-icon-80x80.png"
                            alt="Plus icon"
                            onClick={handleAddClick}
                        />
                    ) : (
                            <img
                                className="plus-button add-intro-button disabled"
                                src="./plus-icon-80x80.png"
                                alt="Plus icon"
                            />
                    )}  
                </div>
                    <ul className={`edit-intro-list ${!currentStatements || currentStatements.length === 0 ? 'center-vertically' : ''}`}>
                        {loadingIntro ? (
                            <FaSpinner className="spin icon-large" />
                        ) : (
                            currentStatements && currentStatements.length > 0 ? (
                                currentStatements.map((item) =>
                                    <EditIntroRow key={item.introid}
                                                  statement={item}
                                                  onDelete={handleDelete} />
                                )
                            ) : ( 
                                <li className="center-vertically">
                                    <h2>You have no introductory statements saved. Try adding an introductory statement!</h2>
                                </li>      
                            )
                        )}
                    </ul>
            </div>
        </>
    );
};

export default EditIntro;