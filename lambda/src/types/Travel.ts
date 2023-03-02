export type Travel = {
  id: string;
  name: string;
  ord: number;
  diaries: TravelDiary[];
}

type TravelDiary = {
  id: string;
  ord: number;
  place: TravelPlace;
  note: string;
}

type TravelPlace = {
  id: string;
  name: string;
  address: string;
}