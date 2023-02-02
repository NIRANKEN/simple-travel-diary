import { render, screen } from "@testing-library/react";
import { Note } from "../Note";

describe("SearchPlace", () => {
  describe("should render", () => {
    it("isInitialRender", () => {
      render(<Note travelName={"テスト旅行"} placeName={"テスト植物園"} />);

      expect(screen.getByText("旅の名前: テスト旅行")).toBeInTheDocument();
      expect(screen.getByText("場所: テスト植物園")).toBeInTheDocument();
      expect(screen.getByText("その旅行で行った順番")).toBeInTheDocument();
      expect(screen.getByText("日記内容")).toBeInTheDocument();
      expect(screen.getByText("添付写真")).toBeInTheDocument();
    });
    it("no travelName", () => {
      render(<Note travelName={""} placeName={"テスト植物園"} />);
      expect(screen.getByText("日記がないよ")).toBeInTheDocument();
    });
    it("no placeName", () => {
      render(<Note travelName={"テスト旅行"} placeName={""} />);
      expect(screen.getByText("日記がないよ")).toBeInTheDocument();
    });
    it("no both travelName and placeName", () => {
      render(<Note travelName={""} placeName={""} />);
      expect(screen.getByText("日記がないよ")).toBeInTheDocument();
    });
  });
});
