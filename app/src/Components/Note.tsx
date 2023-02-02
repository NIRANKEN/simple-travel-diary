import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

type NoteProps = {
  travelName: string;
  placeName: string;
};

export const Note: React.FC<NoteProps> = ({ travelName, placeName }) => {
  // travelName, placeNameという型を作っておく, チェック関数の外だし
  const checkNames = (travelName: string, placeName: string): boolean =>
    !!travelName && !!placeName;

  return checkNames(travelName, placeName) ? (
    <Card>
      <Typography>{`旅の名前: ${travelName}`}</Typography>
      <Typography>{`場所: ${placeName}`}</Typography>
      <Typography>その旅行で行った順番</Typography>
      <Typography>日記内容</Typography>
      <Typography>添付写真</Typography>
    </Card>
  ) : (
    <Typography>日記がないよ</Typography>
  );
};
