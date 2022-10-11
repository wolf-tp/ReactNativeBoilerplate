export type AuthorizedParams = {
  //Authorized
  Home: undefined;
};
export type UnAuthorParams = {
  //UnAuthorize
  Intro: undefined;
  Home: undefined;
};

export type AppScreensParams = UnAuthorParams & AuthorizedParams;
