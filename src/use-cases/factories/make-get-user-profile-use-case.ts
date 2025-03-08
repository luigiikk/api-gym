import { PrismaUsersReposity } from '../../repositories/prisma/prisma-users-repository'
import { GetUserProfileUseCase } from '../get-user-profile'

export function makeGetUserProfileUseCase() {
  const usersReposity = new PrismaUsersReposity()
  const useCase = new GetUserProfileUseCase(usersReposity)

  return useCase
}
