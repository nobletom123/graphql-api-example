import moment from "moment";
import prisma from "../../../prisma";
import { ResolverType } from "../../../types/resolver";

const createExhibition: ResolverType<
  {
    name: string;
    startDate: string;
    endDate: string;
  },
  {
    data: {
      name: string;
      startDate: string;
      endDate: string;
      collection: string[];
    };
  }
> = async (
  parent,
  { data: { name, startDate, endDate, collection } },
  context
) => {
  const startDateValid = moment(startDate).isValid();
  const endDateValid = moment(endDate).isValid();

  if (!startDateValid || !endDateValid || moment(startDate).isAfter(endDate)) {
    throw new Error("Dates incorrectly formatted");
  }

  const artPieces = await prisma.artPiece.findMany({
    where: { id: { in: collection } },
  });

  const allCollectionItemsValid = collection.every((collectId) =>
    artPieces.some(({ id }) => id === collectId)
  );

  if (!allCollectionItemsValid) {
    throw new Error("Not all collection items accounted for");
  }

  const createdExhibition = await prisma.exhibition.create({
    data: {
      name,
      startDate,
      endDate,
      collection: {
        connect: collection.map((collectionId) => ({ id: collectionId })),
      },
    },
  });

  return createdExhibition;
};

export default createExhibition;
