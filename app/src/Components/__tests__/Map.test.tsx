import { render, screen } from "@testing-library/react";
import { Map } from "../Map";

describe("SearchPlace", () => {
  describe("should render", () => {
    it("okinawa-churaumi-aquarium", () => {
      render(<Map placeName="沖縄美ら海水族館" />);
      expect(screen.getByTitle("GoogleMap embed")).toBeInTheDocument();
    });
  });
});
