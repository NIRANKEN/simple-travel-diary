import { render, screen, waitFor } from "@testing-library/react";
import { Diary } from "../Diary";
import { User } from "../../Types/User";

describe("Diary", () => {
  const testUser: User = {
    givenName: "てすと君",
    pictureUrl: "dummyPictureUrl",
    email: "test@test.com",
    emailVerified: false,
  };

  beforeEach(() => {
    jest.resetModules();
  });

  describe("should render", () => {
    process.env.REACT_APP_API_ENDPOINT = "http://localhost:3000";
    it("render fetched data", async () => {
      const travelDiaryMock = () =>
        new Promise((resolve) => {
          resolve({
            ok: true,
            status: 200,
            json: async () => [
              {
                id: "dummyTravelId1",
                name: "2023/01沖縄旅行",
                ord: 1,
                diaries: [
                  {
                    id: "dummyDiaryId1",
                    ord: 1,
                    place: {
                      id: "dummyPlaceId1",
                      name: "沖縄美ら海水族館",
                      address: "〒905-0206 沖縄県国頭郡本部町石川４２４",
                    },
                    note: "さかなー\nちんあなごー\n",
                  },
                  {
                    id: "dummyDiaryId2",
                    ord: 2,
                    place: {
                      id: "dummyPlaceId2",
                      name: "那覇空港",
                      address: "〒901-0142 沖縄県那覇市鏡水１５０",
                    },
                    note: "くうこう！",
                  },
                ],
              },
            ],
          });
        });
      global.fetch = jest.fn().mockImplementation(travelDiaryMock);
      render(<Diary user={testUser} />);
      // 初期の旅の名前
      await waitFor(() => {
        expect(screen.getByText("2023/01沖縄旅行")).toBeInTheDocument();
      });
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:3000/v1/dummy-user/travels",
        { credentials: "include", mode: "cors" }
      );

      // SelectBoxのテストを書く
      // // ボタンクリック
      // // await selectEvent.select(screen.getByLabelText("旅の名前"), "ダミー旅行");
      // // const selectComponent = within(screen.getByLabelText("旅の名前"));
      // fireEvent.click(screen.getByTestId("travel-select-label"));
      // await waitFor(() => {
      //   expect(screen.getByText("ダミー旅行")).toBeInTheDocument();
      // });
      // await fireEvent.click(screen.getByTestId("menu-item-2"));

      // // 旅の名前を選択する
      // expect(screen.queryByText("2023/01沖縄旅行")).not.toBeInTheDocument();
      // expect(screen.getByText("ダミー旅行")).toBeInTheDocument();
    });
    it("render error data", async () => {
      const errorFetchedMockData = () =>
        new Promise((resolve) => {
          resolve({
            ok: false,
            status: 403,
            statusText: "user: test-user is not found.",
          });
        });
      global.fetch = jest.fn().mockImplementation(errorFetchedMockData);
      render(<Diary user={testUser} />);
      // 初期の旅の名前
      await waitFor(() => {
        expect(screen.getByText("えらー")).toBeInTheDocument();
      });
      expect(
        screen.getByText("ﾋﾟｴﾝ! 旅データの取得に失敗したよ！")
      ).toBeInTheDocument();
      expect(screen.queryByText("2023/01沖縄旅行")).not.toBeInTheDocument();
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:3000/v1/dummy-user/travels",
        { credentials: "include", mode: "cors" }
      );
    });
  });
});
