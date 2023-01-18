export const splitToken = (authToken: string): [string, string] => {
  const [bearer, token] = authToken.split(' ');

  return [bearer, token];
};
