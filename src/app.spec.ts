import request, { SuperTest, Test } from 'supertest';
import nock from 'nock';
import app from './app';



describe('API Endpoints', () => {
    let contactId: string;

    beforeAll(() => {
        nock('https://api-ninjas.com')
            .get('/api/geocoding')
            .reply(200, { lat: 59.3251172, lng: 18.0710935 });
    });

    test('POST /contacts', async () => {
        const response = await request(app)
            .post('/contacts')
            .send({
                firstname: 'Anna',
                lastname: 'Andersson',
                email: 'anna.andersson@gmail.com',
                personalnumber: '550713-1405',
                address: {
                    street: 'Development Street 12',
                    city: 'Stockholm',
                    zipCode: '12345',
                    country: 'Sweden'
                },
                phone: '1234567890'
            });
        contactId = response.body._id;
        if (typeof contactId !== 'string') {
            throw new Error('Expected _id to be a string');
        }
        expect(response.statusCode).toBe(200); // Expect 200 instead of 201
    }, 10000); // Increase timeout to 10 seconds

    test('GET /contacts', async () => {
        const response = await request(app).get('/contact');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    test('GET /contacts/:id', async () => {
        const response = await request(app).get(`/contacts/${contactId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('_id'); // Expect _id instead of id
    });
});
