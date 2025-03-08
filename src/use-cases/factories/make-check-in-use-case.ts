import { PrismaCheckInsRepository } from '../../repositories/prisma/prisma-check-ins-repository'
import { PrismaGymsRepository } from '../../repositories/prisma/prisma-gyms-repository'
import { CheckInUseCase } from '../checkin'

export function makeCheckInUseCase() {
  const checkInsrepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepository()

  const useCase = new CheckInUseCase(checkInsrepository, gymsRepository)

  return useCase
}
