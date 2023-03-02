import { Travel } from "../types/Travel";

export const mockTravels: Travel[] = [
  {
    id: "dummyTravelId1",
    name: "dummyTravelName1",
    ord: 1,
    diaries: [
      {
        id: "dummyDiaryId1",
        ord: 1,
        place: {
          id: "dummyPlaceId1",
          name: "dummyPlaceName1",
          address: "dummyAddress1"
        },
        note: "dummyWord123\ndummyWord456"
      }
    ]
  },
  {
    id: "dummyTravelId2",
    name: "2023/01沖縄旅行",
    ord: 2,
    diaries: [
      {
        id: "dummyDiaryId2",
        ord: 1,
        place: {
          id: "dummyPlaceId2",
          name: "沖縄美ら海水族館",
          address: "〒905-0206 沖縄県国頭郡本部町石川４２４"
        },
        note: "さかなー\nちんあなごー\n"
      },
      {
        id: "dummyDiaryId3",
        ord: 2,
        place: {
          id: "dummyPlaceId3",
          name: "那覇空港",
          address: "〒901-0142 沖縄県那覇市鏡水１５０"
        },
        note: "くうこう！"       
      }
    ]
  }
]
