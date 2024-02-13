import { NextResponse } from "next/server";
import {v4 as uuid} from "uuid";
import {deleteDoc, doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
import {db} from "../../../../firebase";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        const ref = doc(db, "tasks", id as string );
        const res = await getDoc(ref).then(r => r.data());
        return NextResponse.json({data: res}, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
}
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {univId, specId, title, text} = body;

        const specUID = uuid()
        const ref = doc(db, "tasks", specUID );
        await setDoc(ref, {
            id: specUID,
            univId,
            specId,
            title,
            text
        });
        return NextResponse.json( { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: err }, { status: 500 });
    }
}
export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const {id, univId, specId, title, text} = body;

        const ref = doc(db, "tasks", id );
        await updateDoc(ref, {
            specId,
            univId,
            title,
            text
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
        const ref = doc(db, "tasks", id as string );
        await deleteDoc(ref);
        return NextResponse.json({}, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
}
