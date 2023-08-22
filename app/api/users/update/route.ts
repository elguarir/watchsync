import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
import { useAuthSession } from "@/lib/hooks/useAuthSession";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  const session = await useAuthSession();
  if (!session)
    return NextResponse.json(
      { status: "error", message: "Unauthorized" },
      { status: 401 }
    );
  const user_id = session.user.userId;
  const { name, avatar, password, rePassword } = await request.json();
  const user = await prisma.user.findUnique({
    where: {
      id: user_id,
    },
  });

  if (!user)
    return NextResponse.json(
      { status: "error", message: "Unauthorized." },
      { status: 401 }
    );

  if (password !== "") {
    if (password !== rePassword)
      return NextResponse.json(
        { status: "error", message: "Passwords do not match." },
        { status: 401 }
      );

    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const user = await prisma.user.update({
        where: {
          id: user_id,
        },
        data: {
          name,
          image: avatar,
          password: hashedPassword,
        },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      });
      return NextResponse.json({
        status: "success",
        message: "Password updated.",
        user: user,
      });
    } catch (error) {
      return NextResponse.json(
        { status: "error", message: "Something went wrong." },
        { status: 500 }
      );
    }
  }

  try {
    const user = await prisma.user.update({
      where: {
        id: user_id,
      },
      data: {
        name,
        image: avatar,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
      },
    });
    return NextResponse.json({
      status: "success",
      message: "User details updated.",
      user: user,
    });
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: "Something went wrong." },
      { status: 500 }
    );
  }
}
