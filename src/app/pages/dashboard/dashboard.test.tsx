import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import { Dashboard } from "./dashboard";
import { RecoilRoot } from "recoil";

describe("Dashboard", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <RecoilRoot>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </RecoilRoot>
    );
    expect(baseElement).toBeTruthy();
  });
});
