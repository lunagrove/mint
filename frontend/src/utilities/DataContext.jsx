import { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    profile: {},
    intro: [],
    snippets: [],
    skills: [],
    education: [],
    companies: []
  }); 

  const updateUserData = (newData) => {
    setUserData(newData);
  };

  const calculateSortOrder = (items) => {
    return items.reduce((acc, item) => {
      const allEntries = item.details || []; 
      const sortOrder = allEntries.reduce((entryAcc, entry) => {
        const fromDate = new Date(entry.fromDate).getTime();
        const toDate = new Date(entry.toDate).getTime();
        return entryAcc + (fromDate + toDate);
      }, 0);
      return acc + sortOrder;
    }, 0);
  };

  const sortedEducation = [...userData.education].sort((a, b) => {
    const sortOrderA = calculateSortOrder(a.details || []);
    const sortOrderB = calculateSortOrder(b.details || []);
    return sortOrderB - sortOrderA;
  });

  const sortedCompanies = [...userData.companies].sort((a, b) => {
    const sortOrderA = calculateSortOrder(a.details || []);
    const sortOrderB = calculateSortOrder(b.details || []);
    return sortOrderB - sortOrderA;
  });

  return (
    <DataContext.Provider
        value={{ userData: { ...userData, education: sortedEducation, companies: sortedCompanies },
                 updateUserData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};