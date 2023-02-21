import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Map, Place, Note } from "../Components";
import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { User } from "../Types/User";

type DiaryProps = {
  user: User | undefined;
};

export const Diary: React.FC<DiaryProps> = () => {
  const [travelName, setTravelName] = useState("2023/01沖縄旅行");
  const [placeName, setPlaceName] = useState("美ら海水族館"); // TODO: デフォルト値

  const handleChangeTravel = (event: SelectChangeEvent<string>) => {
    setTravelName(event.target.value);
  };

  const handleSearchPlace = (searchPlaceName: string) => {
    setPlaceName(searchPlaceName);
  };

  return (
    <Grid
      container
      spacing={4}
      direction="column"
      justifyContent="center"
      p={4}
    >
      <Grid item>
        <FormControl fullWidth>
          <InputLabel id="travel-select-label">旅の名前</InputLabel>
          <Select
            labelId="travel-select-label"
            data-testid="travel-select-label"
            id="travel-select"
            name="travel"
            value={travelName}
            label="旅の名前"
            onChange={handleChangeTravel}
          >
            <MenuItem value="2023/01沖縄旅行">2023/01沖縄旅行</MenuItem>
            <MenuItem value="ダミー旅行">ダミー旅行</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <Box
          sx={{
            height: 768,
          }}
        >
          <Grid container spacing={4} sx={{ height: "100%" }}>
            <Grid item xs={8}>
              <Map placeName={placeName} />
            </Grid>
            <Grid item xs={4}>
              <Place handleSearchPlace={handleSearchPlace} />
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item>
        <Note travelName={travelName} placeName={placeName} />
      </Grid>
    </Grid>
  );
};
