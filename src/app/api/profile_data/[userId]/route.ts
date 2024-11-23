// import { NextResponse } from "next/server";
// import fs from "fs";
// import path from "path";

// const userFilePath = path.join(process.cwd(), "src/app/db/user.json");

// type User = {
//   uid: number;
//   fullName: string;
//   email: string;
//   password: string;
//   enrolled: number[];
// };

// let users: User[] = [];

// export async function PATCH(
//   request: Request,
//   { params }: { params: Promise<{ userId: string }> }
// ) {
//   const  userId  = (await params).userId
//   const { courseId } = await request.json();

//   if (fs.existsSync(userFilePath)) {
//     const userData = fs.readFileSync(userFilePath, "utf-8");
//     users = userData ? JSON.parse(userData) : [];
//   }

//   const userIndex = users.findIndex((user) => user.id === userId);
//   if (userIndex === -1) {
//     return NextResponse.json({ message: "User not found" }, { status: 404 });
//   }

//   const user = users[userIndex];
//   if (user.enrolled.includes(courseId)) {
//     return NextResponse.json(
//       { message: "Course already enrolled" },
//       { status: 400 }
//     );
//   }

//   users[userIndex].enrolled.push(courseId);

//   fs.writeFileSync(userFilePath, JSON.stringify(users, null, 2));

//   return NextResponse.json(
//     {
//       message: "Course enrolled successfully",
//       enrolled: users[userIndex].enrolled,
//     },
//     { status: 200 }
//   );
// }

import { NextResponse } from "next/server";
import { createClient } from "edgedb";
import e from "../../../../../dbschema/edgeql-js";

const client = createClient();

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const userId = (await params).userId;
  const { courseId } = await request.json();
  console.log(courseId)

  try {
    const user = await e
      .select(e.User, (user) => ({
        uid: true,
        enrolled: true,
        filter: e.op(user.uid, "=", Number(userId)),
      }))
      .run(client);
    if (!user || user.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Extract the first user (as filtering should return only one user)
    const currentUser = user[0];
    console.log(currentUser)

    if (currentUser.enrolled.includes(courseId)) {
      return NextResponse.json(
        { message: "Course already enrolled" },
        { status: 400 }
      );
    }

    await e
      .update(e.User, (user) => ({
        filter: e.op(user.uid, "=", Number(userId)),
        set: {
          enrolled: e.op(
            user.enrolled,
            "++",
            e.literal(e.array(e.int32), [courseId])
          ), // Append the course ID
        },
      }))
      .run(client);

    // Return success response
    return NextResponse.json(
      {
        message: "Course enrolled successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error enrolling course:", error);
    return NextResponse.json(
      { message: "Failed to enroll in course"},
      { status: 500 }
    );
  }
}
