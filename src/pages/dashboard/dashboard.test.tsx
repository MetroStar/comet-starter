import * as ReactQuery from "@tanstack/react-query";
import { act, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import * as useAuthMock from "../../hooks/use-auth";
import { User } from "../../types/user";
import { Dashboard } from "./dashboard";

describe("Dashboard", () => {
  const { QueryClient, QueryClientProvider } = ReactQuery;

  const getBaseElement = () => {
    const queryClient = new QueryClient();

    const { baseElement } = render(
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Dashboard />
          </BrowserRouter>
        </QueryClientProvider>
      </RecoilRoot>,
    );
    return baseElement;
  };

  test("should render successfully", () => {
    const baseElement = getBaseElement();
    expect(baseElement).toBeTruthy();
    expect(baseElement.querySelector("h1")?.textContent).toEqual(
      "My Dashboard",
    );
  });

  test("should render with mock data", async () => {
    jest.spyOn(ReactQuery, "useQuery").mockImplementation(
      jest.fn().mockReturnValue({
        data: [],
        isLoading: false,
        isSuccess: true,
        error: {},
      }),
    );

    jest.spyOn(useAuthMock, "useAuth").mockReturnValue({
      isSignedIn: true,
      currentUserData: {} as User,
      error: null,
      signIn: jest.fn(),
      signOut: jest.fn(),
    });

    const baseElement = getBaseElement();

    await act(async () => {
      expect(baseElement).toBeTruthy();
    });

    expect(baseElement.querySelector("h1")?.textContent).toEqual(
      "My Dashboard",
    );
    expect(baseElement.querySelectorAll(".VictoryContainer")).toHaveLength(2);
    expect(baseElement.querySelector(".usa-table")).toBeDefined();
    expect(
      baseElement.querySelectorAll(".usa-table > tbody > tr"),
    ).toHaveLength(0);
  });

  test("should render with error", async () => {
    jest.spyOn(ReactQuery, "useQuery").mockImplementation(
      jest.fn().mockReturnValue({
        data: [],
        isLoading: false,
        isSuccess: false,
        error: { message: "Error" },
      }),
    );

    const baseElement = getBaseElement();

    await act(async () => {
      expect(baseElement).toBeTruthy();
    });
    expect(baseElement.querySelector("h1")?.textContent).toEqual(
      "My Dashboard",
    );
    expect(baseElement.querySelector(".usa-alert")).toBeDefined();
    expect(baseElement.querySelector(".usa-alert--error")).toBeDefined();
  });
});
