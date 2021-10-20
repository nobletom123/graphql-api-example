import moment from "moment";
import prisma from "../../../prisma";
import { ResolverType } from "../../../types/resolver";
import { checkAllExist } from "../../../utils/check-all-exist";

const updateOrder: ResolverType<
  {
    id: string;
    status: string;
  },
  {
    data: {
      id: string;
      status: string;
    };
  }
> = async (parent, { data: { id, status } }, context) => {
  const retrievedOrder = await prisma.order.findUnique({
    where: { id },
  });

  if (!retrievedOrder) {
    throw new Error("Retrieved order not found");
  }

  const updateData = { status };

  const updatedOrder = await prisma.order.update({
    data: updateData,
    where: { id },
  });

  return updatedOrder;
};

export default updateOrder;
