import { launchData } from "@src/data/launch";
import * as useAuthMock from "@src/hooks/use-auth";
import { User } from "@src/types/user";
import * as ReactQuery from "@tanstack/react-query";
import { act, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Details } from "./details";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn().mockReturnValue({ id: "1" }),
}));

describe("Details", () => {
  const { QueryClient, QueryClientProvider } = ReactQuery;

  const getBaseElement = () => {
    const queryClient = new QueryClient();

    const { baseElement } = render(
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Details />
          </BrowserRouter>
        </QueryClientProvider>
      </RecoilRoot>,
    );
    return baseElement;
  };

  test("should render successfully", () => {
    expect(getBaseElement()).toBeTruthy();
  });

  test("should render with mock data", async () => {
    jest.spyOn(ReactQuery, "useQuery").mockImplementation(
      jest.fn().mockReturnValue({
        data: { ...launchData[0] },
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
      "Launch Details",
    );

    expect(baseElement.querySelectorAll("#details-card li")).toHaveLength(5);
  });

  test("should render with error", async () => {
    jest.spyOn(ReactQuery, "useQuery").mockImplementation(
      jest.fn().mockReturnValue({
        data: { ...launchData[0] },
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
      "Launch Details",
    );
    expect(baseElement.querySelector(".usa-alert")).toBeDefined();
    expect(baseElement.querySelector(".usa-alert--error")).toBeDefined();
  });
});
