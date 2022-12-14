import * as express from 'express';
import {Note} from '../models/note';

export const postRouter = express.Router();

postRouter.post('/notes', async (req, res) => {
  const note = new Note(req.body);

  try {
    await note.save();
    return res.status(201).send(note);
  } catch (error) {
    return res.status(400).send(error);
  }
});
