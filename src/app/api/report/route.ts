import { NextResponse } from "next/server";
import {v4 as uuid} from "uuid";
import {deleteDoc, doc, setDoc} from "firebase/firestore";
import {db} from "../../../../firebase";

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        const ref = doc(db, "reports", id as string );
        await deleteDoc(ref);
        return NextResponse.json({}, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
}
export async function POST(req: Request,) {
    try {
        const body = await req.json();
        const {studentId, url} = body;

        const specUID = uuid();
        const ref = doc(db, "reports", specUID );
        await setDoc(ref, {
            id: specUID,
            studentId: studentId,
            url: url
        });
        return NextResponse.json( { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: err }, { status: 500 });
    }
}
