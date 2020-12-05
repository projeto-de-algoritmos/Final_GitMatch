import React, {
  createContext,
  useContext,
  useState,
} from 'react';

const GlobalsContext = createContext({});

const GlobalsProvider= ({ children }) => {
  const [users, setUsers] = useState([]);
  
  return (
    <GlobalsContext.Provider
      value={{
        users,
        setUsers,
      }}
    >
      {children}
    </GlobalsContext.Provider>
  );
};

function useGlobals() {
  const context = useContext(GlobalsContext);

  if (!context) {
    throw new Error('useGlobals must be used within a GlobalsProvider');
  }

  return context;
}

export { GlobalsProvider, useGlobals };


