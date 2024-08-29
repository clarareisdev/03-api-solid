import request  from "supertest";
import { app } from "../../../app";
import { afterAll, beforeAll, describe, expect } from "vitest";
import { it } from "vitest";
import { createAndAuthenticateUser } from "../../../utils/test/create-and-authenticate-user";

describe('Nearby Gyms (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to list nearby gyms', async () => {
        const { token } = await createAndAuthenticateUser(app, true)

        await request(app.server)
          .post('/gyms')
          .set('Authorization', `Bearer ${token}`)
          .send({
            title: 'JavaScript Gym',
            description: 'Some description',
            phone: '62999999999',
            latitude: -16.2777314,
            longitude: -48.9231667,
          })
        
        await request(app.server)
          .post('/gyms')
          .set('Authorization', `Bearer ${token}`)
          .send({
            title: 'TypeScript Gym',
            description: 'Some description',
            phone: '62999999999',
            latitude: -27.0610928,
            longitude: -49.6401091,
        })  

        const response = await request (app.server)
        .get('/gyms/nearby')
        .query({
            latitude: -16.2777314,
            longitude: -48.9231667,
        })
        .set('Authorization', `Bearer ${token}`)
        .send()


        expect(response.statusCode).toEqual(200)
        expect(response.body.gyms).toHaveLength(1)
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title: 'JavaScript Gym'
            })
        ])

    }) 
})