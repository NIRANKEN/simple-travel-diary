import { List, ListItemText } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import PlaceIcon from "@mui/icons-material/Place";
import { SearchPlace } from "./SearchPlace";

type PlaceProps = {
  handleSearchPlace: (searchPlaceName: string) => void;
};

export const Place: React.FC<PlaceProps> = ({ handleSearchPlace }) => {
  // もし選んでいたら選択状態にする
  return (
    <Grid container direction="column" spacing={4}>
      <Grid item>
        <SearchPlace onChangeSearchPlace={handleSearchPlace} />
      </Grid>
      <Grid item>
        <Card sx={{ height: "100%", padding: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h4">思い出の場所</Typography>
          </Box>
          <List>
            <PlaceItem
              title="那覇空港"
              handleClickPlaceListItem={handleSearchPlace}
            />
            <PlaceItem
              title="古宇利大橋"
              handleClickPlaceListItem={handleSearchPlace}
            />
            <PlaceItem
              title="今帰仁城跡"
              handleClickPlaceListItem={handleSearchPlace}
            />
            <PlaceItem
              title="美ら海水族館"
              handleClickPlaceListItem={handleSearchPlace}
            />
          </List>
        </Card>
      </Grid>
    </Grid>
  );
};

type PlaceItemProps = {
  title: string;
  handleClickPlaceListItem: (placeName: string) => void;
};

const PlaceItem: React.FC<PlaceItemProps> = ({
  title,
  handleClickPlaceListItem,
}) => {
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={() => handleClickPlaceListItem(title)}>
        <ListItemIcon>
          <PlaceIcon />
        </ListItemIcon>
        <ListItemText primary={title} />
      </ListItemButton>
    </ListItem>
  );
};
