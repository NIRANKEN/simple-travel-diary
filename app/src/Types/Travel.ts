export type Travel = {
  id: string;
  name: string;
  ord: number;
  diaries: TravelDiary[];
}

export type TravelDiary = {
  id: string;
  ord: number;
  place: TravelPlace;
  note: string;
}

type TravelPlace = {
  name: string;
  address: string;
}