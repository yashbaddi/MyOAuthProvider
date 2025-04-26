
export async function readProfile(req, res, next){
    const token = req.headers["x-access-token"];
    const payload = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString()
    );
    console.log(payload);
    res.json({
      profile: await readProfile(payload.sub.id),
    });
  }