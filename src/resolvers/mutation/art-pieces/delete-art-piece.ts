import prisma from "../../../prisma";
import { ResolverType } from "../../../types/resolver";

const deleteArtPiece: ResolverType<boolean, { data: { id } }> = async (
  parent,
  { data: { id } },
  context
) => {
  await prisma.artPiece.delete({ where: { id } });

  return true;
};

export default deleteArtPiece;
