import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import prisma from "@/lib/db";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json(
      { status: "error", message: "Unauthorized" },
      { status: 401 }
    );
  const { titleId, isWatched, isFavourite, rating } = await request.json();
  const user_id = session.user.userId;

  const result = await prisma.usertitle.update({
    where: {
      userId_titleId: {
        userId: user_id,
        titleId: titleId,
      },
    },
    data: {
      isWatched: isWatched,
      isFavourite: isFavourite,
      rating: rating,
    },
    select: {
      titleId: true,
      isWatched: true,
      isFavourite: true,
      rating: true,
      userId: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return NextResponse.json({ success: true, data: result });
}

