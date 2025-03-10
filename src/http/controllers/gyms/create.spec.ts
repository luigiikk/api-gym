import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it, test } from 'vitest'
import { app } from '../../../app'
import { CreateAndAuthenticateUser } from '../../../utils/test/create-and-authenticate-user'

describe('Create Gym Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  it('should be able to create a gym', async () => {
    const { token } = await CreateAndAuthenticateUser(app)
    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'gym',
        description: null,
        phone: null,
        latitude: 12.7429572,
        longitude: -38.2112697,
      })

    expect(response.statusCode).toEqual(201)
  })
})
