import React from "react";
import "./About.css";
import Navbar from "../../components/Navbar/Navbar";

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="aboutus-container">
        {/* Two sections placed horizontally */}
        <div className="aboutus-sections">
          {/* About Parkivia Section */}
          <section className="aboutus-section">
            <h2 className="aboutus-heading">About Parkivia</h2>
            <p className="aboutus-text">
              Parkivia is a cutting-edge parking management dashboard designed
              to deliver a smooth, hassle-free parking experience. Our platform
              provides users with real-time parking availability, QR code–based
              entry and exit, and dynamic pricing based on parking duration.
            </p>
          </section>

          {/* Our Mission Section */}
          <section className="aboutus-section">
            <h2 className="aboutus-heading">Our Mission</h2>
            <p className="aboutus-text">
              We aim to revolutionize the parking experience by leveraging
              innovative technology. Our mission is to reduce congestion,
              streamline entry and exit procedures, and ensure transparency in
              pricing—all while providing a user-friendly interface for
              real-time updates.
            </p>
          </section>
        </div>

        {/* Contact Information at the bottom without Glassmorphism */}
        <p className="aboutus-contact">
          For more information or any inquiries, please reach out at{" "}
          <a href="mailto:info@parkivia.com" className="aboutus-link">
            info@parkivia.com
          </a>.
        </p>
      </div>
    </>
  );
};

export default AboutUs;