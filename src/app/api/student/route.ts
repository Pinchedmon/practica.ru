import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import { db } from "../../../../firebase";

export async function POST(req: Request,) {
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
export async function PUT(req: Request, ) {
    try {
      const body = await req.json();
      const {data}  = body;
      const studentsRef = doc(db, "students", data.id as string );
      await updateDoc(studentsRef, {
      //TODO: добавить изменение данных
      });
      return NextResponse.json({data: 'updated'}, { status: 200 });
    } catch (err) {
      console.error(err);
      return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
}
export async function DELETE(req: Request ) {
    try {
      const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        const studentsRef = doc(db, "students", id as string );
        await deleteDoc(studentsRef);
      return NextResponse.json({ data: 'deleted'}, { status: 200 });
    } catch (err) {
      console.error(err);
      return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
  }
  export async function GET(req: Request ) {
    try {
        const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const studentsRef = doc(db, "students", id as string);
  const docSnap = await getDoc(studentsRef);
      return NextResponse.json({ data: docSnap.data()}, { status: 200 });
    } catch (err) {
      console.error(err);
      return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
  }

