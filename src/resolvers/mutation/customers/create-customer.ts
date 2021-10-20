import prisma from "../../../prisma";
import { ResolverType } from "../../../types/resolver";
import { Password } from "../../../utils/password";

const createArtist: ResolverType<
  {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  },
  {
    data: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    };
  }
> = async (
  parent,
  { data: { password, email, firstName, lastName } },
  context
) => {
  const hashedPassword = await Password.toHash(password);

  const findCurrentArtistWithEmail = await prisma.customer.findUnique({
    where: { email },
  });

  if (findCurrentArtistWithEmail) {
    throw new Error("Artist with that email already exists");
  }

  const createdArtist = await prisma.customer.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      emailVerified: false,
    },
  });

  return createdArtist;
};

export default createArtist;
