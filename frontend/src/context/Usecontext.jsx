import React, { createContext, useState, useEffect } from 'react'
import { getlocation } from "../utils/location";

export const Usercontext = createContext({ user: null, setuser: () => {} })

const ContextProvider = (props) => {
    
    const [user, setuser] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
    })
    
    const [location, setLocation] = useState(null);
    const [droploc, setDroploc] = useState(null);
    const [droplocname, setDroplocname] = useState("");
    const [vechicle, setvechicle] = useState("");
    const [Price, setPrice] = useState(0);
    const [pickupname, setPickupname] = useState("");
    const [pickupppp, setPickupppp] = useState("");
    const [invitieacc, setinvitieacc] = useState(false);
    
    // Initialize finalpickup and finaldrop from localStorage
    const [finalpickup, setFinalpickup] = useState(() => {
        try {
            const saved = localStorage.getItem('finalpickup');
            console.log("Loading finalpickup from localStorage:", saved);
            return saved || null;
        } catch (e) {
            console.error("Error loading finalpickup from localStorage:", e);
            return null;
        }
    });
    
    const [finaldrop, setFinaldrop] = useState(() => {
        try {
            const saved = localStorage.getItem('finaldrop');
            console.log("Loading finaldrop from localStorage:", saved);
            return saved || null;
        } catch (e) {
            console.error("Error loading finaldrop from localStorage:", e);
            return null;
        }
    });
    
    // Save to localStorage whenever finalpickup or finaldrop changes
    useEffect(() => {
        if (finalpickup) {
            try {
                localStorage.setItem('finalpickup', finalpickup);
                console.log("Saved finalpickup to localStorage:", finalpickup);
            } catch (e) {
                console.error("Error saving finalpickup to localStorage:", e);
            }
        }
    }, [finalpickup]);
    
    useEffect(() => {
        if (finaldrop) {
            try {
                localStorage.setItem('finaldrop', finaldrop);
                console.log("Saved finaldrop to localStorage:", finaldrop);
            } catch (e) {
                console.error("Error saving finaldrop to localStorage:", e);
            }
        }
    }, [finaldrop]);
    
    // Save Price to localStorage
    useEffect(() => {
        if (Price) {
            try {
                localStorage.setItem('ridePrice', Price.toString());
                console.log("Saved price to localStorage:", Price);
            } catch (e) {
                console.error("Error saving price to localStorage:", e);
            }
        }
    }, [Price]);
    
    // Save vehicle to localStorage
    useEffect(() => {
        if (vechicle) {
            try {
                localStorage.setItem('selectedVehicle', vechicle);
                console.log("Saved vehicle to localStorage:", vechicle);
            } catch (e) {
                console.error("Error saving vehicle to localStorage:", e);
            }
        }
    }, [vechicle]);
    
    useEffect(() => {
        getlocation().then((data) => {
            if (data) {
                setLocation(data);
            }
        }).catch((error) => {
            console.error("Error getting location:", error);
        });
    }, []);
    
    return (
        <Usercontext.Provider value={{ 
            user, 
            setuser, 
            location, 
            setLocation,
            droploc,
            setDroploc,
            droplocname,
            setDroplocname,
            vechicle,
            setvechicle,
            Price,
            setPrice,
            pickupname,
            setPickupname,
            setPickupppp,
            invitieacc,
            setinvitieacc,
            finalpickup, 
            setFinalpickup, 
            finaldrop, 
            setFinaldrop
        }}>
            {props.children}
        </Usercontext.Provider>
    )
}

export default ContextProvider