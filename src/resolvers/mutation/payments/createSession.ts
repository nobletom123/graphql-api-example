import { stripe } from "../../../stripe";
import Stripe from "stripe";
import prisma from "../../../prisma";

const createSession = async (
  parent,
  { email, paymentType, interval, amount },
  { id },
  info
) => {
  if (paymentType === "recurring" && !interval) {
    throw new Error(
      "If making a recurring donation, payment type must be supplied"
    );
  }

  let customer;
  if (!id) {
    const user = await prisma.user.findUnique({ where: { id } });

    customer = await stripe.customers.retrieve(user.stripeCustomerId);
  }
  let unit_amount;

  if (amount.includes(".")) {
    unit_amount = Number.parseInt(amount.replace(".", ""));
  } else {
    unit_amount = Number.parseInt(`${amount}00`);
  }

  if (Number.isNaN(unit_amount)) {
    throw new Error("Bad amount");
  }

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "GBP",
          unit_amount,
          product_data: {
            name: "test",
          },
        },
        description:
          paymentType === "payment" ? "One off donation" : "Recurring donation",
      },
    ],
    payment_method_types: ["card"],

    ...(customer && { customer: customer.id }),
    mode: paymentType,
    cancel_url: `${process.env.FRONT_END_URL}/donate?outcome=cancelled`,
    success_url: `${process.env.FRONT_END_URL}/donate?outcome=success`,
  });
  console.log("session", session);
  return { url: session.url };
};

export default createSession;
