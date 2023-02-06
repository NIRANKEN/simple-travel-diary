import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";

type NoteProps = {
  travelName: string;
  placeName: string;
};

export const Note: React.FC<NoteProps> = ({ travelName, placeName }) => {
  // travelName, placeNameという型を作っておく, チェック関数の外だし
  const [noteText, setNoteText] = useState<string>("");
  const checkNames = (travelName: string, placeName: string): boolean =>
    !!travelName && !!placeName;

  return checkNames(travelName, placeName) ? (
    <Card>
      <Grid
        container
        spacing={2}
        direction="column"
        justifyContent="center"
        p={2}
      >
        <Grid item>
          <Typography>{`${travelName}／${placeName} の日記`}</Typography>
        </Grid>
        <Grid item>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              {/* ダブルクリックしたらフォーカスあたって入力欄になるようにしたい */}
              <TextField
                id="travel-note"
                label="ここに日記を入力してね"
                sx={{ width: "100%" }}
                multiline
                value={noteText}
                onChange={(event) => setNoteText(event.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography>添付写真</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  ) : (
    <Typography>日記がないよ(エラー)</Typography>
  );
};
