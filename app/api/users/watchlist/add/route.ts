import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import type { ModifiedTitle } from "@/types/titles";
import { useAuthSession } from "@/lib/hooks/useAuthSession";

export async function POST(request: NextRequest) {
  
  
  const session = await useAuthSession();
  if (!session)
    return NextResponse.json(
      { status: "error", message: "Unauthorized" },
      { status: 401 }
    );
  const user_id = session.user.userId;
  const { titleId, type, isWatched, isFavourite, rating } =
    await request.json();
  // @ts-ignore
  const data: any = await getData(type, titleId);
  const title = await prisma.title.findUnique({
    where: {
      id: data.id as number,
    },
  });
  if (!title) {
    await prisma.title.create({
      data: {
        id: data.id as number,
        title: data.title,
        type: data.type,
        released: new Date(data.released as Date),
        vote_average: data.vote_average,
        genres: data.genres,
        overview: data.overview,
        poster_path: data.poster_path,
        backdrop_path: data.backdrop_path,
      },
    });
  }

  const result = await prisma.usertitle.upsert({
    where: {
      userId_titleId: {
        userId: user_id,
        titleId: data.id as number,
      },
    },
    update: {
      isWatched,
      isFavourite,
      rating,
    },
    create: {
      isWatched,
      isFavourite,
      rating,
      userId: user_id,
      titleId: data.id as number,
    },
  });
  return NextResponse.json(result);
}

// schemas :
// model User {
//   id            String      @id @default(cuid())
//   name          String?
//   email         String?     @unique
//   emailVerified DateTime?
//   password      String?
//   image         String?
//   accounts      Account[]
//   sessions      Session[]
//   watchlist     Usertitle[]
// }

//   @@unique([identifier, token])
// }
// model Title {
//   id            Int         @id
//   title         String
//   type          String
//   released      DateTime?
//   vote_average  Float?
//   genres        String      @db.Text
//   overview      String      @db.Text
//   poster_path   String?
//   backdrop_path String?
//   usertitles    Usertitle[]
// }

// model Usertitle {
//   id          Int     @id @default(autoincrement())
//   isWatched   Boolean
//   isFavourite Boolean
//   rating      Int?
//   userId      String
//   user        User    @relation(fields: [userId], references: [id], onDelete: Cascade)
//   title       Title   @relation(fields: [titleId], references: [id])
//   titleId     Int
//   @@unique([userId, titleId])
// }

async function getData(type: string, id: number) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}?language=en-US&api_key=18bbc44d1e9834345fa7cd8f22c77cee`
    );
    console.log("res", res);
    const data = await res.json();
    const title = fixTitle(data, type);
    return title;
  } catch (error) {
    console.log(error);
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
    const record: ModifiedTitle = {
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
    const record: ModifiedTitle = {
      id: title.id,
      title: title.name,
      type: "TV Show",
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
