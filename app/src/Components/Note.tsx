import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";

type NoteProps = {
  travelName: string;
  placeName: string;
  noteText: string;
  handleWriteNote: (writingNoteText: string) => void;
};

export const Note: React.FC<NoteProps> = ({
  travelName,
  placeName,
  noteText,
  handleWriteNote,
}) => {
  // travelName, placeNameという型を作っておく, チェック関数の外だし
  const [writingNoteText, setWritingNoteText] = useState<string>("");
  // const [noteText, setNoteText] = useState<string>("");
  const [isWriting, setWriting] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
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
              {isWriting ? (
                <>
                  <TextField
                    id="travel-note"
                    label="ここに日記を入力してね"
                    helperText="Ctrl + Enterで入力を完了します。"
                    sx={{ width: "100%" }}
                    multiline
                    value={writingNoteText}
                    onChange={(event) => setWritingNoteText(event.target.value)}
                    onKeyDown={(e) => {
                      if (
                        e.key === "Enter" &&
                        writingNoteText &&
                        (e.ctrlKey || e.metaKey)
                      ) {
                        handleWriteNote(writingNoteText);
                        setWriting(false);
                      }
                    }}
                    onBlur={(_e) => {
                      if (noteText === writingNoteText) {
                        setWriting(false);
                      } else {
                        // TODO: 保存されてないけど、入力やめちゃうの？のダイアログ出して
                        // 入力を続ける or 破棄するの選択肢をだす。
                        setOpen(true);
                      }
                    }}
                  />
                  <Dialog
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby="alert-dialog-title"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"日記の下書きを破棄しますか？"}
                    </DialogTitle>
                    <DialogActions>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                          setWritingNoteText(noteText);
                          setWriting(false);
                          setOpen(false);
                        }}
                      >
                        破棄する
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setOpen(false);
                        }}
                      >
                        入力に戻る
                      </Button>
                    </DialogActions>
                  </Dialog>
                </>
              ) : (
                <Card>
                  <Typography onClick={(_e) => setWriting(true)} p={2}>
                    <Box whiteSpace="pre-line">{noteText}</Box>
                  </Typography>
                </Card>
              )}
            </Grid>
            <Grid item xs={6}>
              <Box></Box>
              <Typography>【ここに写真を載せられるよ】</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  ) : (
    <Typography>日記がないよ(エラー)</Typography>
  );
};
