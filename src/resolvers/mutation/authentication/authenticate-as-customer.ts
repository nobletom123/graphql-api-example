import prisma from "../../../prisma";
import { AuthUtils, AuthTokenTypeEnum } from "../../../utils/auth-utils";
import { Password } from "../../../utils/password";

const getAuthToken = async (
  parent,
  { email, password },
  { setCookies },
  info
) => {
  let getUser;
  try {
    getUser = await prisma.customer.findUnique({ where: { email } });
  } catch (e) {
    console.log("e", e);
    throw new Error("Customer not found!");
  }

  const passwordsMatch = await Password.compare(getUser.password, password);

  if (!passwordsMatch) {
    throw new Error("Passwords dont match");
  }

  const token = await AuthUtils.createAuthToken({
    id: getUser.id,
    email,
    type: AuthTokenTypeEnum.Customer,
  });

  setCookies.push({
    name: "jwt",
    value: `Bearer ${token}`,
    options: {
      sameSite: "None",
      secure: true,
    },
  });

  return { token };
};

export default getAuthToken;
