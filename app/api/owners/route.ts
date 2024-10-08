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
    const body = await request.json();
    const validatedOwner = ownerSchema.parse(body);

    const foundUser = await prisma.owner.findUnique({where: {email: body.email}})
    if (foundUser) return NextResponse.json({message: "E-mail já cadastrado"},{status: 400})

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

    console.log( error instanceof Error ? error.message : null)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  const owners = await prisma.owner.findMany();
  return NextResponse.json(owners, { status: 200 });
}
