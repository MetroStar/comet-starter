import * as useAuthMock from "@src/hooks/use-auth";
import { User } from "@src/types/user";
import { act, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Home } from "./home";

describe("Home", () => {
  test("should render successfully", () => {
    const { baseElement } = render(
      <RecoilRoot>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </RecoilRoot>,
    );
    expect(baseElement).toBeTruthy();
    expect(baseElement.querySelector("h1")?.textContent).toEqual(
      "Welcome Guest",
    );
  });

  test("should render with mock data", async () => {
    jest.spyOn(useAuthMock, "useAuth").mockReturnValue({
      isSignedIn: true,
      currentUserData: { firstName: "John", lastName: "Doe" } as User,
      error: null,
      signIn: jest.fn(),
      signOut: jest.fn(),
    });
    const { baseElement } = render(
      <RecoilRoot>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </RecoilRoot>,
    );
    await act(async () => {
      expect(baseElement).toBeTruthy();
    });
    expect(baseElement.querySelector("h1")?.textContent).toEqual(
      "Welcome John Doe",
    );
  });
});
