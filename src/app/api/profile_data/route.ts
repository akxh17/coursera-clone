import { NextResponse } from "next/server";
import { createClient } from "edgedb";
import e from "../../../../dbschema/edgeql-js";

const client = createClient();

export async function GET() {
  try {
    const users = await e
      .select(e.User, () => ({
        uid: true,
        email: true,
        fullName: true,
        enrolled: true,
      }))
      .run(client);

    return NextResponse.json({
      data: users,
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch user data",
      },
      { status: 500 }
    );
  }
}
