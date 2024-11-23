CREATE MIGRATION m1g2x4ovhxbx4ckfols3r46ltnc3lgj66aq7m5l3h4jhezb6zy43gq
    ONTO m1dlr4y3iiurioev6pog7rt24be7oxe22wcpylahl742chns4izbaq
{
  CREATE TYPE default::Course {
      CREATE REQUIRED PROPERTY cid: std::int32;
      CREATE REQUIRED PROPERTY duration: std::int32;
      CREATE REQUIRED PROPERTY img: std::str;
      CREATE REQUIRED PROPERTY price: std::float64;
      CREATE REQUIRED PROPERTY rating: std::float64;
      CREATE REQUIRED PROPERTY skills: std::str;
      CREATE REQUIRED PROPERTY tag: std::str;
      CREATE REQUIRED PROPERTY title: std::str;
  };
};
