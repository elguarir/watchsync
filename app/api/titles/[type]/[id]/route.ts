import { fixTitle } from "@/utils/FixTitles";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string; type: string } }
) {
  const { id, type } = params;
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}?language=en-US&api_key=18bbc44d1e9834345fa7cd8f22c77cee`
    );
    const data = await res.json();
    const title = fixTitle(data, type);
    return NextResponse.json(title);
  } catch (error) {
    return NextResponse.json({ message: "Title not found" }, { status: 404 });
  }
}


