import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { ownerSchema } from '../../../utils/validation';
import { z } from 'zod';
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const generateToken = (id: string) => jwt.sign({ id: id }, process.env.SECRET_JWT, { expiresIn: 86400 });

  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password is required' }, { status: 400 });
    }

    const foundUser = await prisma.owner.findUnique({
      where: { email }
    });

    if (!foundUser) {
      return NextResponse.json({ error: 'Icorrect E-mail or password' }, { status: 500 });
    }

    if (!await bcrypt.compare(password, foundUser.password)) {
      return NextResponse.json({ bcrypt: await bcrypt.compare(password, foundUser.password), password: password, fupassword: foundUser.password, message: "Incorrect E-mail or password" }, { status: 500 });
    }

    const atk = generateToken(foundUser.id);
    return NextResponse.json({ atk, message: "Used logged successfully" }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
