import prisma from "../prisma";
import { ResolverType } from "../types/resolver";

const artPiece: {
  artist: ResolverType<
    { id: string; firstName: string; lastName: string },
    {},
    { id: string }
  >;
  exhibition: ResolverType<
    {
      id: string;
      description: string;
      startDate: string;
      endDate: string;
    },
    {},
    { id: string }
  >;
  order: ResolverType<
    {
      id: string;
      status: string;
    },
    {},
    { id: string }
  >;
} = {
  async artist({ id }) {
    return await prisma.artPiece.findUnique({ where: { id } }).artist();
  },
  async exhibition({ id }) {
    return await prisma.artPiece.findUnique({ where: { id } }).exhibition();
  },
  async order({ id }) {
    return await prisma.artPiece.findUnique({ where: { id } }).order();
  },
};

export default artPiece;
