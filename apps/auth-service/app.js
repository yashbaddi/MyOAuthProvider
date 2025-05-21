import express from 'express';
import oauthRouter from './routes/oauth.js';
import clientRouter from './routes/client.js';
import usersRouter from './routes/users.js';
import sessionRouter from './routes/session.js';
import cors from 'cors';
import config from '../config.js';

const app = express();
const port = config.authServicePort;
app.use(express.json());

app.use(cors(
  
));

app.use('/client', clientRouter);
app.use('/oauth', oauthRouter);
app.use('/session', sessionRouter);
app.use('/users', usersRouter);

app.use((err, _req, res) => {
  res.status(err.code || 500).json(err);
});

app.listen(port, () => {
  console.log('Server is running on port 4000');
});
