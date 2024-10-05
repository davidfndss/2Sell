import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { productSchema } from '../../../utils/validation';
import { z } from 'zod';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedProduct = productSchema.parse(body);
    const newProduct = await prisma.product.create({
      data: validatedProduct,
    });
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  const products = await prisma.product.findMany();
  return NextResponse.json(products, { status: 200 });
}