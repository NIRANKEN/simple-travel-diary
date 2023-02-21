import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Auth } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";
import { useEffect } from "react";
import React from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { CircularProgress } from "../Components/CircularProgress";
import { User } from "../Types/User";

export const Login: React.FC<{}> = () => {
  const [user, setUser] = React.useState<User>();
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
        setUser({
          givenName: currentUser.attributes.given_name,
          pictureUrl: currentUser.attributes.picture,
          email: currentUser.attributes.email,
          emailVerified: currentUser.attributes.email_verified,
        });
      }
      setLoading(false);
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
          <>
            <Typography>よみこみちゅう</Typography>
            <CircularProgress suffix="login" />
          </>
        ) : user ? (
          <>
            <Avatar
              src={user.pictureUrl}
              sx={{
                width: 100,
                height: 100,
                flexGrow: 1,
              }}
              alt={user.givenName}
            />
            <Button onClick={signOut} variant="outlined" color="inherit">
              サインアウト
            </Button>
          </>
        ) : (
          <>
            <Button onClick={signIn} variant="contained" color="primary">
              サインイン
            </Button>
          </>
        )}
      </Grid>
    </Grid>
  );
};
