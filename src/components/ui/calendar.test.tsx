import * as React from "react";
import { render, screen } from "@testing-library/react";
import { Calendar } from "./calendar";

// Mock DayPicker to avoid dependency issues and focus on Calendar's integration
vi.mock("react-day-picker", () => ({
  DayPicker: (props: any) => (
    <div
      data-testid="mock-day-picker"
      data-show-outside-days={props.showOutsideDays}
      className={props.className}
      {...props}
    />
  ),
}));

describe("Calendar", () => {
  it("renders without crashing", () => {
    render(<Calendar />);
    expect(screen.getByTestId("mock-day-picker")).toBeInTheDocument();
  });

  it("passes className prop", () => {
    render(<Calendar className="custom-class" />);
    const dayPicker = screen.getByTestId("mock-day-picker");
    expect(dayPicker).toHaveClass("custom-class");
  });

  it("forwards other props to DayPicker", () => {
    render(<Calendar id="calendar-id" data-foo="bar" />);
    const dayPicker = screen.getByTestId("mock-day-picker");
    expect(dayPicker).toHaveAttribute("id", "calendar-id");
    expect(dayPicker).toHaveAttribute("data-foo", "bar");
  });

  it("sets showOutsideDays to true by default", () => {
    render(<Calendar />);
    const dayPicker = screen.getByTestId("mock-day-picker");
    expect(dayPicker.getAttribute("data-show-outside-days")).toBe("true");
  });

  it("allows overriding showOutsideDays", () => {
    render(<Calendar showOutsideDays={false} />);
    const dayPicker = screen.getByTestId("mock-day-picker");
    expect(dayPicker.getAttribute("data-show-outside-days")).toBe("false");
  });
}); 