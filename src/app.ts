import * as express from 'express';
import './db/mongoose';
import {postRouter} from './routers/post';
import {getRouter} from './routers/get';
import {patchRouter} from './routers/patch';
import {deleteRouter} from './routers/delete';
import {defaultRouter} from './routers/default';

export const app = express();
app.use(express.json());
app.use(postRouter);
app.use(getRouter);
app.use(patchRouter);
app.use(deleteRouter);
app.use(defaultRouter);
