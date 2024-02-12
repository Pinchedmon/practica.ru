import { NextResponse } from "next/server";

export async function GET(req: Request, route: { params: { id: string } }) {
  try {
    return NextResponse.json({ comments: {}}, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }
}

