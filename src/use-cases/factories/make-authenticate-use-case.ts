import { PrismaUsersReposity } from "../../repositories/prisma/prisma-users-repository"
import { AuthenticateUseCase } from "../authenticate"

export function makeAuthenticateUseCase() {
  const usersReposity = new PrismaUsersReposity()
  const authenticateUseCase = new AuthenticateUseCase(usersReposity)

  return authenticateUseCase
}