import { Decimal } from '@prisma/client/runtime/library'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '../repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '../repositories/in-memory/in-memory-gyms-repository'
import { CheckInUseCase } from './checkin'

let checkInsrespository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let checkInUseCase: CheckInUseCase
describe('Get User Profile Use Case', () => {
  beforeEach(async () => {
    checkInsrespository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    checkInUseCase = new CheckInUseCase(checkInsrespository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-01',
      title: 'gym',
      description: '',
      phone: '',
      latitude: 0,
      longitude: 0,
    })
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await checkInUseCase.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      UserLatitude: 0,
      UserLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    await checkInUseCase.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      UserLatitude: 0,
      UserLongitude: 0,
    })

    await expect(() =>
      checkInUseCase.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        UserLatitude: 0,
        UserLongitude: 0,
      })
    ).rejects.toBeInstanceOf(Error)
  })
  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    await checkInUseCase.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      UserLatitude: 0,
      UserLongitude: 0,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))
    const { checkIn } = await checkInUseCase.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      UserLatitude: 0,
      UserLongitude: 0,
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })
  it('should not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'gym',
      description: '',
      phone: '',
      latitude: new Decimal(12.7429572),
      longitude: new Decimal(-38.2112697),
    })

    await expect(
      checkInUseCase.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        UserLatitude: -12.894208,
        UserLongitude: -38.404096,
      })
    ).rejects.toBeInstanceOf(Error)
  })
})
