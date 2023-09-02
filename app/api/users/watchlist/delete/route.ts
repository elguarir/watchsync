import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { useAuthSession } from "@/lib/hooks/useAuthSession";

export async function POST(request: NextRequest) {
  const session = await useAuthSession();
  if (!session)
    return NextResponse.json(
      { status: "error", message: "Unauthorized" },
      { status: 401 }
    );
  const { titleId } = await request.json();
  const user_id = session.user.userId;

  const result = await prisma.usertitle.delete({
    where: {
      userId_titleId: {
        userId: user_id,
        titleId: titleId,
      },
    }
  });
  return NextResponse.json({ success: true, data: result });
}
