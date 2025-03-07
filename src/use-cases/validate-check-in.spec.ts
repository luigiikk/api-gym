import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '../repositories/in-memory/in-memory-check-ins-repository'
import { LateCheckInValidateError } from './errors/late-check-in-validate-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { ValidateCheckInUseCase } from './validate-check-in'

let checkInsrespository: InMemoryCheckInsRepository
let validadeCheckInUseCase: ValidateCheckInUseCase
describe('Validate Check In Use Case', () => {
  beforeEach(async () => {
    checkInsrespository = new InMemoryCheckInsRepository()
    validadeCheckInUseCase = new ValidateCheckInUseCase(checkInsrespository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate the check-in', async () => {
    const createdCheckIn = await checkInsrespository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })
    const { checkIn } = await validadeCheckInUseCase.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInsrespository.items[0].validated_at).toEqual(expect.any(Date))
  })
  it('should not be able to validate an inexistent check-in', async () => {
    await expect(() =>
      validadeCheckInUseCase.execute({
        checkInId: 'inexistent-check-in-id',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
  it('should not be able to validate the check-in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2025, 0, 1, 13, 40))

    const createdCheckIn = await checkInsrespository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })
    const twentyOneMinutesInMs = 1000 * 60 * 21
    vi.advanceTimersByTime(twentyOneMinutesInMs)

    await expect(() =>
      validadeCheckInUseCase.execute({
        checkInId: createdCheckIn.id,
      })
    ).rejects.toBeInstanceOf(LateCheckInValidateError)
  })
})
