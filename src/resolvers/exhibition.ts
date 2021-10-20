import prisma from "../prisma";
import { ResolverType } from "../types/resolver";

const exhibition: {
  collection: ResolverType<
    { id: string; name: string; description: string }[],
    {},
    { id: string }
  >;
  orders: ResolverType<{ id: string; status: string }[], {}, { id: string }>;
} = {
  async collection({ id }) {
    return await prisma.exhibition.findUnique({ where: { id } }).collection();
  },
  async orders({ id }) {
    return await prisma.exhibition.findUnique({ where: { id } }).orders();
  },
};

export default exhibition;
