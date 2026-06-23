import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { sendEmail } from '../utils/email.js';
import { validateContactForm } from '../utils/validators.js';
import { logger } from '../utils/logger.js';

export async function contactRoutes(fastify: FastifyInstance) {
  fastify.post('/send', async (request, reply) => {
    try {
      const body = validateContactForm(request.body);

      logger.info(`📧 Nouveau message de contact: ${body.email}`);

      const result = await sendEmail({
        from: process.env.EMAIL_FROM || 'noreply@aliciahenneton.com',
        to: process.env.EMAIL_TO || 'contact@aliciahenneton.com',
        replyTo: body.email,
        subject: `Nouveau message: ${body.subject}`,
        html: `
          <h2>Nouveau message de contact</h2>
          <p><strong>Nom:</strong> ${body.name}</p>
          <p><strong>Email:</strong> ${body.email}</p>
          <p><strong>Sujet:</strong> ${body.subject}</p>
          <hr>
          <p><strong>Message:</strong></p>
          <p>${body.message.replace(/\n/g, '<br>')}</p>
        `,
      });

      logger.info(`✅ Email envoyé avec succès (${result})`);

      return {
        success: true,
        message: 'Message envoyé avec succès!',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        logger.warn(`❌ Validation error: ${JSON.stringify(error.errors)}`);
        return reply.status(400).send({
          success: false,
          message: 'Données invalides',
          errors: error.errors,
        });
      }

      logger.error(`❌ Erreur lors de l'envoi du message: ${error}`);
      return reply.status(500).send({
        success: false,
        message: 'Erreur lors de l\'envoi du message',
      });
    }
  });
}
