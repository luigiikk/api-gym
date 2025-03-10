import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it, test } from 'vitest'
import { app } from '../../../app'
import { prisma } from '../../../lib/prisma'
import { CreateAndAuthenticateUser } from '../../../utils/test/create-and-authenticate-user'

describe('History Check-in Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  it('should be able to list the history of check-in', async () => {
    const { token } = await CreateAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()
    const gym = await prisma.gym.create({
      data: {
        title: 'gym',
        description: null,
        phone: null,
        latitude: 12.7429572,
        longitude: -38.2112697,
      },
    })

    await prisma.checkIn.createMany({
      data: [
        {
          gym_id: gym.id,
          user_id: user.id,
        },
        {
          gym_id: gym.id,
          user_id: user.id,
        },
      ],
    })
    const response = await request(app.server)
      .get('/check-ins/history')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.checkIns).toEqual([
      expect.objectContaining({
        gym_id: gym.id,
        user_id: user.id,
      }),
      expect.objectContaining({
        gym_id: gym.id,
        user_id: user.id,
      }),
    ])
  })
})
