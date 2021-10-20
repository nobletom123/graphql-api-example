export const titleURLCreator = (title) => {
  return title.toLowerCase().trim().split(" ").join("_");
};
