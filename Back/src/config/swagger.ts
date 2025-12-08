import { schemas } from './swagger/schemas';
import { paths } from './swagger/paths';

export const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'TellMe API',
    version: '1.0.0',
    description: 'API for WhatsApp chatbot management',
    contact: {
      name: 'API Support',
      email: 'support@tellme.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
  paths,
  components: {
    schemas,
  },
};



