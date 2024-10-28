import { NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client';
import { NextApiRequest } from 'next';

const prisma = new PrismaClient();

export async function GET(
  req: NextApiRequest,
  { params }: { params: { ownerId: string } }
) {
  const { ownerId } = params;

  try {
    if (ownerId.length !== 24 || !/^[a-f0-9]{24}$/i.test(ownerId)) {
      return NextResponse.json(
        {
          error: 'Invalid ID format. The provided ID must be a 24-character hexadecimal string.',
        },
        { status: 400 }
      );
    }

    const owner = await prisma.owner.findUnique({ where: { id: ownerId }, include: { sites: true } });

    if (!owner) {
      return NextResponse.json({ error: 'Owner not found' }, { status: 404 });
    }

    return NextResponse.json(owner, { status: 200 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2023') {
        return NextResponse.json(
          {
            error:
              'Database error occurred. Please ensure the request data is valid.',
          },
          { status: 400 }
        );
      }
    }

    console.error('An unexpected error occurred:', error);
    return NextResponse.json(
      {
        error: 'An unexpected error occurred. Please try again later.',
      },
      { status: 500 }
    );
  }
}