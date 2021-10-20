import prisma from "../../../prisma";
import { ResolverType } from "../../../types/resolver";
import { Password } from "../../../utils/password";

const createArtist: ResolverType<
  boolean,
  {
    data: {
      id: string;
    };
  }
> = async (parent, { data: { id } }, context) => {
  await prisma.customer.delete({ where: { id } });

  return true;
};

export default createArtist;
