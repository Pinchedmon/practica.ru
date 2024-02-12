import { doc, setDoc, updateDoc, deleteDoc} from "firebase/firestore";
import { NextResponse } from "next/server";
import { db } from "../../../../firebase";
import { v4 as uuid } from 'uuid';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name}  = body;
        const univUID = uuid()
        const univRef = doc(db, "univs", univUID );
        await setDoc(univRef, {
            id: univUID,
        name: name,
        });
      return NextResponse.json( { status: 200 });
    } catch (err) {
      console.error(err);
      return NextResponse.json({ messsage: err }, { status: 500 });
    }
}
export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const {id, name}  = body;
        const univRef = doc(db, "univs", id );
        await updateDoc(univRef, {
        name: name
        });
      return NextResponse.json({ status: 200 });
    } catch (err) {
      console.error(err);
      return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
}
export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        const univRef = doc(db, "univs", id as string );
        await deleteDoc(univRef);
      return NextResponse.json({}, { status: 200 });
    } catch (err) {
      console.error(err);
      return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
  }