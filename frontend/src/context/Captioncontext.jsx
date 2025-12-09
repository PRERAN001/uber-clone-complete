import React, { createContext, useState } from 'react'
const captioncontext = createContext({ user:null, setuser:() => {} })
const ContextProvider = (props) => {
    
    const [caption , setcaption] = useState({
        firstname:"",
        lastname:"",
        email:"",
        password:"",
        vechicle:{
            color:"",
            plate:"",
            capacity:"",
            vechicletype:""
        }

    })
    return (
        <captioncontext.Provider value={{ caption, setcaption }}>
            {props.children}
        </captioncontext.Provider>
    )
}
export default ContextProvider
export {captioncontext}

