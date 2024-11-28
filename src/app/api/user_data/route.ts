import { NextResponse } from "next/server";
import { createClient } from "edgedb";
import e from "../../../../dbschema/edgeql-js";
import bcrypt from "bcrypt";

const client = createClient();

export async function POST(request: Request) {
  const { action, fullName, email, password } = await request.json();

  if (action === "register") {
    return await register(fullName, email, password);
  } else if (action === "login") {
    return await login(email, password);
  } else {
    return NextResponse.json({ message: "Invalid action" }, { status: 400 });
  }
}

async function register(fullName: string, email: string, password: string) {
  if (!fullName || !email || !password) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  const existingUser = await e
    .select(e.User, (user) => ({
      filter: e.op(user.email, "=", email),
      uid: true,
    }))
    .assert_single()
    .run(client);

  if (existingUser) {
    return NextResponse.json(
      { message: "Email already in use" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await e
    .insert(e.User, {
      fullName,
      email,
      password: hashedPassword,
      enrolled: [],
    })
    .run(client);

  return NextResponse.json(
    { message: "User registered successfully" },
    { status: 201 }
  );
}

async function login(email: string, password: string) {
  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password are required" },
      { status: 400 }
    );
  }

  const user = await e
    .select(e.User, (user) => ({
      filter: e.op(user.email, "=", email),
      uid: true,
      fullName: true,
      email: true,
      password: true,
      enrolled: true,
    }))
    .assert_single()
    .run(client);

  if (!user) {
    return NextResponse.json(
      { message: "Invalid email or password" },
      { status: 401 }
    );
  }

  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) {
    return NextResponse.json(
      { message: "Invalid email or password" },
      { status: 401 }
    );
  }

  return NextResponse.json(
    {
      message: "Login successful",
      user: {
        id: user.uid,
        fullName: user.fullName,
        email: user.email,
        enrolled: user.enrolled,
      },
    },
    { status: 200 }
  );
}
