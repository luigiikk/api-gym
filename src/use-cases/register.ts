import { hash } from 'bcryptjs'
import type { UsersRepository } from '../repositories/users-repository'

interface RegisterUsecaseParams {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUsecaseParams) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.userRepository.findByEmail(email)
    if (userWithSameEmail) {
      throw new Error('E-mail already existis')
    }

    await this.userRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
