import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { productSchema } from '../../../utils/validation-schemas';
import { z } from 'zod';
import { supabase } from '../../../utils/supabaseClient';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedProduct = productSchema.parse(body);
    const imageUrls: string[] = [];

    for (const file of validatedProduct.imageUrl) {
      const { data, error } = await supabase.storage
        .from("product-images")
        .upload(`products/${Date.now()}_${file.name}`, file);

      if (error) {
        throw new Error(`Erro ao fazer upload da imagem: ${error.message}`);
      }

      const { publicURL, error: urlError } = supabase
        .storage
        .from('your-bucket-name')
        .getPublicUrl(data.path);

      if (urlError) {
        throw new Error(`Erro ao obter URL da imagem: ${urlError.message}`);
      }

      imageUrls.push(publicURL);
    }

    const newProduct = await prisma.product.create({
      data: {
        ...validatedProduct,
        imageUrl: imageUrls,
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}