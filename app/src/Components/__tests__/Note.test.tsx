import { render, screen } from "@testing-library/react";
import { Note } from "../Note";

describe("SearchPlace", () => {
  describe("should render", () => {
    it("isInitialRender", () => {
      render(<Note travelName={"テスト旅行"} placeName={"テスト植物園"} />);
      expect(
        screen.getByText("テスト旅行／テスト植物園 の日記")
      ).toBeInTheDocument();

      // TODO: Write test of TextField
    });
    it("no travelName", () => {
      render(<Note travelName={""} placeName={"テスト植物園"} />);
      expect(screen.getByText("日記がないよ(エラー)")).toBeInTheDocument();
    });
    it("no placeName", () => {
      render(<Note travelName={"テスト旅行"} placeName={""} />);
      expect(screen.getByText("日記がないよ(エラー)")).toBeInTheDocument();
    });
    it("no both travelName and placeName", () => {
      render(<Note travelName={""} placeName={""} />);
      expect(screen.getByText("日記がないよ(エラー)")).toBeInTheDocument();
    });
  });
});
