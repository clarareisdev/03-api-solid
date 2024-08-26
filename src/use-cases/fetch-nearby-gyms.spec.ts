import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '../repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'


let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
   beforeEach(async() => {
     gymsRepository = new InMemoryGymsRepository()
     sut = new FetchNearbyGymsUseCase(gymsRepository)
    })

  it('should be able to fetch near by gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -16.2777314,
      longitude: -48.9231667,
    })
    
    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -27.0610928,
      longitude: -49.6401091,
    })

    const { gyms } = await sut.execute({
        userLatitude: -16.3250176,
        userLongitude: -48.9193472,
     
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])

   })
    
})

