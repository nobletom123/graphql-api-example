import prisma from "../../../prisma";
import { ResolverType } from "../../../types/resolver";
import { Password } from "../../../utils/password";

const updateArtist: ResolverType<
  {
    id: string;
    firstName: string;
    lastName: string;
  },
  {
    data: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    };
  }
> = async (parent, { data: { firstName, lastName, id } }, context) => {
  const updateData = {
    ...(firstName && { firstName }),
    ...(lastName && { lastName }),
  };

  const updateArtist = await prisma.customer.update({
    data: updateData,
    where: { id },
  });

  return updateArtist;
};

export default updateArtist;
