import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import { db } from "../../../../firebase";

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const fio = searchParams.get('fio');

    const orderRef = doc(db, "orders", fio as string );
    await deleteDoc(orderRef);
    const studentRef = doc(db, "students", fio as string );
    await deleteDoc(studentRef);
    return NextResponse.json({ data: 'deleted'}, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }
}
export async function POST(req: Request) {
    try {
      const body = await req.json();
      const {
        id,
        fio,
        phone,
        startDate,
        endDate,
        file,
        university,
        spec,
      }  = body;
        const orderRef = doc(db, "orders", fio);
                  await setDoc(orderRef, {
                    id,
                    fio,
                    phone,
                    startDate,
                    endDate,
                    file,
                    university,
                    spec,
                    });
                  
      return NextResponse.json({ data:'created'}, { status: 200 });
    } catch (err) {
      console.error(err);
      return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
  }
  export async function PUT(req: Request) {
    try {
      const body = await req.json();
      const { data }  = body;
      const orderRef = doc(db, "orders", data.fio as string );
      await deleteDoc(orderRef);
      const studentRef = doc(db, "students", data.id );
      await updateDoc(studentRef, {
        fio: data.fio,
        phone: data.phone,
        startDate: data.startDate,
        endDate: data.endDate,
        file: data.file,
        university: data.university,
        spec: data. spec,
        accepted: true
      });
      return NextResponse.json({ data: 'updated'}, { status: 200 });
    } catch (err) {
      console.error(err);
      return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
  }
  export async function GET(req: Request) {
    
    try {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get('id');
      const studentsRef = doc(db, "orders", id as string);
			const docSnap = await getDoc(studentsRef);
      return NextResponse.json({ data: docSnap.data()}, { status: 200 });
    } catch (err) {
      console.error(err);
      return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
  }
