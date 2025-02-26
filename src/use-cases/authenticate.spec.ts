import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersReposity: InMemoryUsersRepository
let authenticateUseCase: AuthenticateUseCase
describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersReposity = new InMemoryUsersRepository()
    authenticateUseCase = new AuthenticateUseCase(usersReposity)
  })
  it('should be able authenticate', async () => {
    await usersReposity.create({
      name: 'John Doe',
      email: 'jhondoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await authenticateUseCase.execute({
      email: 'jhondoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
  it('should not be able to authenticate with wrong email', async () => {
    expect(() =>
      authenticateUseCase.execute({
        email: 'johndoe@example.com',
        password: '123456',
      })
    ).rejects.instanceOf(InvalidCredentialsError)
  })
  it('should not be able to authenticate with wrong password', async () => {
    
    await usersReposity.create({
      name: 'John Doe',
      email: 'jhondoe@example.com',
      password_hash: await hash('123456', 6),
    })

    expect(() =>
      authenticateUseCase.execute({
        email: 'johndoe@example.com',
        password: '123123',
      })
    ).rejects.instanceOf(InvalidCredentialsError)
  })
})
