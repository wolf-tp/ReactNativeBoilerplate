export type AuthorizedParams = {
  //Authorized
  Home: undefined;
};
export type UnAuthorParams = {
  //UnAuthorize
  Login: { pictureID?: string };
  Intro: undefined;
  Home: undefined;
};

export type AppScreensParams = UnAuthorParams & AuthorizedParams;
