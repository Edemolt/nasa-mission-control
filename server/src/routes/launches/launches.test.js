const request = require('supertest');
const app = require('../../app');
const {mongo_connect, mongo_disconnet} = require('../../services/mongo');

describe('Launches API', () => {

    beforeAll(async () => {
        await mongo_connect();
    });

    afterAll(async () => {
        await mongo_disconnet();
    })

    describe('TEST GET /launches', () => {
        test('It should respond with 200 status', async ()=> {
            const response = await request(app)
            .get('/v1/launches')
            .expect('Content-Type', /json/)
            .expect(200);
    
        
        });
    });
    
    describe('TEST POST /launches', () => {
        const launch_data = {
            mission : 'MANGAL',
            rocket : 'MANAGALYAN',
            target : 'Kepler-62 f',
            launchDate : 'January 4, 2098',
        }
    
        const launch_data_no_data = {
            mission : 'MANGAL',
            rocket : 'MANAGALYAN',
            target : 'Kepler-62 f',
        }
    
        const invalid_launch_data = {
            mission : 'MANGAL',
            rocket : 'MANAGALYAN',
            target : 'MANGAL-GRAHA',
            launchDate : 'NANI',
        }
        test(' it should response with 201 status',async () => {
            const response = await request(app)
            .post('/v1/launches')
            .send(launch_data)
            .expect('Content-Type', /json/)
            .expect(201);
        
            const requestDate = new Date(launch_data.launchDate).valueOf();
            const responseDate = new Date(response.body.launchDate).valueOf();
    
            expect(responseDate).toBe(requestDate);
    
        expect(response.body).toMatchObject(launch_data_no_data);
        })
    
        test(' it should catch missing required property ', async () => {
            const response = await request(app)
            .post('/v1/launches')
            .send(launch_data_no_data)
            .expect('Content-Type', /json/)
            .expect(400);
    
            expect(response.body).toStrictEqual({
                error : 'Missing required attributes',
            })
        });
    
    
        test(' it should catch invalid dates', async () => {
            const response = await request(app)
            .post('/v1/launches')
            .send(invalid_launch_data)
            .expect('Content-Type', /json/)
            .expect(400);
    
            expect(response.body).toStrictEqual({
                error: 'Invalid date have u entered',
            })
    
        });
    });
})

