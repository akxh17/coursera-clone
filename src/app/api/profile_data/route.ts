import { NextResponse } from "next/server";
import data from "../../db/user.json";

export async function GET() {
  return NextResponse.json({
    data,
  });
}
