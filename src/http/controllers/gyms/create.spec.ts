import request  from "supertest";
import { app } from "../../../app";
import { afterAll, beforeAll, describe, expect } from "vitest";
import { it } from "vitest";
import { createAndAuthenticateUser } from "../../../utils/test/create-and-authenticate-user";

describe('Create Gym (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to create a gym', async () => {
        const { token } = await createAndAuthenticateUser(app, true)

        const response = await request(app.server)
          .post('/gyms')
          .set('Authorization', `Bearer ${token}`)
          .send({
            title: 'JavaScript Gym',
            description: 'Some description',
            phone: '62999999999',
            latitude: -16.2777314,
            longitude: -48.9231667,
          })
        
        expect(response.statusCode).toEqual(201)
        
    }) 
})