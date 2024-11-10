import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { ownerSchema } from '../../../utils/validation-schemas';
import { z } from 'zod';
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const prisma = new PrismaClient();

export async function POST(req: Request) { 
  const generateToken = (id: string) => {
    const secret = process.env.SECRET_JWT;
  
    if (!secret) {
      throw new Error('SECRET_JWT is not defined in the environment variables');
    }
  
    return jwt.sign({ id: id }, secret, { expiresIn: 86400 });
  };

  try {
    const body = await req.json();
    const validatedOwner = ownerSchema.parse(body);

    const foundUser = await prisma.owner.findUnique({where: {email: body.email}})
    if (foundUser) return NextResponse.json({message: "E-mail already registered"},{status: 400})

    const hashedPassword = await bcrypt.hash(body.password, 7)
    const newOwner = await prisma.owner.create({
      data: {...validatedOwner, password: hashedPassword },
    });

    const atk = await generateToken(newOwner.id)
    return NextResponse.json({ atk, message: "User created successfully"}, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}