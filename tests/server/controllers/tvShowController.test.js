const request = require('supertest');
const app = require('../../../server/server');



describe('tvShowController', () => {
    it('returns data from /api/tv/popular route', () => {
        return request(app).get('/api/tv/popular')
        .then(res => {
            expect(res).toBeTruthy();
        })
        .catch(err => console.log(err));
    });

    it('returns data from /api/tv/:id route', () => {
        return request(app).get('/api/tv/1418')
        .then(res => {
            expect(res).toBeTruthy();
        })
        .catch(err => console.log(err));
    });

    it('returns data from /api/tv/search/:text route', () => {
        return request(app).get('/api/tv/search/house')
        .then(res => {
            expect(res).toBeTruthy();
        })
        .catch(err => console.log(err));
    });
});