import jwt, { JwtPayload } from "jsonwebtoken";

async function jwtVerify(
  token: string,
  secret: string
): Promise<JwtPayload | undefined> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        reject(err);
      }

      //@ts-ignore
      resolve(decoded);
    });
  });
}

export default jwtVerify;
