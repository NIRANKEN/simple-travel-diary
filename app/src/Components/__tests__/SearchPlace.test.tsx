import { render, screen, fireEvent } from "@testing-library/react";
import { SearchPlace } from "../SearchPlace";

describe("SearchPlace", () => {
  const mockHandleChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockHandleChange.mockReturnValue(() => {});
  });

  describe("should render", () => {
    it("isInitialRender", () => {
      // 初期状態での描画の確認
      render(<SearchPlace onChangeSearchPlace={mockHandleChange} />);
      expect(screen.getByText("場所を検索する")).toBeInTheDocument();
      expect(screen.getByTestId("search-icon")).toBeInTheDocument();

      const searchPlaceTextField: HTMLInputElement =
        screen.getByLabelText("場所を検索する");

      // Press Enter when empty text
      fireEvent.keyDown(searchPlaceTextField, {
        key: "Enter",
        code: "Enter",
        charCode: 13,
      });
      expect(searchPlaceTextField.value).toBe("");
      expect(mockHandleChange).toBeCalledTimes(0);

      // input in textField
      fireEvent.change(searchPlaceTextField, {
        target: { value: "あいうえお動物園" },
      });
      expect(searchPlaceTextField.value).toBe("あいうえお動物園");

      // Press Enter when not empty text
      fireEvent.keyDown(searchPlaceTextField, {
        key: "Enter",
        code: "Enter",
        charCode: 13,
      });
      expect(searchPlaceTextField.value).toBe("あいうえお動物園");
      expect(mockHandleChange).toBeCalledWith("あいうえお動物園");
    });
  });
});
