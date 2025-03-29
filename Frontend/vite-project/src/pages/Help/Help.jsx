import React, { useRef } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Help.css";
import { FaArrowDown } from "react-icons/fa";

const Help = () => {
  const faqRef = useRef(null);
  const troubleshootingRef = useRef(null);

  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <>
      <Navbar />
      <div className="help-container">
        <section className="help-section">
          <h2>Getting Started</h2>
          <p>To access the Parkivia dashboard, open the application to view real-time parking availability and the current status. To generate your QR code, enter your vehicle number at the entry gate, and a unique QR code will be generated instantly, which you must show at the entry point to register your session. When exiting, proceed to the exit gate, scan your QR code, and the system will automatically calculate your parking fee based on the duration of your stay.</p>
          
        </section>

        <section className="help-section" ref={faqRef}>
          <h2>FAQs</h2>
          <h3>How do I generate my QR code?</h3>
          <p>Enter your vehicle number at the entry gate to get a QR code instantly.</p>
          <h3>How is the parking fee calculated?</h3>
          <p>The fee is calculated based on the duration of your parking session.</p>
          <h3>What do the parking statuses mean?</h3>
          <p>
            <ul>
              <li>1.Peak: High demand; nearly full.</li>
<li>2.Midpeak: Moderate demand; some slots available.</li>
<li>3.Average: Low demand; plenty of spots available.</li></ul></p>          
          
        </section>

        <section className="help-section" ref={troubleshootingRef}>
          <h2>Troubleshooting</h2>
          <p>If you encounter QR code issues, ensure it is clearly displayed, increase your screen brightness, and clean the scanner lens. For dashboard refresh problems, try refreshing the app if updates are delayed and check your internet connection. If a feature isn’t working, restart the app or refer to our video tutorials for further assistance.</p>
        </section>
      </div>
      <p className="contact-info">
        <strong>Contact Information:</strong> If you need further assistance, reach out to our support team: 
        <br /> Email: <a href="mailto:info@parkivia.com">info@parkivia.com</a> | Phone: <a href="tel:+18001234567">+1 (800) 123-4567</a>
      </p>
    </>
  );
};

export default Help;