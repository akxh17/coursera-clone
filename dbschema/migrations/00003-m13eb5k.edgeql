CREATE MIGRATION m13eb5kurg75dm5pmpoelzn7fvmpskyzhcncsegbf2mzpfewct5s3a
    ONTO m1g2x4ovhxbx4ckfols3r46ltnc3lgj66aq7m5l3h4jhezb6zy43gq
{
  ALTER TYPE default::User {
      CREATE REQUIRED PROPERTY enrolled: array<std::int32> {
          SET default := (<array<std::int32>>[]);
      };
  };
  CREATE SCALAR TYPE default::UserId EXTENDING std::sequence;
  ALTER TYPE default::User {
      CREATE REQUIRED PROPERTY uid: default::UserId {
          SET REQUIRED USING (<default::UserId>{});
          CREATE CONSTRAINT std::exclusive;
      };
  };
};
