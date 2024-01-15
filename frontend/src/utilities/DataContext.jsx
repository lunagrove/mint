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
    hobbies: [],
    resumes: [],
    currentResume: {}
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

  const sortDetailsByMaxToDate = (detailsData) => {
    const sortedDetails = [...detailsData].sort((a, b) => {
        const maxToDateA = a.current ? new Date().getTime() : new Date(a.todate).getTime();
        const maxToDateB = b.current ? new Date().getTime() : new Date(b.todate).getTime();
        return maxToDateB - maxToDateA;
    });
    return sortedDetails;   
};

  const sortCompaniesByMaxToDate = (companiesData) => {
    const sortedCompanies = [...companiesData].sort((a, b) => {
      const sortedDetailsA = sortDetailsByMaxToDate(a.details || []);
      const sortedDetailsB = sortDetailsByMaxToDate(b.details || []);
      const maxToDateA = calculateMaxToDate(sortedDetailsA);
      const maxToDateB = calculateMaxToDate(sortedDetailsB);
      return maxToDateB - maxToDateA;
    });
    return sortedCompanies;
  };

  const sortEducationByMaxToDate = (educationData) => {
    const sortedEducation = [...educationData].sort((a, b) => {
      const sortedDetailsA = sortDetailsByMaxToDate(a.details || []);
      const sortedDetailsB = sortDetailsByMaxToDate(b.details || []);
      const maxToDateA = calculateMaxToDate(sortedDetailsA || []);
      const maxToDateB = calculateMaxToDate(sortedDetailsB || []);
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
      sortEducationByMaxToDate,
      sortDetailsByMaxToDate
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};