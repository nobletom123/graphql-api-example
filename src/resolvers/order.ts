import prisma from "../prisma";
import { ResolverType } from "../types/resolver";

const order: {
  artPiece: ResolverType<{ id: string; name: string }, {}, { id: string }>;
  customer: ResolverType<
    { id: string; firstName: string; lastName: string },
    {},
    { id: string }
  >;
  exhibition: ResolverType<{ id: string; name: string }, {}, { id: string }>;
} = {
  async artPiece({ id }) {
    return await prisma.order.findUnique({ where: { id } }).artPiece();
  },
  async customer({ id }) {
    return await prisma.order.findUnique({ where: { id } }).customer();
  },
  async exhibition({ id }) {
    return await prisma.order.findUnique({ where: { id } }).exhibition();
  },
};

export default order;
