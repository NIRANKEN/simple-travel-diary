import { Amplify } from "aws-amplify";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./Pages";

Amplify.configure({
  Auth: {
    region: "us-east1",
    userPoolId: process.env.REACT_APP_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_USER_POOL_CLIENT_ID,
    mandatorySignIn: false,
    oauth: {
      domain: process.env.REACT_APP_COGNITO_AUTH_DOMAIN,
      scope: ["email", "profile", "openid", "aws.cognito.signin.user.admin"],
      redirectSignIn: `${process.env.REACT_APP_WEB_ENDPOINT}/`,
      redirectSignOut: `${process.env.REACT_APP_WEB_ENDPOINT}/`,
      responseType: "code",
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
