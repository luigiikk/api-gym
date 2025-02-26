import { PrismaUsersReposity } from '../../repositories/prisma/prisma-users-repository'
import { RegisterUseCase } from '../register'

export function makeRegisterUseCase() {
  const usersReposity = new PrismaUsersReposity()
  const registerUseCase = new RegisterUseCase(usersReposity)

  return registerUseCase
}
