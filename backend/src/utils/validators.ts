import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères').max(100),
  email: z.string().email('Email invalide'),
  subject: z.string().min(3, 'Le sujet doit contenir au moins 3 caractères').max(200),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères').max(5000),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export function validateContactForm(data: unknown): ContactFormData {
  return contactFormSchema.parse(data);
}
