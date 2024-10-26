import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { SigninSchema } from '../../../utils/validation';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const generateToken = (id: String) => jwt.sign({ id: id }, process.env.SECRET_JWT, { expiresIn: 86400 });

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const validationResult = SigninSchema.parse({ email, password });
    if (!validationResult) {
      return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
    }

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const foundUser = await prisma.owner.findUnique({
      where: { email },
    });

    if (!foundUser) {
      return NextResponse.json({ error: 'Incorrect email or password' }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, foundUser.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Incorrect email or password' }, { status: 401 });
    }

    const atk = generateToken(foundUser.id);
    return NextResponse.json({ atk, message: "User logged in successfully" }, { status: 200 });

  } catch (error) {
    console.error('Error during authentication:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
