import { render, screen } from "@testing-library/react";
import { Diary } from "../Diary";

describe("SearchPlace", () => {
  describe("should render", () => {
    it("isInitialRender", async () => {
      render(<Diary />);
      // 初期の旅の名前
      expect(screen.getByText("2023/01沖縄旅行")).toBeInTheDocument();
      expect(screen.queryByText("ダミー旅行")).not.toBeInTheDocument();

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
  });
});
