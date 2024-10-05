import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { ownerSchema } from '../../../utils/validation';
import { z } from 'zod';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedOwner = ownerSchema.parse(body);
    const newOwner = await prisma.owner.create({
      data: validatedOwner,
    });
    return NextResponse.json(newOwner, { status: 201 });
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
