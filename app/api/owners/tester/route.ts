import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import * as crypto from "crypto"

const prisma = new PrismaClient();

interface Owner {
  name: string;
  email: string; 
  password: string;
  contactNumber: number
}

export async function GET() { 
  const generateToken = (id: string) => {
    const secret = process.env.SECRET_JWT;
  
    if (!secret) {
      throw new Error('SECRET_JWT is not defined in the environment variables');
    }
  
    return jwt.sign({ id: id }, secret, { expiresIn: 86400 });
  };

  const generateTesterOwner = (): Owner => {
    const randomString = crypto.randomBytes(8).toString("hex").slice(0, 8)
    const generateRandomNumber = (): string => {
      const randomNumberArray: number[] = []
      for(let i = 0; i < 10; i++) {
        randomNumberArray.push(Math.floor(Math.random() * 11))
      }
      return randomNumberArray.join("")
    } 

    return {
      name: "Tester",
      email: `${randomString}@kingdom.com` ,
      password: `${randomString}@&#&@@`,
      contactNumber: Number(generateRandomNumber()),
    }
  }

  try {
   
    const generatedOwner = generateTesterOwner()

    const hashedPassword = await bcrypt.hash(generatedOwner.password, 7)
    const newOwner = await prisma.owner.create({
      data: {...generatedOwner, password: hashedPassword },
    });

    const atk = await generateToken(newOwner.id)
    return NextResponse.json({ atk, message: "User created successfully"}, { status: 201 });
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}