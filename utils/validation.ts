import { z } from 'zod';

export const ownerSchema = z.object({
  name: z.string().min(3, 'O nome precisa ter no mínimo 3 carateres'),
  email: z.string().email('Endereço de e-mail inválido'),
  password: z.string()
    .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/, 'A senha deve ter pelo menos 6 caracteres, conter um número e um caractere especial'),
  phone: z.string().optional(),
});

export const SigninSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

export const siteSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  color: z.string().min(1, 'Color is required'),
  icon: z.string().min(1, 'Icon is required'),
  tags: z.array(z.string()).optional(),
  ownerId: z.string().length(24, 'Invalid owner ID'),
});

export const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  location: z.string().min(1, 'Location is required'),
  tags: z.array(z.string()).optional(),
  siteId: z.string().length(24, 'Invalid site ID'),
});