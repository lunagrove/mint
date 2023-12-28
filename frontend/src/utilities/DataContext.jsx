import { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    profile: {},
    intro: [],
    snippets: [],
    skills: [],
    education: [],
    companies: [],
    projects: [],
    hobbies: []
  }); 

  const updateUserData = (newData) => {
    setUserData(newData);
  };

  const calculateMaxToDate = (details) => {
    if (details.length === 0) {
      return Infinity;
    }
    return details.reduce((maxDate, entry) => {
      const toDate = entry.current ? new Date().getTime() : new Date(entry.todate).getTime();
      return Math.max(maxDate, toDate);
    }, 0);
  };

  const sortCompaniesByMaxToDate = (companiesData) => {
    const sortedCompanies = [...companiesData].sort((a, b) => {
      const maxToDateA = calculateMaxToDate(a.details || []);
      const maxToDateB = calculateMaxToDate(b.details || []);
      return maxToDateB - maxToDateA;
    });
    return sortedCompanies;
  };

  const sortEducationByMaxToDate = (educationData) => {
    const sortedEducation = [...educationData].sort((a, b) => {
      const maxToDateA = calculateMaxToDate(a.details || []);
      const maxToDateB = calculateMaxToDate(b.details || []);
      return maxToDateB - maxToDateA;
    });
    return sortedEducation;
  };

  return (
    <DataContext.Provider
    value={{
      userData: {...userData,
                 education: sortEducationByMaxToDate(userData.education),
                 companies: sortCompaniesByMaxToDate(userData.companies)
      },
      updateUserData,
      sortCompaniesByMaxToDate,
      sortEducationByMaxToDate
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};