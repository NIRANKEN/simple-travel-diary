// import { GoogleOAuthProvider } from "@react-oauth/google";
import { Amplify } from "aws-amplify";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Diary, Login } from "./Pages";

Amplify.configure({
  Auth: {
    region: "us-east1",
    userPoolId: process.env.REACT_APP_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_USER_POOL_CLIENT_ID,
    mandatorySignIn: false,
    oauth: {
      domain: process.env.REACT_APP_COGNITO_AUTH_DOMAIN,
      scope: ["email", "profile", "openid", "aws.cognito.signin.user.admin"],
      redirectSignIn: `${process.env.REACT_APP_WEB_ENDPOINT}/login`,
      redirectSignOut: `${process.env.REACT_APP_WEB_ENDPOINT}/login`,
      responseType: "token",
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Diary />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  // const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || "";
  return (
    // <GoogleOAuthProvider clientId={clientId}>
    <RouterProvider router={router} />
    // </GoogleOAuthProvider>
  );
}

export default App;
