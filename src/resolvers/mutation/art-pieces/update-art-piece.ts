import prisma from "../../../prisma";
import { ResolverType } from "../../../types/resolver";

const updateArtPiece: ResolverType<
  { name: string; id: string; description: string },
  { data: { id: string; name: string; description: string } }
> = async (parent, { data: { name, description, id } }, context) => {
  const updateData = {
    ...(name && { name }),
    ...(description && { description }),
  };

  const updatedArtPiece = await prisma.artPiece.update({
    where: { id },
    data: updateData,
  });

  return updatedArtPiece;
};

export default updateArtPiece;
