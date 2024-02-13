import { doc, getDoc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import { db } from "../../../../firebase";

export async function DELETE(req: Request, route: { params: { id: string } }) {
  try {
    return NextResponse.json({ comments: {}}, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }
}
export async function POST(req: Request, route: { params: { id: string } }) {
    try {
      const body = await req.json();
      const { email, id, name}  = body;
        const studentsRef = doc(db, "students", id);
                const docSnap = await getDoc(studentsRef);
                if (docSnap.exists()) {
                  return NextResponse.json({data: docSnap.data() }, { status: 200 });
                  } else {
                  await setDoc(studentsRef, {
                    id: id,
                    name: name,
                    email: email,
                    accepted: false,
                    });
                  }
      return NextResponse.json({ data: 'false'}, { status: 200 });
    } catch (err) {
      console.error(err);
      return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
  }
  export async function PUT(req: Request, route: { params: { id: string } }) {
    try {
      return NextResponse.json({ comments: {}}, { status: 200 });
    } catch (err) {
      console.error(err);
      return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
  }
  export async function GET(req: Request) {
    
    try {
 
      const { searchParams } = new URL(req.url);
      const id = searchParams.get('id');
      console.log(id)
      const studentsRef = doc(db, "orders", id as string);
			const docSnap = await getDoc(studentsRef);
      return NextResponse.json({ data: docSnap.data()}, { status: 200 });
    } catch (err) {
      console.error(err);
      return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
  }
