import { createContext, useEffect, useState } from "react";
import { getItem, setItem } from "../LocalStorage";

export const Context = createContext()
const {Provider} = Context

export const ContextProvider = ({children}) => {
    const getToken= getItem("token_shop")
    const [token, setToken] = useState(getToken !== null? getToken: null)
    useEffect(() => {
        if(token !== null){
            setItem("token_shop", token)
        }
    },[token])
    const getUser = getItem("user_shop")
    const [user, setUser] = useState( getUser? JSON.parse(getUser): null )
    useEffect(() => {
        if(user !== null){
            setItem("user_shop", user)
        }
    },[user])
    const language = getItem("lang")
    const [til, setTil] = useState(language)
    const [data, setData] = useState([])
    return(
        <Provider value={{token, setToken, user, setUser, til, setTil, data, setData}}>
            {children}
        </Provider>
    )
}