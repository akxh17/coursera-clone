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

    const currentUser = user[0];

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
          ),
        },
      }))
      .run(client);

    return NextResponse.json(
      {
        message: "Course enrolled successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error enrolling course:", error);
    return NextResponse.json(
      { message: "Failed to enroll in course" },
      { status: 500 }
    );
  }
}
