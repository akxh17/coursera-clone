import React from "react";

function ProfileLoading() {
  return (
    <div className="profile--loading">
      <div className="profile--skeloton">
        <div className="profile--skeloton--image"></div>
        <div className="profile--skeloton--detials">
          <div className="profile--details--name"></div>
          <div className="profile--details--age"></div>
        </div>
      </div>
      <div className="profile--other--details"></div>
      <div className="profile--other--details"></div>
    </div>
  );
}

export default ProfileLoading;
