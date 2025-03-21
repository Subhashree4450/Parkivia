import React from 'react';
import './About.css'; // Ensure the path is correct relative to this file

const AboutUs = () => {
  return (
    <div className="aboutus-container">
      {/* Introduction */}
      <section className="aboutus-section">
        <h1 className="aboutus-heading">About Parkivia</h1>
        <p className="aboutus-text">
          Parkivia is a cutting-edge parking management dashboard designed to deliver a smooth, 
          hassle-free parking experience. Our platform provides users with real-time parking 
          availability, QR code–based entry and exit, and dynamic pricing based on parking duration.
        </p>
      </section>

      {/* Our Services */}
      <section className="aboutus-section">
        <h2 className="aboutus-subheading">Our Services</h2>
        <ul className="aboutus-list">
          <li>
            <strong>Real-Time Parking Dashboard:</strong> Instantly view current parking 
            availability with live updates.
          </li>
          <li>
            <strong>QR Code Based Entry & Exit:</strong> At the entry gate, vehicle numbers 
            are entered and a unique QR code is generated. At the exit gate, scanning the QR 
            code retrieves the parking fee calculated based on the number of hours parked.
          </li>
          <li>
            <strong>Dynamic Pricing & Status Prediction:</strong> Our system calculates pricing 
            based on parking duration and predicts the parking status as peak, midpeak, or average, 
            helping manage demand efficiently.
          </li>
        </ul>
      </section>

      {/* Our Mission */}
      <section className="aboutus-section">
        <h2 className="aboutus-subheading">Our Mission</h2>
        <p className="aboutus-text">
          We aim to revolutionize the parking experience by leveraging innovative technology. 
          Our mission is to reduce congestion, streamline entry and exit procedures, and ensure 
          transparency in pricing—all while providing a user-friendly interface for real-time updates.
        </p>
      </section>

      {/* Contact Information */}
      <section className="aboutus-section">
        <h2 className="aboutus-subheading">Contact Us</h2>
        <p className="aboutus-text">
          For more information or any inquiries, please reach out at{' '}
          <a href="mailto:info@parkivia.com" className="aboutus-link">
            info@parkivia.com
          </a>.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
