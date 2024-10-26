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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const site = searchParams.get('site');

  try {
    if (site) {
      const siteFound = await prisma.site.findUnique({
        where: { name: site },
      });

      if (!siteFound) {
        return NextResponse.json({ error: 'Site not found' }, { status: 404 });
      }

      return NextResponse.json(siteFound, { status: 200 });
    } else {
      return NextResponse.json({"message": "site not found"}, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
