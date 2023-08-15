import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import prisma from "@/lib/db";
export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json(
      { status: "error", message: "Unauthorized" },
      { status: 401 }
    );
  const user_id = session.user.userId;

  try {
    const watchlist = await prisma.usertitle.findMany({
      where: { userId: user_id },
      select: {
        isFavourite: true,
        isWatched: true,
        rating: true,
        title: {
          select: {
            id: true,
            title: true,
            type: true,
            released: true,
            vote_average: true,
            genres: true,
            overview: true,
            poster_path: true,
            backdrop_path: true,
          },
        },
      },
    });

    if (watchlist) {
      return NextResponse.json(watchlist);
    }
    return NextResponse.json(
      { status: "error", message: "No titles found" },
      { status: 404 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: error },
      { status: 500 }
    );
  }
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
