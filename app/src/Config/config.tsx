import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";

export const getUserPool = () => {
  const poolData = {
    UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID || "",
    ClientId: process.env.REACT_APP_COGNITO_USER_POOL_CLIENT_ID || "",
  };

  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  return userPool;
};
