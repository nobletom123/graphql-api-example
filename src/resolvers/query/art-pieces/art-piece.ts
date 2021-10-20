import prisma from "../../../prisma";
import { ResolverType } from "../../../types/resolver";
import { AuthTokenTypeEnum, AuthUtils } from "../../../utils/auth-utils";

const artPiece: ResolverType<
  {
    id: string;
    name: string;
    description: string;
  },
  {
    data: {
      artPiece: string;
    };
  }
> = async (parent, { data: { artPiece } }, context) => {
  const {
    artist: { id: artistId },
  } = AuthUtils.checkAuthRank(context, AuthTokenTypeEnum.Artist);

  const retrieveArtPiece = await prisma.artPiece.findUnique({
    where: { id: artPiece },
    include: {
      artist: {},
      order: { include: { customer: {} } },
    },
  });

  if (retrieveArtPiece.artist?.id !== artistId) {
    throw new Error("You do not have permission");
  }

  return {
    name: retrieveArtPiece.name,
    description: retrieveArtPiece.description,
    id: retrieveArtPiece.id,
  };
};

export default artPiece;
