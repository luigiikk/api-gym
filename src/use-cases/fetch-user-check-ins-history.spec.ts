import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckInsRepository } from '../repositories/in-memory/in-memory-check-ins-repository'
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history'

let checkInsrespository: InMemoryCheckInsRepository
let fetchUserCheckinsHistoryUseCase: FetchUserCheckInsHistoryUseCase
describe('Fetch User Check-ins History Use Case', () => {
  beforeEach(async () => {
    checkInsrespository = new InMemoryCheckInsRepository()
    fetchUserCheckinsHistoryUseCase = new FetchUserCheckInsHistoryUseCase(checkInsrespository)

  })
  it('should be able to fetch user check-in history', async () => {
    await checkInsrespository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })
    await checkInsrespository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })
    const { checkIns } = await fetchUserCheckinsHistoryUseCase.execute({
      userId: 'user-01',
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({gym_id: 'gym-01'}),
      expect.objectContaining({gym_id: 'gym-02'})
    ])
  })
})
