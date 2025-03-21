import React from 'react';
import './Help.css'; // Optional: Import a CSS file if you want to style further

const Help = () => {
  return (
    <div className="help-page">
      <h1>Help &amp; Support</h1>
      <p>
        Welcome to Parkivia's Help &amp; Support section. Here you'll find everything you need to make the most of our parking management system—from a quick start guide to FAQs and troubleshooting tips.
      </p>

      <section>
        <h2>Getting Started</h2>
        <p><strong>Accessing the Dashboard:</strong></p>
        <ul>
          <li>Simply open the Parkivia application.</li>
          <li>The dashboard immediately displays real-time parking availability and current status (e.g., peak, midpeak, or average).</li>
        </ul>
        <p><strong>Generating Your QR Code:</strong></p>
        <ul>
          <li>At the entry gate, input your vehicle number using the provided interface.</li>
          <li>Your unique QR code will be generated instantly.</li>
          <li>Show this QR code at the entry point to register your parking session.</li>
        </ul>
        <p><strong>Exiting the Parking Lot:</strong></p>
        <ul>
          <li>When you’re ready to leave, proceed to the exit gate.</li>
          <li>Scan the previously generated QR code using the scanner.</li>
          <li>Your fee is calculated automatically based on the number of hours parked.</li>
        </ul>
        <p><strong>Monitoring Parking Status:</strong></p>
        <p>
          The dashboard continually updates to reflect the parking lot’s status. Use this information to determine the best time to park or exit.
        </p>
      </section>

      <section>
        <h2>Frequently Asked Questions (FAQs)</h2>
        <h3>How do I generate my QR code?</h3>
        <p>
          At the entry gate, simply enter your vehicle number. Your unique QR code is generated automatically without the need for a login.
        </p>
        <h3>How is the parking fee calculated?</h3>
        <p>
          The fee is based on the duration of your parking session—from the time you generate your QR code at the entry to when you scan it at the exit.
        </p>
        <h3>What do the parking statuses (peak, midpeak, average) mean?</h3>
        <ul>
          <li><strong>Peak:</strong> High demand; parking lot is nearly full.</li>
          <li><strong>Midpeak:</strong> Moderate demand with several available slots.</li>
          <li><strong>Average:</strong> Low demand; plenty of parking spots available.</li>
        </ul>
        <h3>What should I do if my QR code isn’t scanning?</h3>
        <p>
          Ensure the QR code is clearly displayed and not distorted. Confirm that the scanning device is functioning correctly and that there is sufficient lighting at the exit gate. If issues persist, please refer to the troubleshooting section below.
        </p>
      </section>

      <section>
        <h2>Troubleshooting Tips</h2>
        <p><strong>QR Code Issues:</strong></p>
        <ul>
          <li>Make sure your QR code is fully visible on your device.</li>
          <li>Check that your device’s screen brightness is turned up.</li>
          <li>Clean the scanner lens if the code isn’t recognized.</li>
        </ul>
        <p><strong>Dashboard Refresh Problems:</strong></p>
        <ul>
          <li>Refresh the application if real-time updates appear delayed.</li>
          <li>Verify that your internet connection is stable.</li>
        </ul>
        <p><strong>General Guidance:</strong></p>
        <ul>
          <li>If a feature doesn’t seem to work as expected, try restarting the app.</li>
          <li>Consult the video tutorials (see below) for a detailed walkthrough of key features.</li>
        </ul>
      </section>


      <section>
        <h2>Contact Information</h2>
        <p>
          If you need further assistance, please reach out to our support team:
        </p>
        <ul>
          <li><strong>Email:</strong> <a href="mailto:info@parkivia.com">info@parkivia.com</a></li>
          <li><strong>Phone:</strong> +1 (800) 123-4567</li>
          <li><strong>Support Hours:</strong> Monday to Friday, 9 AM – 5 PM (local time)</li>
        </ul>
      </section>

      <section>
        <h2>System Requirements &amp; Compatibility</h2>
        <p>
          <strong>Supported Devices:</strong> Desktop, Laptop, Tablet, and Mobile. Our application is optimized for modern browsers (Chrome, Firefox, Safari, Edge).
        </p>
        <p>
          <strong>Other Requirements:</strong> A stable internet connection is recommended to ensure real-time updates work seamlessly.
        </p>
      </section>

      

      <p>
        We hope this Help &amp; Support section makes your experience with Parkivia smooth and hassle-free. If you have any further questions or suggestions, please don't hesitate to get in touch!
      </p>
    </div>
  );
};

export default Help;
