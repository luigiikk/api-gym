import type { FastifyInstance } from 'fastify'
import { veifyJWT } from '../../middlewares/verify-jwt'
import { create } from './create'
import { history } from './history'
import { metrics } from './metrics'
import { validate } from './validate'
import { verifyUserRole } from '../../middlewares/verify-user-role'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', veifyJWT)

  app.get('/check-ins/history', history)
  app.get('/check-ins/metrics', metrics)

  app.post('/gyms/:gymId/check-ins', create)
  app.patch(
    '/check-ins/:checkInId/validate',
    { onRequest: [verifyUserRole('ADMIN')] },
    validate
  )
}
