import * as React from "react";
import { render, screen } from "@testing-library/react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "./breadcrumb";

// Helper for ref testing
function getRef() {
  const ref = React.createRef<HTMLElement>();
  return ref;
}

describe("Breadcrumb", () => {
  it("renders nav with aria-label", () => {
    render(<Breadcrumb>Test</Breadcrumb>);
    const nav = screen.getByLabelText("breadcrumb");
    expect(nav).toBeInTheDocument();
    expect(nav.tagName).toBe("NAV");
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLElement>();
    render(<Breadcrumb ref={ref}>Test</Breadcrumb>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});

describe("BreadcrumbList", () => {
  it("renders ol with children", () => {
    render(
      <BreadcrumbList>
        <li>Item</li>
      </BreadcrumbList>
    );
    const ol = screen.getByRole("list");
    expect(ol.tagName).toBe("OL");
    expect(ol).toHaveTextContent("Item");
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLOListElement>();
    render(<BreadcrumbList ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLOListElement);
  });
});

describe("BreadcrumbItem", () => {
  it("renders li with children", () => {
    render(<BreadcrumbItem>Item</BreadcrumbItem>);
    const li = screen.getByText("Item");
    expect(li.tagName).toBe("LI");
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLLIElement>();
    render(<BreadcrumbItem ref={ref}>Item</BreadcrumbItem>);
    expect(ref.current).toBeInstanceOf(HTMLLIElement);
  });
});

describe("BreadcrumbLink", () => {
  it("renders anchor with children", () => {
    render(<BreadcrumbLink href="#">Link</BreadcrumbLink>);
    const link = screen.getByText("Link");
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "#");
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLAnchorElement>();
    render(<BreadcrumbLink ref={ref} href="#">Link</BreadcrumbLink>);
    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
  });
});

describe("BreadcrumbPage", () => {
  it("renders span with correct aria attributes", () => {
    render(<BreadcrumbPage>Page</BreadcrumbPage>);
    const span = screen.getByText("Page");
    expect(span.tagName).toBe("SPAN");
    expect(span).toHaveAttribute("role", "link");
    expect(span).toHaveAttribute("aria-disabled", "true");
    expect(span).toHaveAttribute("aria-current", "page");
  });

  it("forwards ref", () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<BreadcrumbPage ref={ref}>Page</BreadcrumbPage>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });
});

describe("BreadcrumbSeparator", () => {
  it("renders default separator (ChevronRight)", () => {
    render(<BreadcrumbSeparator />);
    const li = screen.getByRole("presentation", { hidden: true });
    const svg = li.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("renders custom children", () => {
    render(<BreadcrumbSeparator>Custom</BreadcrumbSeparator>);
    expect(screen.getByText("Custom")).toBeInTheDocument();
  });
});

describe("BreadcrumbEllipsis", () => {
  it("renders MoreHorizontal icon and sr-only text", () => {
    render(<BreadcrumbEllipsis />);
    const span = screen.getByRole("presentation", { hidden: true });
    const svg = span.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(screen.getByText("More")).toHaveClass("sr-only");
  });
}); 