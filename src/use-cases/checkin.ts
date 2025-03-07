import type { CheckIn } from '@prisma/client'
import type { CheckInsRepository } from '../repositories/check-in-repository'
import type { GymsRepository } from '../repositories/gyms-repository'
import { getDistanceBetweenCoordinates } from '../utils/get-distance-between-coordinates'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CheckInUseCaseParams {
  userId: string
  gymId: string
  UserLatitude: number
  UserLongitude: number
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository
  ) {}

  async execute({
    userId,
    gymId,
    UserLatitude,
    UserLongitude,
  }: CheckInUseCaseParams): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    const distance = getDistanceBetweenCoordinates(
      { latitude: UserLatitude, longitude: UserLongitude },
      { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
    )

    const MAX_DISTANCE_IN_KILOMETERS = 0.1
    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new Error()
    }

    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date()
    )
    if (checkInOnSameDay) {
      throw new Error()
    }
    const checkIn = await this.checkInsRepository.create({
      user_id: userId,
      gym_id: gymId,
    })

    return {
      checkIn,
    }
  }
}
