import prisma from "../../../prisma";
import { ResolverType } from "../../../types/resolver";

const createArtPiece: ResolverType<
  { name: string; description: string },
  { data: { name: string; description: string } }
> = async (parent, { data: { name, description } }, context) => {
  const createData = { name, description };

  const createdArtPiece = await prisma.artPiece.create({ data: createData });

  return createdArtPiece;
};

export default createArtPiece;
