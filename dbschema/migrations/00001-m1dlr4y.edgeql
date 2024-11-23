CREATE MIGRATION m1dlr4y3iiurioev6pog7rt24be7oxe22wcpylahl742chns4izbaq
    ONTO initial
{
  CREATE TYPE default::User {
      CREATE REQUIRED PROPERTY email: std::str;
      CREATE REQUIRED PROPERTY fullName: std::str;
      CREATE REQUIRED PROPERTY password: std::str;
  };
};
