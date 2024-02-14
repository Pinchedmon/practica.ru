import {NextRequest, NextResponse} from "next/server";
import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "../../../../firebase";


export async function GET(req: NextRequest) {
  const univId = req.nextUrl.searchParams.get("univId") || "";
  const specId = req.nextUrl.searchParams.get("specId") || "";
  const studentFIO = req.nextUrl.searchParams.get("studentFIO") || "";
  const dateFrom = req.nextUrl.searchParams.get("dateFrom") || "";
  const dateTo = req.nextUrl.searchParams.get("dateTo") || "";

  try {
    const params = []

    if (univId) {
      params.push(where('univId', '==', univId))
    }

    if(specId) {
      params.push(where('specId', '==', specId))
    }

    if(studentFIO) {
      params.push(where('studentFIO', '==', studentFIO))
    }

    if(dateFrom) {
      params.push(where('date', '>=', dateFrom))
    }

    if(dateTo) {
      params.push(where('date', '<=', dateTo))
    }

    const dataRef = query(
        collection(db, 'reports'),
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

