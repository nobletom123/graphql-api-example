import { prisma } from ".prisma/client";
import { versionInfo } from "graphql";
import jwt from "jsonwebtoken";

export enum AuthTokenTypeEnum {
  Customer = "customer",
  Artist = "artist",
}
type CreateAuthToken = {
  id: string;
  email: string;
  type: AuthTokenTypeEnum;
};

type GetAuthContextParams = {
  req: {
    cookies?: { jwt: string };
    headers: { authorization?: string };
    session?: { jwt: string };
  };
  res: Record<string, any>;
};

class AuthUtils {
  static async getAuthContext({ req, res }: GetAuthContextParams) {
    const context = {
      setCookies: new Array(),
      setHeaders: new Array(),
    };
    const authorizationHeader = req.headers.authorization || req.cookies?.jwt;
    if (!authorizationHeader || typeof authorizationHeader !== "string") {
      return context;
    }

    const [, token] = authorizationHeader.split(" ");

    if (!token) {
      return context;
    }

    try {
      const verified = (await jwt.verify(
        token,
        process.env.JWT_SECRET!
      )) as jwt.JwtPayload;

      context[verified.rank] = verified;
    } catch (e) {
      throw new Error("Authorization Failed - Your Token Is Corrupted");
    }

    return context;
  }

  static checkAuthRank(context, tokenType: AuthTokenTypeEnum) {
    const { [tokenType]: user } = context;

    if (user) {
      throw new Error("You do not have permissiont to perform this operation");
    }

    return context;
  }

  static async createAuthToken({ id, email, type }: CreateAuthToken) {
    const data = { id, email, type };

    const token = await jwt.sign(data, process.env.JWT_SECRET!);

    return token;
  }
}

export { AuthUtils };
