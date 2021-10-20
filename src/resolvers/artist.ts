import prisma from "../prisma";
import { ResolverType } from "../types/resolver";
import { AuthTokenTypeEnum, AuthUtils } from "../utils/auth-utils";

const artist: {
  email: ResolverType<string | null, {}, { id: string }>;
  artPieces: ResolverType<
    { id: string; name: string; description: string }[],
    {},
    { id: string }
  >;
} = {
  async email({ id }, data, context, info) {
    const {
      artist: { id: artistId },
    } = AuthUtils.checkAuthRank(context, AuthTokenTypeEnum.Artist);

    const artist = await prisma.artist.findUnique({ where: { id } });

    if (artistId === id) {
      return artist.email;
    }

    return null;
  },
  async artPieces({ id }, data, context, info) {
    return await prisma.artist.findUnique({ where: { id } }).artPieces();
  },
};

export default artist;
