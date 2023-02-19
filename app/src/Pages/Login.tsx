import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Auth } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";
import { useEffect } from "react";
import React from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
// import { GoogleLoginButton } from "../Components";
// import useScript from "../Hooks/useScript";
// import { GoogleLogin } from "@react-oauth/google";

export const Login: React.FC<{}> = () => {
  // useScript("https://accounts.google.com/gsi/client");
  const [user, setUser] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  const signIn = async () =>
    await Auth.federatedSignIn({
      provider: CognitoHostedUIIdentityProvider.Google,
    });
  const signOut = async () => await Auth.signOut();

  useEffect(() => {
    const getCurrentUser = async () => {
      const currentUser = await Auth.currentUserInfo();
      if (currentUser) {
        setUser(currentUser);
      }
      setLoading(true);
    };
    getCurrentUser();
  }, []);

  return (
    <Grid
      container
      spacing={4}
      direction="column"
      justifyContent="center"
      p={4}
    >
      <Grid item>
        <Typography variant="h3">ログインページだよ</Typography>
      </Grid>
      <Grid item>
        {loading ? (
          <Typography>よみこみちゅう</Typography>
        ) : user ? (
          <>
            <Button onClick={signIn}>サインイン</Button>
            <Avatar
              src={user.attributes.picture}
              sx={{ width: 100, height: 100 }}
              alt={user.attributes.given_name}
            />
            <Typography>Name: ${user.attributes.given_name}</Typography>
            <Typography>Email: ${user.attributes.email}</Typography>
            <Button onClick={signOut}>サインアウト</Button>
          </>
        ) : (
          <>
            <Button onClick={signIn}>サインイン</Button>
          </>
        )}
        <Typography>なかみ</Typography>
        {/* <GoogleLoginButton /> */}
        {/* <GoogleLogin
          onSuccess={(res) => {
            console.log(res);
          }}
          onError={() => {
            console.error("Login Failed");
          }}
          useOneTap
        /> */}
      </Grid>
    </Grid>
  );
};
