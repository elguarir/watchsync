import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { TitleResults, Title } from "@/types/titles";
import { useAuthSession } from "@/lib/hooks/useAuthSession";

export async function POST(request: NextRequest) {
  const session = useAuthSession();
  if (!session) {
    return NextResponse.json({ status: "Unauthorized" }, { status: 401 });
  }
  let { query } = await request.json();
  query = encodeURIComponent(query);
  const data = await fetch(
    `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1&api_key=18bbc44d1e9834345fa7cd8f22c77cee`
  );
  let results: TitleResults = await data.json();
  let titles = FixTitles(results.results);
  titles = idTogenres(titles);
  results = { ...results, results: titles };
  return NextResponse.json(results);
}

function FixTitles(titles: Title[]) {
  let fixedTitles = titles.map((item) => {
    const {
      id,
      name,
      title,
      vote_average,
      media_type,
      release_date,
      genre_ids,
      overview,
      poster_path,
      backdrop_path,
    } = item;
    const genres = genre_ids?.join(",");
    return {
      id,
      title: title || name,
      type: media_type,
      released: release_date ?? null,
      vote_average,
      genres,
      overview,
      poster_path:
        poster_path &&
        `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${poster_path}`,
      backdrop_path:
        backdrop_path &&
        `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${backdrop_path}`,
    };
  });
  let FilteredTitles = fixedTitles.filter((title) => {
    return title.type === "movie" || title.type === "tv";
  });
  return FilteredTitles;
}

function idTogenres(titles: any[]) {
  const genres = [
    {
      id: 28,
      name: "Action",
    },
    {
      id: 12,
      name: "Adventure",
    },
    {
      id: 16,
      name: "Animation",
    },
    {
      id: 99,
      name: "Documentary",
    },
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 14,
      name: "Fantasy",
    },
    {
      id: 36,
      name: "History",
    },
    {
      id: 27,
      name: "Horror",
    },
    {
      id: 10402,
      name: "Music",
    },
    {
      id: 9648,
      name: "Mystery",
    },
    {
      id: 10749,
      name: "Romance",
    },
    {
      id: 878,
      name: "Science Fiction",
    },
    {
      id: 10770,
      name: "TV Movie",
    },
    {
      id: 53,
      name: "Thriller",
    },
    {
      id: 10752,
      name: "War",
    },
    {
      id: 37,
      name: "Western",
    },
    {
      id: 10759,
      name: "Action & Adventure",
    },
    {
      id: 35,
      name: "Comedy",
    },
    {
      id: 80,
      name: "Crime",
    },
    {
      id: 10751,
      name: "Family",
    },
    {
      id: 10762,
      name: "Kids",
    },
    {
      id: 10763,
      name: "News",
    },
    {
      id: 10764,
      name: "Reality",
    },
    {
      id: 10765,
      name: "Sci-Fi & Fantasy",
    },
    {
      id: 10766,
      name: "Soap",
    },
    {
      id: 10767,
      name: "Talk",
    },
    {
      id: 10768,
      name: "War & Politics",
    },
  ];
  let newTitles = titles.map((title) => {
    const { genres: genre_ids } = title;
    let newGenres = genre_ids?.split(",").map((id: any) => {
      const genre = genres.find((genre) => genre.id === parseInt(id));
      return genre?.name;
    });
    newGenres = newGenres?.join(", ");
    if (newGenres === "") newGenres = null;
    return { ...title, genres: newGenres };
  });
  return newTitles;
}
