import createBlogPost from "./createBlogPost";
import createLibraryEntry from "./createLibraryEntry";
import createUser from "./createUser";
import deleteBlogPost from "./deleteBlogPost";
import deleteLibraryEntry from "./deleteLibraryEntry";
import deleteUser from "./deleteUser";
import getAuthToken from "./authentication/authenticate-as-customer";
import updateBlogPost from "./updateBlogPost";
import updateLibraryEntry from "./updateLibraryEntry";
import updateUser from "./updateUser";
import createSession from "./payments/createSession";
import logout from "./authentication/logout";

const Mutation = {
  createBlogPost,
  createLibraryEntry,
  createUser,
  deleteBlogPost,
  deleteLibraryEntry,
  deleteUser,
  getAuthToken,
  updateBlogPost,
  updateLibraryEntry,
  updateUser,
  createSession,
  logout,
};

export default Mutation;
