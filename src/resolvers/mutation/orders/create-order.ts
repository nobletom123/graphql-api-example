import prisma from "../../../prisma";
import { ResolverType } from "../../../types/resolver";

const createExhibition: ResolverType<
  {
    id: string;
  },
  {
    data: {
      artPiece: string;
    };
  }
> = async (
  parent,
  { data: { artPiece: id } },
  { customer: { id: customerId } }
) => {
  const artPiece = await prisma.artPiece.findUnique({
    where: { id },
  });

  if (!artPiece) {
    throw new Error("That art piece could not be found");
  }

  const createNewOrder = await prisma.order.create({
    data: {
      artPiece: {
        connect: {
          id,
        },
      },
      customer: {
        connect: {
          id: customerId,
        },
      },
    },
  });

  return createNewOrder;
};

export default createExhibition;
