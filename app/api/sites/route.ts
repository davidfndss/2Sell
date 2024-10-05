import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { siteSchema } from '../../../utils/validation';
import { z } from 'zod';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedSite = siteSchema.parse(body);
    const newSite = await prisma.site.create({
      data: validatedSite,
    });
    return NextResponse.json(newSite, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  const sites = await prisma.site.findMany();
  return NextResponse.json(sites, { status: 200 });
}
