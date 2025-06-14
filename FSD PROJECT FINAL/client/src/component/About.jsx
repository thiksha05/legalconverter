import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="step">
          <div className="circle">1</div>
          <button className="step-button">UPLOAD THE PDF</button>
        </div>
        <div className="step">
          <div className="circle">2</div>
          <button className="step-button">CONVERSION</button>
        </div>
        <div className="step">
          <div className="circle">3</div>
          <button className="step-button">SAFE AND SECURE DB</button>
        </div>
        <div className="step">
          <div className="circle">4</div>
          <button className="step-button">DOWNLOAD PDF</button>
        </div>
      </div>
    </section>
  );
};

export default About;
