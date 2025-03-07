import { compare } from 'bcryptjs'
import { describe, expect, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { RegisterUseCase } from './register'
import { InMemoryGymsRepository } from '../repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let createGymUseCase: CreateGymUseCase
describe('Register Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    createGymUseCase = new CreateGymUseCase(gymsRepository)
  })
  
  it('should be able register', async () => {
    const { gym } = await createGymUseCase.execute({
      title: 'gym',
      description: null,
      phone: null,
      latitude: 12.7429572,
      longitude: -38.2112697,
    })

    expect(gym.id).toEqual(expect.any(String))
  })

})
