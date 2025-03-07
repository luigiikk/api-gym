import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckInsRepository } from '../repositories/in-memory/in-memory-check-ins-repository'
import { GetUserMetricsUseCase } from './get-user-metrics'

let checkInsrespository: InMemoryCheckInsRepository
let getUserMetricsUseCase: GetUserMetricsUseCase
describe('Get User Metrics Use Case', () => {
  beforeEach(async () => {
    checkInsrespository = new InMemoryCheckInsRepository()
    getUserMetricsUseCase = new GetUserMetricsUseCase(checkInsrespository)
  })
  it('should be able to get checkins count from metrics', async () => {
    await checkInsrespository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })
    await checkInsrespository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })
    const { checkInsCount } = await getUserMetricsUseCase.execute({
      userId: 'user-01',
    })

    expect(checkInsCount).toEqual(2)
  })
})
