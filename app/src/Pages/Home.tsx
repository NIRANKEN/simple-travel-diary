import React from "react";
import { Auth } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";
import { ButtonAppBar } from "../Components/ButtonAppBar";
import { User } from "../Types/User";
import { Diary } from "./Diary";
import Typography from "@mui/material/Typography";
import { CircularProgress } from "../Components/CircularProgress";
import { Intro } from "./Intro";

export const Home: React.FC<{}> = () => {
  const [title, setTitle] = React.useState<string>("Home");
  const [user, setUser] = React.useState<User>();
  const [loading, setLoading] = React.useState<boolean>(true);

  const signIn = async () =>
    await Auth.federatedSignIn({
      provider: CognitoHostedUIIdentityProvider.Google,
    });
  const signOut = async () => {
    await Auth.signOut();
    setTitle("Home");
  };

  React.useEffect(() => {
    const getCurrentUser = async () => {
      const currentUser = await Auth.currentUserInfo();
      if (currentUser) {
        setUser({
          givenName: currentUser.attributes.given_name,
          pictureUrl: currentUser.attributes.picture,
          email: currentUser.attributes.email,
          emailVerified: currentUser.attributes.email_verified,
        });
        setTitle(`${currentUser.attributes.given_name}さんの旅日記`);
      }
      setLoading(false);
    };
    getCurrentUser();
  }, []);

  return (
    <>
      <ButtonAppBar
        title={title}
        user={user}
        handleSignIn={signIn}
        handleSignOut={signOut}
      />
      {loading ? (
        <>
          <Typography>よみこみちゅう</Typography>
          <CircularProgress suffix="home" />
        </>
      ) : user ? (
        <>
          <Diary user={user} />
        </>
      ) : (
        <>
          <Intro />
        </>
      )}
    </>
  );
};
