import prisma from "../../../prisma";
import { ResolverType } from "../../../types/resolver";

const order: ResolverType<
  {
    id: string;
  }[],
  {
    data: {
      id: string;
    };
  }
> = async (parent, { data: { id } }, context) => {
  const customers = await prisma.order.findMany();

  return customers;
};

export default order;
