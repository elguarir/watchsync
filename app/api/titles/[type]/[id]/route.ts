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

function fixTitle(title: any, type: string) {
  if (type === "movie") {
    let poster_path = null;
    if (title.poster_path) {
      poster_path = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${title.poster_path}`;
    }
    let backdrop_path = null;
    if (title.backdrop_path) {
      backdrop_path = `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${title.backdrop_path}`;
    }
    const record = {
      id: title.id,
      title: title.title,
      type: "Movie",
      released: title.release_date,
      vote_average: title.vote_average,
      genres: title?.genres.map((genre: any) => genre.name).join(","),
      overview: title.overview,
      poster_path: poster_path,
      backdrop_path: backdrop_path,
    };
    return record;
  }
  if (type === "tv") {
    let poster_path = null;
    if (title.poster_path) {
      poster_path = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${title.poster_path}`;
    }
    let backdrop_path = null;
    if (title.backdrop_path) {
      backdrop_path = `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${title.backdrop_path}`;
    }
    const record = {
      id: title.id,
      title: title.name,
      type: "Tv Show",
      released: title.first_air_date,
      vote_average: title.vote_average,
      genres: title?.genres.map((genre: any) => genre.name).join(","),
      overview: title.overview,
      poster_path: poster_path,
      backdrop_path: backdrop_path,
    };
    return record;
  }
}
