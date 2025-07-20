import { createContext, useContext } from "react";

const appContext = createContext()

export const AppProvider = ({children}) =>{

    const value={

    }

    return(
        <appContext.Provider value={value}>
            {children}
        </appContext.Provider>
    )
}

export const useAppContext = ()=>{
    return useContext(appContext)
}