import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from './component/Navbar';
import Home from './component/Home';
import About from './component/About';
import Contact from './component/Contact';
import Upload from './component/Upload';
import Design from './component/Design';

const App = () => {
  return (
   <div>
    <BrowserRouter>
     <Routes>
       <Route path="/" element={<Navbar/>}/>
       <Route path="/" element={<Home/>}/>
       <Route path="/" element={<About/>}/>
       <Route path="/" element={<Contact/>}/>
       <Route path="/upload" element={<Upload/>}/>
       <Route path="/Design"  element={<Design/>}/>
      
     </Routes>
    </BrowserRouter>
   
   </div>
  );
};

export default App;
