import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it, test } from 'vitest'
import { app } from '../../../app'
import { CreateAndAuthenticateUser } from '../../../utils/test/create-and-authenticate-user'

describe('Nearby Gym Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  it('should be able to list nearby gyms', async () => {
    const { token } = await CreateAndAuthenticateUser(app)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Near Gym',
        description: null,
        phone: null,
        latitude: 12.7429572,
        longitude: -38.2112697,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Far Gym',
        description: null,
        phone: null,
        latitude: -12.8465475,
        longitude: -38.2681068,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: 12.7429572,
        longitude: -38.2112697,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Near Gym',
      }),
    ])
  })
})
