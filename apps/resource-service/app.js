import express from 'express';
import cors from 'cors';
import profileRouter from './routes/profile.js';
import config from '../config.js';

const app = express();
const port = config.resourceServicePort;

app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);

app.use('/profile/', profileRouter);

app.listen(port, () => {
  if (config.environment === 'development') {
    console.log('Server is running on port localhost:' + port);
  }
});
