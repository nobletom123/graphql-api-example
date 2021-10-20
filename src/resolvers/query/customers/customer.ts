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
  const customer = await prisma.customer.findUnique({ where: { id } });

  return customer;
};

export default artPiece;
