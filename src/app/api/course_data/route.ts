import { NextResponse } from "next/server";
import { createClient } from "edgedb";
import e from "../../../../dbschema/edgeql-js";

const client = createClient();

export async function GET() {
  try {
    const courses = await e
      .select(e.Course, () => ({
        cid: true,
        img: true,
        title: true,
        skills: true,
        price: true,
        rating: true,
        duration: true,
        tag: true,
      }))
      .run(client);

    return NextResponse.json({
      data: courses,
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch courses",
      },
      { status: 500 }
    );
  }
}
