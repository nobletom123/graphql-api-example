import moment from "moment";
import prisma from "../../../prisma";
import { ResolverType } from "../../../types/resolver";
import { checkAllExist } from "../../../utils/check-all-exist";

const updateArtist: ResolverType<
  {
    id: string;
    firstName: string;
    lastName: string;
  },
  {
    data: {
      id: string;
      name: string;
      startDate: string;
      endDate: string;
      collection: { connect: string[]; disconnect: string[] };
    };
  }
> = async (
  parent,
  {
    data: {
      id,
      name,
      startDate,
      endDate,
      collection: { connect, disconnect } = { connect: [], disconnect: [] },
    },
  },
  context
) => {
  const retrievedExhibition = await prisma.exhibition.findUnique({
    where: { id },
    include: {
      collection: {},
    },
  });

  if (!retrievedExhibition) {
    throw new Error("Retrieved exhibition not found");
  }

  const updateData: {
    name?: string;
    startDate?: string;
    endDate?: string;
    connection?: { connect?: string[]; disconnect?: string[] };
  } = {};

  if (name) {
    updateData.name = name;
  }

  if (connect.length > 0 || disconnect.length > 0) {
    updateData.connection = {};

    if (connect.length > 0) {
      const retrievedArtPieces = await prisma.artPiece.findMany({
        where: { id: { in: connect } },
      });

      if (
        checkAllExist(connect, (id) =>
          retrievedArtPieces.some(
            ({ id: retrievedExhibitionId }) => id === retrievedExhibitionId
          )
        )
      ) {
        updateData.connection.connect = connect;
      } else {
        throw new Error("Not all connections present");
      }
    }

    if (disconnect.length > 0) {
      if (
        checkAllExist(disconnect, (id) =>
          retrievedExhibition.collection.some(
            ({ id: retrievedExhibitionId }) => id === retrievedExhibitionId
          )
        )
      ) {
        updateData.connection.disconnect = disconnect;
      } else {
        throw new Error("Not all connections present");
      }
    }
  }

  if (startDate || endDate) {
    let currentStartDate;
    let currentEndDate;

    if (endDate) {
      if (moment(endDate).isValid()) {
        currentEndDate = endDate;
      } else {
        throw new Error("End date incorrect");
      }
    } else {
      currentEndDate = retrievedExhibition.endDate;
    }

    if (startDate) {
      if (moment(startDate).isValid()) {
        currentStartDate = startDate;
      } else {
        throw new Error("End date incorrect");
      }
    } else {
      currentStartDate = retrievedExhibition.startDate;
    }

    if (moment(currentStartDate).isBefore(currentEndDate)) {
      updateData.startDate = currentStartDate;
      updateData.endDate = currentEndDate;
    } else {
      throw new Error("Dates not in correct order");
    }
  }

  const updateArtist = await prisma.customer.update({
    data: updateData,
    where: { id },
  });

  return updateArtist;
};

export default updateArtist;
