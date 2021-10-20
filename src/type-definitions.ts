import { gql } from "apollo-server-core";

export const typeDefs = gql`
  type Query {
    artPieces: [ArtPiece]
    artPiece: ArtPiece
    exhibition: Exhibition
    exhibitions: [Exhibition]
    artist: Artist
    artists: [Artist]
    currentArtist: Artist
    customer: Customer
    customers: [Customer]
    currentCustomer: Customer
    order: Order
    orders: [Order]
  }

  type Mutation {
    authenticateAsCustomer(email: String, password: String): Customer
    authenticateAsArtist(email: String, password: String): Artist

    createLibraryEntry(data: CreateLibraryEntryInput): LibraryEntry
    updateLibraryEntry(data: UpdateLibraryEntryInput): LibraryEntry
    deleteLibraryEntry(data: DeleteLibraryEntryInput): Boolean

    createArtist(data: ArtistCreateInput): Artist
    updateArtist(data: ArtistUpdateInput): Artist
    deleteArtist(data: ArtistDeleteInput): Boolean

    createCustomer(data: CustomerCreateInput): Customer
    updateCustomer(data: CustomerUpdateInput): Customer
    deleteCustomer(data: CustomerDeleteInput): Boolean

    createArtPiece(data: ArtPieceCreateInput): ArtPiece
    updateArtPiece(data: ArtPieceUpdateInput): ArtPiece
    deleteArtPiece(data: ArtPieceDeleteInput): Boolean

    createOrder(data: OrderCreateInput): Order
    updateOrder(data: OrderUpdateInput): Order
    deleteOrder(data: OrderDeleteInput): Boolean

    createExhibition(data: ExhibitionCreateInput): Exhibition
    updateExhibition(data: ExhibitionUpdateInput): Exhibition
    deleteExhibition(data: ExhibitionDeleteInput): Boolean
  }

  scalar ID

  input EdgeCRUD {
    connect: [ID]
    disconnect: [ID]
  }

  type Artist {
    id: ID
    firstName: String
    lastName: String
    email: String
  }

  input ArtistCreateInput {
    firstName: String
    lastName: String
    email: String
    password: String
  }

  input ArtistUpdateInput {
    id: ID!
    firstName: String
    lastName: String
    email: String
    currentPassword: String
    newPassword: String
  }

  input ArtistDeleteInput {
    id: ID
  }

  type Customer {
    id: ID
    firstName: String
    lastName: String
    email: String
  }

  input CustomerCreateInput {
    firstName: String
    lastName: String
    email: String
    password: String
  }

  input CustomerUpdateInput {
    id: ID!
    firstName: String
    lastName: String
    email: String
    currentPassword: String
    newPassword: String
  }

  input CustomerDeleteInput {
    id: ID
  }

  enum ArtPieceTypeEnum {
    PAINTING
    SCULPTURE
    VIDEO
    AUDIO
  }

  type ArtPiece {
    id: ID
    name: String
    description: String
    available: Boolean
    type: ArtPieceTypeEnum
    artist: Artist
    soldTo: Customer
  }

  input ArtPieceCreateInput {
    name: String!
    description: String
    type: ArtPieceTypeEnum!
  }

  input ArtPieceUpdateInput {
    id: ID!
    name: String
    description: String
    available: Boolean
    type: ArtPieceTypeEnum
  }

  input ArtPieceDeleteInput {
    id: ID
  }

  type Order {
    id: ID
    customer: Customer
    artPiece: ArtPiece
    status: String
  }

  input OrderCreateInput {
    artPieceId: ID!
  }

  input OrderUpdateInput {
    id: ID!
    status: String!
  }

  input OrderDeleteInput {
    id: ID
  }

  type Exhibition {
    id: ID!
    name: String
    startDate: String
    endDate: String
    collection: [ArtPiece]
  }

  input ExhibitionCreateInput {
    name: String!
    startDate: String!
    endDate: String!
    collection: [ID]
  }

  input ExhibitionUpdateInput {
    id: ID!
    name: String
    startDate: String
    endDate: String
    collection: EdgeCRUD
  }

  input ExhibitionDeleteInput {
    id: String
  }
`;
