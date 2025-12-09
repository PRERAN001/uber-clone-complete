import React from "react";
import { Routes ,Route} from "react-router-dom";
import Home from "./pages/Home";
import Captionlogin from "./pages/Captionlogin";
import Captionregister from "./pages/Captionregister";
import Userlogin from "./pages/userlogin";
import Userregister from "./pages/Userregister";
import Strart from "./pages/Strart";
import Userprotectroute from "./pages/Userprotectroute";
import Userlogout from "./pages/Userlogout";
import Riding from "./pages/Riding";
import Captionhome from "./pages/Captionhome";
import Captionriding from "./pages/Captionriding";

const App = () => {
 

  return (
    <div>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/captionlogin" element={<Captionlogin />} />
          <Route path="/rideing" element={<Riding />} />
          <Route path="/captionregister" element={<Captionregister />} />
          <Route path="/userlogin" element={<Userlogin />} />
          <Route path="/userregister" element={<Userregister />} />
          <Route path="/captionhome" element={<Captionhome />} />
          <Route path="/captionriding" element={<Captionriding />} />
          <Route path="/start" element={
            <Userprotectroute>
              <Strart />
          </Userprotectroute>} />
          <Route path="/logout" element={
            <Userprotectroute>
              <Userlogout />
          </Userprotectroute>} />
      </Routes>
    </div>
  );
};

export default App;
