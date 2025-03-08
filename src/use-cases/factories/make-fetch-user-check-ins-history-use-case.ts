import { PrismaCheckInsRepository } from '../../repositories/prisma/prisma-check-ins-repository'
import { FetchUserCheckInsHistoryUseCase } from '../fetch-user-check-ins-history'


export function makeFetchUserCheckInsHistoryUseCase() {
  const checkInsrepository = new PrismaCheckInsRepository()
  const useCase = new FetchUserCheckInsHistoryUseCase(checkInsrepository)

  return useCase
}
