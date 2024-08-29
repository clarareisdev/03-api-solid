import request  from "supertest";
import { app } from "../../../app";
import { afterAll, beforeAll, describe, expect } from "vitest";
import { it } from "vitest";
import { createAndAuthenticateUser } from "../../../utils/test/create-and-authenticate-user";
import { prisma } from "../../../lib/prisma";

describe('Create Check-in (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to create a check-in', async () => {
        const { token } = await createAndAuthenticateUser(app)

        const gym = await prisma.gym.create({
          data: {
            title: 'JavaScript Gym',
            latitude: -16.2777314,
            longitude: -48.9231667,
          },
        })

        const response = await request(app.server)
          .post(`/gyms/${gym.id}/check-ins`)
          .set('Authorization', `Bearer ${token}`)
          .send({
            latitude: -16.2777314,
            longitude: -48.9231667,
          })
        
        expect(response.statusCode).toEqual(201)
        
    }) 
})