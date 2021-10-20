import prisma from "../../../prisma";
import { ResolverType } from "../../../types/resolver";
import { AuthTokenTypeEnum, AuthUtils } from "../../../utils/auth-utils";

const artPiece: ResolverType<
  {
    id: string;
    firstName: string;
    lastName: string;
  },
  {
    data: {
      id: string;
    };
  }
> = async (parent, { data: { id } }, context) => {
  const artist = await prisma.artist.findUnique({ where: { id } });

  return artist;
};

export default artPiece;
