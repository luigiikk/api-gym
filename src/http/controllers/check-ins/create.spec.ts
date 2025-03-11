import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it, test } from 'vitest'
import { app } from '../../../app'
import { CreateAndAuthenticateUser } from '../../../utils/test/create-and-authenticate-user'
import { prisma } from '../../../lib/prisma'

describe('Create Check-in Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  it('should be able to create a check-in', async () => {
    const { token } = await CreateAndAuthenticateUser(app, true)

    const gym = await prisma.gym.create({
      data: {
        title: 'gym',
        description: null,
        phone: null,
        latitude: 12.7429572,
        longitude: -38.2112697,
      }
    })
    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: 12.7429572,
        longitude: -38.2112697,
      })

    expect(response.statusCode).toEqual(201)
  })
})
