import React, {createContext,useState} from 'react'

export const UserContext =createContext();

const UserDataProvider = ({children})=>{
    const [user,setUser] = useState({
        name:"",
        email:""
    })
    return (
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
    )
}
export default UserDataProvider