import prisma from "../../../prisma";
import { ResolverType } from "../../../types/resolver";
import { AuthTokenTypeEnum, AuthUtils } from "../../../utils/auth-utils";

const order: ResolverType<
  {
    id: string;
  },
  {
    data: {
      id: string;
    };
  }
> = async (parent, { data: { id } }, context) => {
  const order = await prisma.order.findUnique({ where: { id } });

  return order;
};

export default order;
