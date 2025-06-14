import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
const Home= () => {
  return (
    <section id="home" className="home">
      <div className="quote">
        
        <p>"The only place where SUCCESS comes before Work is in THE DICTIONARY"</p>
      </div>
      <div className="image">
        <img src="Images\50ca963b4f1999aa8d82909d02997587.jpg" alt="Placeholder" />
      </div>
      <Link to="/Design"><button className="upload-button">Work my Dctionary</button></Link>
     
    </section>
  );
};

export default Home;
