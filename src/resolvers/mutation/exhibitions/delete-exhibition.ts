import moment from "moment";
import prisma from "../../../prisma";
import { ResolverType } from "../../../types/resolver";

const deleteArtist: ResolverType<
  boolean,
  {
    data: {
      id: string;
    };
  }
> = async (parent, { data: { id } }, context) => {
  await prisma.exhibition.delete({ where: { id } });

  return true;
};

export default deleteArtist;
