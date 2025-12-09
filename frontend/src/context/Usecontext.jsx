import React, { createContext, useState, useEffect } from 'react'
import {getlocation} from "../utils/location";
export const Usercontext = createContext({ user:null, setuser:() => {} })
const ContextProvider = (props) => {
    
    const [user , setuser] = useState({
        firstname:"",
        lastname:"",
        email:"",
        password:"",
    })
    const [location, setLocation] = useState(null);
    const [droploc, setDroploc] = useState(null);
    const [droplocname, setDroplocname] = useState("");
    const [vechicle,setvechicle]=useState("")
    const [Price,setPrice]=useState(0)
    const [pickupname, setPickupname] = useState("");
    const [pickupppp, setPickupppp] = useState("");

    
    useEffect(() => {
        getlocation().then((data) => {
            if(data){
                setLocation(data);
            }
        }).catch((error) => {
            console.error("Error getting location:", error);
        });
    }, []);
    return (
        <Usercontext.Provider value={{ user, setuser, location, setLocation ,droploc,setDroploc,droplocname,setDroplocname ,vechicle,setvechicle,Price,setPrice,pickupname,setPickupname,setPickupppp}}>
            {props.children}
        </Usercontext.Provider>
    )
}
export default ContextProvider

