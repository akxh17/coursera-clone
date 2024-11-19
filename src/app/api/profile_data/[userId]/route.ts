import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const userFilePath = path.join(process.cwd(), "src/app/db/user.json");

type User = {
  id: string;
  fullName: string;
  email: string;
  password: string;
  enrolled: string[];
};

let users: User[] = [];

export async function PATCH(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = await params;
  const { courseId } = await request.json();

  if (fs.existsSync(userFilePath)) {
    const userData = fs.readFileSync(userFilePath, "utf-8");
    users = userData ? JSON.parse(userData) : [];
  }

  const userIndex = users.findIndex((user) => user.id === userId);
  if (userIndex === -1) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const user = users[userIndex];
  if (user.enrolled.includes(courseId)) {
    return NextResponse.json(
      { message: "Course already enrolled" },
      { status: 400 }
    );
  }

  users[userIndex].enrolled.push(courseId);

  fs.writeFileSync(userFilePath, JSON.stringify(users, null, 2));

  return NextResponse.json(
    {
      message: "Course enrolled successfully",
      enrolled: users[userIndex].enrolled,
    },
    { status: 200 }
  );
}
