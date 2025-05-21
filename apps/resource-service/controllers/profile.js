import { readProfileDB } from '../models/profile.js';

export async function readProfile(req, res) {
  const token = req.headers['x-access-token'];
  const payload = JSON.parse(
    Buffer.from(token.split('.')[1], 'base64').toString()
  );
  console.log(payload);
  res.json({
    profile: await readProfileDB(payload.sub.id),
  });
}
