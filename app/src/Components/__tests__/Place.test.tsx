import { render, screen, fireEvent } from "@testing-library/react";
import { Place } from "../Place";

describe("SearchPlace", () => {
  const mockHandleSearchPlace = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockHandleSearchPlace.mockReturnValue(() => {});
  });

  describe("should render", () => {
    const checkSearchPlace = () => {
      expect(screen.getByText("場所を検索する")).toBeInTheDocument();
      expect(screen.getByTestId("search-icon")).toBeInTheDocument();
    };

    it("isInitialRender", () => {
      render(<Place handleSearchPlace={mockHandleSearchPlace} />);
      expect(screen.getByText("思い出の場所")).toBeInTheDocument();

      checkSearchPlace();

      // click PlaceItem
      const placeItemButton = screen.getByText("古宇利大橋");
      fireEvent.click(placeItemButton);
      expect(mockHandleSearchPlace).toBeCalledWith("古宇利大橋");
    });
  });
});
