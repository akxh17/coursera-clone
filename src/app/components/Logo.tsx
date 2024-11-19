import React from "react";
import Image from "next/image";

function Logo() {
  return (
    <div className="logo--container">
      <Image
        src="/images/Illinois-Logo.png"
        width={170}
        height={100}
        alt="illinois logo"
      />
      <Image src="/images/Duke.png" width={170} height={110} alt="duke logo" />
      <Image
        src="/images/google-logo.png"
        width={170}
        height={45}
        alt="google logo"
      />
      <Image src="/images/IBM.png" width={170} height={45} alt="ibm logo" />
      <Image
        src="/images/vanderbilt.png"
        width={170}
        height={90}
        alt="vanderbuilt logo"
      />
      <Image
        src="/images/University-of-Michigan-Logo.png"
        width={170}
        height={80}
        alt="michigan logo"
      />
    </div>
  );
}

export default Logo;
