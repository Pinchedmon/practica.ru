import {NextRequest, NextResponse} from "next/server";
import { collection, doc, getDoc, getDocs, query, where} from "firebase/firestore";
import { db } from "../../../../firebase";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const studentsRef = doc(db, "students", id as string);
    const docSnap = await getDoc(studentsRef);
    const user = docSnap.data();
    const params = []

    if (user?.univId) {
      params.push(where('univId', '==', user?.univId))
    }

    if(user?.specId) {
      params.push(where('specId', '==', user?.specId))
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
