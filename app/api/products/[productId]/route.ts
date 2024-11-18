import { NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request, {params}: { params: {productId: string} }) {
  const { productId } = params 

  if (!productId) {
    return NextResponse.json(
      {
        error: 'Invalid ID.',
      },
      { status: 400 }
    );
  }

  try {
    const product = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product) {
      return NextResponse.json({ error: 'product not found' }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2023') {
        return NextResponse.json(
          {
            error: 'Database error occurred. Please ensure the request data is valid.',
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