import { NextResponse } from "next/server";
import data from "../../db/courses.json";

export async function GET() {
  return NextResponse.json({
    data,
  });
}
