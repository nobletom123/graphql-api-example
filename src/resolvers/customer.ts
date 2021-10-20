import prisma from "../prisma";
import { ResolverType } from "../types/resolver";
import { AuthTokenTypeEnum, AuthUtils } from "../utils/auth-utils";

const customer: {
  email: ResolverType<string | null, {}, { id: string }>;
  artPieces: ResolverType<{ id: string; status: string }[], {}, { id: string }>;
} = {
  async email({ id }, data, context, info) {
    const {
      customer: { id: customerId },
    } = AuthUtils.checkAuthRank(context, AuthTokenTypeEnum.Customer);

    const customer = await prisma.customer.findUnique({ where: { id } });

    if (customerId === id) {
      return customer.email;
    }

    return null;
  },
  async artPieces({ id }, data, context, info) {
    return await prisma.customer.findUnique({ where: { id } }).artPieces();
  },
};

export default customer;
