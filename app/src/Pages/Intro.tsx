import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export const Intro: React.FC<{}> = () => {
  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        p={4}
      >
        <Grid item>
          <Typography>
            このWebアプリは、旅の日記を書いたり、みんなにシェアしたりできるよ
          </Typography>
          <Typography>まだ開発中だよ。</Typography>
        </Grid>
        <Grid item>
          <Typography>ここに説明１が入るよ</Typography>
        </Grid>
        <Grid item>
          <Typography>ここに説明２が入るよ</Typography>
        </Grid>
      </Grid>
    </>
  );
};
