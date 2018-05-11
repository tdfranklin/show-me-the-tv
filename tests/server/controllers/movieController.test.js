const request = require('supertest');
const app = require('../../../server/server');



describe('movieController', () => {
    it('returns data from /api/movie/popular route', () => {
        return request(app).get('/api/movie/popular')
        .then(res => {
            expect(res).toBeTruthy();
        })
        .catch(err => console.log(err));
    });

    it('returns data from /api/movie/:id route', () => {
        return request(app).get('/api/movie/299536')
        .then(res => {
            expect(res).toBeTruthy();
        })
        .catch(err => console.log(err));
    });

    it('returns data from /api/movie/search/:text route', () => {
        return request(app).get('/api/movie/search/braveheart')
        .then(res => {
            expect(res).toBeTruthy();
        })
        .catch(err => console.log(err));
    });
});