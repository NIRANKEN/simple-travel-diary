import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Map, Place, Note } from "../Components";
import { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { User } from "../Types/User";
import { Travel, TravelDiary } from "../Types/Travel";
import { CircularProgress } from "../Components/CircularProgress";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import uuid from "react-uuid";
import { fetchFromApi } from "../Helper/fetchHelper";

type DiaryProps = {
  user: User | undefined;
};

export const Diary: React.FC<DiaryProps> = () => {
  const [travels, setTravels] = useState<Travel[]>([]);
  const [selectedTravel, setSelectedTravel] = useState<Travel | undefined>();
  const [selectedDiary, setSelectedDiary] = useState<TravelDiary | undefined>();
  const [fetchError, setFetchError] = useState<Error>();

  const handleChangeTravel = (event: SelectChangeEvent<string>) => {
    travels.forEach((travel) => {
      if (travel.id === event.target.value) {
        setSelectedTravel(travel);
        return;
      }
    });
  };

  // TODO: refactor
  const handleSearchPlace = (searchPlaceName: string) => {
    if (selectedTravel && selectedTravel.diaries) {
      selectedTravel.diaries.forEach((diary) => {
        if (diary.place.name === searchPlaceName) {
          // set existing diary
          setSelectedDiary(diary);
          return;
        }
      });
    }
    setSelectedDiary({
      id: uuid(),
      ord:
        selectedTravel && selectedTravel.diaries
          ? selectedTravel.diaries.length + 1
          : 1,
      place: {
        name: searchPlaceName,
        address: "TODO: 住所取得ロジックを実装する",
      },
      note: "",
    });
  };

  const handleWriteNote = (writingNoteText: string) => {
    if (selectedTravel && selectedDiary) {
      setSelectedDiary({
        ...selectedDiary,
        ...{
          note: writingNoteText,
        },
      });
    }
  };

  // TODO: refactor
  useEffect(() => {
    // TODO: url・型・成功時/失敗時処理だけを可変にするような共通化の実施
    fetchFromApi("dummy-user/travels")
      .then((res) => {
        if (!res.ok) {
          console.log(res.statusText);
          console.log(res.status);
          throw Error(res.statusText);
        }
        return res.json();
      })
      .then((result) => {
        console.log(result);
        const fetchedTravels = result as Travel[];
        setTravels(fetchedTravels);
        if (fetchedTravels.length === 0) {
          setSelectedTravel({
            id: uuid(),
            name: "新しい旅行",
            ord: 1,
            diaries: [],
          });
        } else {
          setSelectedTravel(fetchedTravels[0]);
        }
      })
      .catch((error: Error) => {
        setFetchError(error);
        console.log(error);
      });
  }, []);

  return (
    <>
      {fetchError ? (
        <Alert severity="error">
          <AlertTitle>えらー</AlertTitle>
          ﾋﾟｴﾝ! 旅データの取得に失敗したよ！
        </Alert>
      ) : (
        <></>
      )}
      {travels && selectedTravel ? (
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
                value={selectedTravel.id}
                label="旅の名前"
                onChange={handleChangeTravel}
              >
                {travels.map((travel) => (
                  <MenuItem value={travel.ord}>{travel.name}</MenuItem>
                ))}
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
                  {selectedDiary ? (
                    <Map placeName={selectedDiary.place.name} />
                  ) : (
                    <></>
                  )}
                </Grid>
                <Grid item xs={4}>
                  <Place handleSearchPlace={handleSearchPlace} />
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item>
            {selectedDiary ? (
              <Note
                travelName={selectedTravel.name}
                placeName={selectedDiary.place.name}
                noteText={selectedDiary.note}
                handleWriteNote={handleWriteNote}
              />
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};
