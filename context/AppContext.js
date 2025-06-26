import { createContext, useContext, useState } from "react";

// PascalCase for context variable
const AppContext = createContext();

export const AppContextProvider = ({children}) => {
  const [checkoutContext, setCheckoutContext] = useState([]);

  return (
    <AppContext.Provider value={{checkoutContext, setCheckoutContext}}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
