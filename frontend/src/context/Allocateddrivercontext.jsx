import React from 'react'
import { createContext } from 'react'
import { useState } from 'react'
const alocdriver = createContext()
const Allocateddrivercontextprovider = (props) => {
    const [driverAllocated, setDriverAllocated] = useState(false);

  return (
    <alocdriver.Provider value={{ driverAllocated, setDriverAllocated }}>
        {props.children}
    </alocdriver.Provider>
  )
}

export default Allocateddrivercontextprovider
export {alocdriver}
