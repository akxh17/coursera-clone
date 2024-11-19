import React from "react";
import { FaRegCompass } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { GiBrain } from "react-icons/gi";
import { GrCertificate } from "react-icons/gr";

function Benefits() {
  return (
    <div className="benefit--main--container">
      <div className="benefit--container">
        <FaRegCompass className="benefit--icon" />
        <h4>Learn anything</h4>
        <p>
          Explore any interest or trending topic, take prerequisites, and
          advance your skills
        </p>
      </div>
      <div className="benefit--container">
        <GiMoneyStack className="benefit--icon" />
        <h4>Save money</h4>
        <p>
          Spend less money on your learning if you plan to take multiple courses
          this year
        </p>
      </div>
      <div className="benefit--container">
        <GiBrain className="benefit--icon" />
        <h4>Flexible learning</h4>
        <p>
          Learn at your own pace, move between multiple courses, or switch to a
          different course
        </p>
      </div>
      <div className="benefit--container">
        <GrCertificate className="benefit--icon" />
        <h4>Unlimited certificates</h4>
        <p>
          Earn a certificate for every learning program that you complete at no
          additional cost
        </p>
      </div>
    </div>
  );
}

export default Benefits;
