import * as request from 'supertest';
import {expect} from 'chai';
import {app} from '../src/app';
import {Note} from '../src/models/note';

const firstNote = {
  title: "First note",
  body: "This is a note",
  color: "red",
};

beforeEach(async () => {
  await Note.deleteMany();
  await new Note(firstNote).save();
});

describe('POST /notes', () => {
  it('Should successfully insert a new note', async () => {
    const response = await request(app).post('/notes').send({
      title: "Second note",
      body: "This is a different note",
      color: "yellow",
    }).expect(201);

    expect(response.body).to.include({
      title: "Second note",
      body: "This is a different note",
      color: "yellow",
    });

    const secondNote = await Note.findById(response.body._id);
    expect(secondNote).not.to.be.null;
    expect(secondNote!.color).to.equal('yellow');
  });

  it('Should get an error', async () => {
    await request(app).post('/notes').send(firstNote).expect(400);
  });
});

describe('GET /notes', () => {
  it('Should get a note by title', async () => {
    await request(app).get('/notes/?title=First note').expect(200);
  });

  it('Should not find a note by title', async () => {
    await request(app).get('/notes/?title=Second note').expect(404);
  });
});
