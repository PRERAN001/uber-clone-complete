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
    const [yourloc,setyourloc]=useState()
    const [rideStartCoords, setRideStartCoords] = useState(() => {
        try {
            const savedStart = localStorage.getItem('rideStartCoords');
            if (!savedStart) return null;
            const parsedStart = JSON.parse(savedStart);
            if (parsedStart?.latitude != null && parsedStart?.longitude != null) {
                return parsedStart;
            }
            return null;
        } catch {
            return null;
        }
    });
    const [rideDropCoords, setRideDropCoords] = useState(() => {
        try {
            const savedDrop = localStorage.getItem('rideDropCoords');
            if (!savedDrop) return null;
            const parsedDrop = JSON.parse(savedDrop);
            if (parsedDrop?.latitude != null && parsedDrop?.longitude != null) {
                return parsedDrop;
            }
            return null;
        } catch {
            return null;
        }
    });
    
    // Initialize finalpickup and finaldrop from localStorage
    const [finalpickup, setFinalpickup] = useState(() => {
        try {
            const saved = localStorage.getItem('finalpickup');
            return saved || null;
        } catch {
            return null;
        }
    });
    
    const [finaldrop, setFinaldrop] = useState(() => {
        try {
            const saved = localStorage.getItem('finaldrop');
            return saved || null;
        } catch {
            return null;
        }
    });
    
    // Save to localStorage whenever finalpickup or finaldrop changes
    useEffect(() => {
        if (finalpickup) {
            try {
                localStorage.setItem('finalpickup', finalpickup);
            } catch {
                // no-op
            }
        }
    }, [finalpickup]);
    
    useEffect(() => {
        if (finaldrop) {
            try {
                localStorage.setItem('finaldrop', finaldrop);
            } catch {
                // no-op
            }
        }
    }, [finaldrop]);
    
    // Save Price to localStorage
    useEffect(() => {
        if (Price) {
            try {
                localStorage.setItem('ridePrice', Price.toString());
            } catch {
                // no-op
            }
        }
    }, [Price]);
    
    // Save vehicle to localStorage
    useEffect(() => {
        if (vechicle) {
            try {
                localStorage.setItem('selectedVehicle', vechicle);
            } catch {
                // no-op
            }
        }
    }, [vechicle]);

    useEffect(() => {
        if (rideStartCoords) {
            try {
                localStorage.setItem('rideStartCoords', JSON.stringify(rideStartCoords));
            } catch {
                // no-op
            }
        }
    }, [rideStartCoords]);

    useEffect(() => {
        if (rideDropCoords) {
            try {
                localStorage.setItem('rideDropCoords', JSON.stringify(rideDropCoords));
            } catch {
                // no-op
            }
        }
    }, [rideDropCoords]);

    useEffect(() => {
        getlocation().then((data) => {
            if (data) {
                setLocation(data);
            }
        }).catch(() => {
            // no-op
        });
    }, []);
    
    return (
        <Usercontext.Provider value={{ 
            yourloc,setyourloc,
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
            rideStartCoords,
            setRideStartCoords,
            rideDropCoords,
            setRideDropCoords,
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