import { createClient } from 'redis';

const client = createClient();

client.on('error', (err) => {
  console.log(err);
});

client.connect();

export default client;
