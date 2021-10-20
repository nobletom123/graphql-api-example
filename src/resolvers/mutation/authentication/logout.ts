import prisma from "../../../prisma";
import { AuthUtils } from "../../../utils/auth-utils";
import { Password } from "../../../utils/password";

const logout = async (parent, { email, password }, { setCookies }, info) => {
  setCookies.push({
    name: "jwt",
    value: "",
    options: {
      expires: new Date("2021-01-01T00:00:00"),
    },
  });
  return { success: true };
};

export default logout;
