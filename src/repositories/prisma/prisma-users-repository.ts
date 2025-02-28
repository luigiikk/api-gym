import type { Prisma, User } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import type { UsersRepository } from '../users-repository'

export class PrismaUsersReposity implements UsersRepository {
  async findById(userId: string): Promise<User | null> {
    
  }
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })
    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }
}
