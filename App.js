import NavBar from "./components/NavBar";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import {Routes,Route} from "react-router-dom";
import Grids from "./components/Grids"


function App() {
  return (

    <>
       <Routes>
      <Route path="/" element={<NavBar/>}></Route>
        <Route path="/SignIn" element={<SignIn/>}></Route>
        <Route path="/SignUp" element={<SignUp/>}></Route>
        <Route path="/Grids" element={<Grids/>}></Route>
        {/* <Route path="/StudentData" element={<Sdntadd/>}></Route> */}
      </Routes> 
     
   
    
    </>
  );
}

export default App;
