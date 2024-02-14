import {NextRequest, NextResponse} from "next/server";
import { collection, doc, getDoc, getDocs, query, where} from "firebase/firestore";
import { db } from "../../../../firebase";

export async function GET(req: NextRequest) {
  const univId = req.nextUrl.searchParams.get("univId") || "";
  const specId = req.nextUrl.searchParams.get("specId") || "";


  try {
    const params = []

    if (univId) {
      params.push(where('univId', '==', univId))
    }

    if(specId) {
      params.push(where('specId', '==', specId))
    }

    const dataRef = query(
        collection(db, 'tasks'),
        ...params
    );

    const docsSnap = await getDocs(dataRef);
    const res: any[] = [];
    docsSnap.forEach((doc) => {
      const data = doc.data()
      if (data.id){
        res.push(
            doc.data()
        );
      }
    });

    return NextResponse.json({ data: res}, { status: 200 });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }
}
