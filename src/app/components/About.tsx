import React from "react";
import { RiDoubleQuotesL } from "react-icons/ri";
import { RiDoubleQuotesR } from "react-icons/ri";

function About() {
  return (
    <>
      <div className="about--container">
        <h1>About Coursera</h1>
        <p>
          Coursera partners with more than 300 leading universities and
          companies to bring flexible, affordable, job-relevant online learning
          to individuals and organizations worldwide. We offer a range of
          learning opportunities—from hands-on projects and courses to job-ready
          certificates and degree programs.
        </p>
      </div>
      <div className="vision--container">
        <h2>Our Vision</h2>
        <div className="vision--quote">
          <RiDoubleQuotesL className="quote-icon" />
          <p>
            We envision a world where anyone, anywhere has the power to
            transform their lives through learning.
          </p>
          <RiDoubleQuotesR className="quote-icon" />
        </div>
      </div>
    </>
  );
}

export default About;
