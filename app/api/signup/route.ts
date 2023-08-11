import prisma from "@/lib/db";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const { name, email, password } = data;

  const errors = validateInputs(data);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { success: false, user: null, errors },
      { status: 422 }
    );
  }

  if (Object.keys(errors).length === 0) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      return NextResponse.json(
        {
          success: false,
          user: null,
          errors: { email: "Email already exists" },
        },
        { status: 422 }
      );
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
        select: {
          id: true,
          name: true,
          email: true,
          emailVerified: true,
          image: true,
        },
      });
      return NextResponse.json(
        { success: true, user: newUser, errors: null },
        { status: 201 }
      );
    }
  }
}

const validateInputs = (values: any) => {
  const errors: any = {};
  if (!values.name) {
    errors.name = "Name is required";
  }

  if (!values.email) {
    errors.email = "Email is required";
  }
  if (!values.password) {
    errors.password = "Password is required";
  }

  if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email) &&
    values.email
  ) {
    errors.email = "Email address is invalid";
  }

  if (values.password.length < 6 && values.password) {
    errors.password = "Password must be at least 6 characters";
  }
  return errors;
};
