import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it, test } from 'vitest'
import { app } from '../../../app'
import { CreateAndAuthenticateUser } from '../../../utils/test/create-and-authenticate-user'

describe('Search Gym Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  it('should be able to search a gym', async () => {
    const { token } = await CreateAndAuthenticateUser(app)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'siao',
        description: null,
        phone: null,
        latitude: 12.7429572,
        longitude: -38.2112697,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'gym 02',
        description: null,
        phone: null,
        latitude: 12.7429572,
        longitude: -38.2112697,
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .query({
        query: 'siao',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'siao',
      }),
    ])
  })
})
