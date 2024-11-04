import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export async function GET(req: Request, { params }: { params: { siteName: string } }) {
  const { siteName } = params;

  if (!siteName) {
    return NextResponse.json({ error: 'Site name is required' }, { status: 400 });
  }

  try {
    const response = await prisma.site.findUnique({ 
      where: {
        name: siteName
      },
      include: {
        products: true
      }
    })
    
    if (!response) return NextResponse.json({message: "Site not found"}, {status: 404});

    return NextResponse.json(response, {status: 200});
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 500 });
    } else {
      console.error(err)
      return NextResponse.json("error", { status: 500 });
    }

  }

}