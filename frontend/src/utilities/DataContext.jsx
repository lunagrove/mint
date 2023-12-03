import { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    profile: {},
    intro: [],
    snippets: [],
    skills: [],
    education: []
  }); 

  const updateUserData = (newData) => {
    setUserData(newData);
  };

  return (
    <DataContext.Provider value={{ userData, updateUserData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};