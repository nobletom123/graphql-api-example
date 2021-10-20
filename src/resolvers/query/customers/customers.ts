import prisma from "../../../prisma";
import { ResolverType } from "../../../types/resolver";

const artPiece: ResolverType<
  {
    id: string;
    firstName: string;
    lastName: string;
  }[],
  {
    data: {
      id: string;
    };
  }
> = async (parent, { data: { id } }, context) => {
  const customers = await prisma.customer.findMany();

  return customers;
};

export default artPiece;
