import type { FastifyInstance } from 'fastify'
import { veifyJWT } from '../../middlewares/verify-jwt'


export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', veifyJWT)

  
}
