import _ from 'mocha';
import {expect} from 'chai';
import supertest from 'supertest';
import server from '../src/server.js';
import {orm} from '../src/modules/pension/pension.service.js';

describe('test suite', () => {
  const request = supertest.agent(server, {http2: true});

  after(done => {
    void orm.close();
    server.close(done);
  });

  it('Get all pension pots', async () => {
    const response = await request
      .get('/pensions');

    expect(response.status).to.equal(200);
    expect(response.body.object).to.equal('list');
    expect(response.body.offset).to.equal(0);
    expect(response.body.limit).to.equal(10);
    expect(response.body.total).to.equal(7);
    expect(response.body.data).to.have.lengthOf(7);
  });

  it('Search for a specific pot by name', async () => {
    const response = await request
      .get('/pensions?likePotName=Google');

    expect(response.status).to.equal(200);
    expect(response.body.object).to.equal('list');
    expect(response.body.offset).to.equal(0);
    expect(response.body.limit).to.equal(10);
    expect(response.body.total).to.equal(1);
    expect(response.body.data).to.have.lengthOf(1);
    expect(response.body.data[0].id).to.equal('e181e498-9cab-4570-a188-ed699dc5eefd');
  });

  it('Search for a specific pot by ID', async () => {
    const response = await request
      .get('/pensions?likeId=024120bac5ba');

    expect(response.status).to.equal(200);
    expect(response.body.object).to.equal('list');
    expect(response.body.offset).to.equal(0);
    expect(response.body.limit).to.equal(10);
    expect(response.body.total).to.equal(1);
    expect(response.body.data).to.have.lengthOf(1);
    expect(response.body.data[0].id).to.equal('5de51030-02f3-48c0-bd54-024120bac5ba');
  });

  it('Search for pots with a value over X', async () => {
    const response = await request
      .get('/pensions?gtAmount=120000');

    expect(response.status).to.equal(200);
    expect(response.body.object).to.equal('list');
    expect(response.body.offset).to.equal(0);
    expect(response.body.limit).to.equal(10);
    expect(response.body.total).to.equal(1);
    expect(response.body.data).to.have.lengthOf(1);
    expect(response.body.data[0].id).to.equal('c759b80a-558a-488d-aba9-f1ee9593020b');
  });

  it('Search for pots with a value under X', async () => {
    const response = await request
      .get('/pensions?ltAmount=200');

    expect(response.status).to.equal(200);
    expect(response.body.object).to.equal('list');
    expect(response.body.offset).to.equal(0);
    expect(response.body.limit).to.equal(10);
    expect(response.body.total).to.equal(1);
    expect(response.body.data).to.have.lengthOf(1);
    expect(response.body.data[0].id).to.equal('1509481e-565d-444a-8e24-d72d3244b663');
  });
});
