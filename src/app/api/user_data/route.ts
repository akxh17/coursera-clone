import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { nanoid } from "nanoid";

const userFilePath = path.join(process.cwd(), "src/app/db/user.json");

type User = {
  id: string;
  fullName: string;
  email: string;
  password: string;
  enrolled: string[];
};

let users: User[] = [];

export async function POST(request: Request) {
  const { action, fullName, email, password } = await request.json();

  if (action === "register") {
    if (!fullName || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    if (fs.existsSync(userFilePath)) {
      const userData = fs.readFileSync(userFilePath, "utf-8");
      users = userData ? JSON.parse(userData) : [];
    }

    const userExists = users.some((user) => user.email === email);
    if (userExists) {
      return NextResponse.json(
        { message: "Email already in use" },
        { status: 400 }
      );
    }
    const newUser: User = {
      id: nanoid(),
      fullName,
      email,
      password,
      enrolled: [],
    };

    users.push(newUser);
    fs.writeFileSync(userFilePath, JSON.stringify(users, null, 2));
    console.log(users);

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } else if (action === "login") {
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    if (fs.existsSync(userFilePath)) {
      const userData = fs.readFileSync(userFilePath, "utf-8");
      users = userData ? JSON.parse(userData) : [];
    } else {
      return NextResponse.json(
        { message: "No users found. Please register first." },
        { status: 404 }
      );
    }

    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }
    return NextResponse.json(
      {
        message: "Login successful",
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          enrolled: user.enrolled,
        },
      },
      { status: 200 }
    );
  }
}
