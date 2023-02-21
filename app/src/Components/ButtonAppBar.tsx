import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { User } from "../Types/User";
import Avatar from "@mui/material/Avatar";

type ButtonAppBarProps = {
  title: string;
  user: User | undefined;
  handleSignIn: () => void;
  handleSignOut: () => void;
};

export const ButtonAppBar: React.FC<ButtonAppBarProps> = ({
  title,
  user,
  handleSignIn,
  handleSignOut,
}) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {user ? (
              <>
                <Avatar src={user.pictureUrl} alt={user.givenName} />
                <Button
                  onClick={handleSignOut}
                  variant="outlined"
                  color="inherit"
                >
                  ログアウト
                </Button>
              </>
            ) : (
              <Button
                onClick={handleSignIn}
                variant="contained"
                color="primary"
              >
                ログイン
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
