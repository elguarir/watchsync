import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { useAuthSession } from "@/lib/hooks/useAuthSession";

export async function POST(request: NextRequest) {
  const session = await useAuthSession();
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
  revalidatePath("/dashboard/watchlist");
  return NextResponse.json({ success: true, data: result });
}
