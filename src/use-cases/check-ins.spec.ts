import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckInsRepository } from '../repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './checkin'


let checkInsrespository: InMemoryCheckInsRepository
let checkInUseCase: CheckInUseCase
describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    checkInsrespository = new InMemoryCheckInsRepository()
    checkInUseCase = new CheckInUseCase(checkInsrespository)
  })
  it('should be able to check in', async () => {
    const { checkIn } = await checkInUseCase.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
