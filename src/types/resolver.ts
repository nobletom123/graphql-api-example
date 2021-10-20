export type ResolverType<Response, Data, Parent = null> = (
  parent: Parent,
  data: Data,
  context: any,
  info: any
) => Promise<Response>;

export type ObjectResolver = {
  [key: string]: <Response, Data, Parent = null>(
    parent: Parent,
    data: Data,
    context: any,
    info: any
  ) => Promise<Response>;
};
