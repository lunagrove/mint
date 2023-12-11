import React from 'react';
import { useState, useEffect } from 'react';
import EditIntroRow from './EditIntroRow';
import { Auth, API } from "aws-amplify";
import { useData } from '../utilities/DataContext';

const EditIntro = ({ onAdd, onDelete }) => {

    const { userData, updateUserData } = useData();

    const [currentStatements, setCurrentStatements] = useState(userData.intro);
    const [numStatements, setNumStatements] = useState(userData.intro.length);
    const [statement, setStatement] = useState("");
    const [editingIntroId, setEditingIntroId] = useState(null);
    const isAnyStatementBeingEdited = editingIntroId !== null;

    useEffect(() => {
        setCurrentStatements(userData.intro);
        setNumStatements(userData.intro.length);
    }, [userData.intro]);

    const handleInputChange = (event) => {
        setStatement(event.target.value); 
    };

    const handleAddClick = async () => {
        try {
            setEditingIntroId(null);
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
                    updateUserData((prevUserData) => {
                        return {
                            ...prevUserData,
                            intro: [newStatement, ...prevUserData.intro]
                        };
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
                updateUserData((prevUserData) => {
                    return {
                        ...prevUserData,
                        intro: prevUserData.intro.filter(statement => statement.introid !== introId),
                    };
                }); 
            }
        }
        catch (error) {
              alert(error);
        }
    };

    const handleEdit = async (introId, statement) => {
        try {
              const result = await API.put("api", `/intro/${introId}`, {
                headers: {
                  Authorization: `Bearer ${(await Auth.currentSession())
                    .getAccessToken()
                    .getJwtToken()}`,
                },
                body: { description: statement },
              });
              console.log('result: ', result);
              if (result) {
                    setCurrentStatements((prevStatements) =>
                        prevStatements.map((prevStatement) =>
                            prevStatement.introid === introId ? { ...prevStatement, snippet: statement } : prevStatement
                    ));
              };
              updateUserData((prevUserData) => {
                    return {
                        ...prevUserData,
                        intro: prevUserData.intro.map((prevStatement) =>
                            prevStatement.introid === introId ? { ...prevStatement, snippet: statement } : prevStatement
                        ),
                    };
              });
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
            <div className="intro-content">
                <div className="add-intro">
                    <form className="add-intro-form">
                            <h5 className="form-label">Introductory statement</h5>
                            <textarea className="form-textarea"
                                      id="statement" 
                                      name="statement"
                                      value={statement}
                                      rows="4"
                                      cols="50"
                                      onChange={handleInputChange}
                                      disabled={isAnyStatementBeingEdited}>
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
                        {currentStatements && currentStatements.length > 0 ? (
                            currentStatements.map((item) =>
                                <EditIntroRow key={item.introid}
                                              statement={item}
                                              onDelete={handleDelete}
                                              onEdit={handleEdit}
                                              editingIntroId={editingIntroId}
                                              setEditingIntroId={setEditingIntroId} />
                            )
                        ) : ( 
                            <li className="center-vertically">
                                <h2>You have no introductory statements saved. Try adding an introductory statement!</h2>
                            </li>      
                        )}
                    </ul>
            </div>
        </>
    );
};

export default EditIntro;