import type { FastifyInstance } from 'fastify'
import { veifyJWT } from '../../middlewares/verify-jwt'
import { verifyUserRole } from '../../middlewares/verify-user-role'
import { create } from './create'
import { nearby } from './nearby'
import { search } from './search'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', veifyJWT)

  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)

  app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')] }, create)
}
