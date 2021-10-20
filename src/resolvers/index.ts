import Mutation from "./mutation";
import Query from "./query";
import ArtPiece from "./art-piece";
import Artist from "./artist";
import Exhibition from "./exhibition";
import Order from "./order";
import Customer from "./customer";

const resolvers = {
  Mutation,
  Query,
  // Type Resolvers
  ArtPiece,
  Artist,
  Exhibition,
  Order,
  Customer,
};

export default resolvers;
