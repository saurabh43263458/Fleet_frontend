import React from 'react'
import { createContext, useState } from 'react'
export const CaptainContext = createContext();
const CaptainDataProvider = ({children}) => {
    const [captain,setCaptain] = useState({
        name:"",
        email:"",
    });
  return (
    <CaptainContext.Provider value={{captain,setCaptain}}>
     {children}
    </CaptainContext.Provider>
  )
}

export default CaptainDataProvider