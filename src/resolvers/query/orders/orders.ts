import prisma from "../../../prisma";
import { ResolverType } from "../../../types/resolver";

const orders: ResolverType<
  {
    id: string;
  }[],
  {
    data: {
      id: string;
    };
  }
> = async (parent, { data: { id } }, context) => {
  const orders = await prisma.order.findMany();

  return orders;
};

export default orders;
