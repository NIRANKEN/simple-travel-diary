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
      <AppBar position="static">
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
                  sx={{ marginLeft: 2 }}
                >
                  ログアウト
                </Button>
              </>
            ) : (
              <>
                {/* Googleのログインボタンに変更する */}
                <Button
                  onClick={handleSignIn}
                  variant="outlined"
                  color="inherit"
                >
                  ログイン
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
