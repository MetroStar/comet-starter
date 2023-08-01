import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

import { RecoilRoot } from "recoil";
import * as useAuthMock from "../../hooks/use-auth";
import { User } from "../../types/user";
import { SignIn } from "./sign-in";

describe("SignIn", () => {
  const signInComponent = (
    <RecoilRoot>
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    </RecoilRoot>
  );

  test("should render successfully", () => {
    const { baseElement } = render(signInComponent);
    expect(baseElement).toBeTruthy();
  });

  test("should simulate a login attempt with blank fields", async () => {
    const { baseElement } = render(signInComponent);
    await userEvent.click(
      screen.getByText("Sign In", { selector: "button[type=submit]" }),
    );
    expect(baseElement.querySelectorAll(".usa-error-message").length).toBe(2);
  });

  test("should simulate a login attempt with blank username", async () => {
    const { baseElement } = render(signInComponent);
    await userEvent.type(screen.getByLabelText("Password"), "b");
    await userEvent.click(
      screen.getByText("Sign In", { selector: "button[type=submit]" }),
    );
    expect(baseElement.querySelectorAll(".usa-error-message").length).toBe(1);
  });

  test("should simulate a login attempt with blank password", async () => {
    const { baseElement } = render(signInComponent);
    await userEvent.type(screen.getByLabelText("Username"), "a");
    await userEvent.click(
      screen.getByText("Sign In", { selector: "button[type=submit]" }),
    );
    expect(baseElement.querySelectorAll(".usa-error-message").length).toBe(1);
  });

  test("should simulate a successful login attempt", async () => {
    jest.spyOn(useAuthMock, "default").mockReturnValue({
      isSignedIn: false,
      currentUserData: {} as User,
      error: null,
      signIn: jest.fn(),
      signOut: jest.fn(),
    });

    const { baseElement } = render(signInComponent);
    await userEvent.type(screen.getByLabelText("Username"), "a");
    await userEvent.type(screen.getByLabelText("Password"), "b");

    await act(async () => {
      await userEvent.click(
        screen.getByText("Sign In", { selector: "button[type=submit]" }),
      );
    });
    expect(baseElement.querySelectorAll(".usa-error-message").length).toBe(0);
  });

  test("should simulate a successful login attempt when signed in", async () => {
    jest.spyOn(useAuthMock, "default").mockReturnValue({
      isSignedIn: true,
      currentUserData: {} as User,
      error: null,
      signIn: jest.fn(),
      signOut: jest.fn(),
    });

    const { baseElement } = render(signInComponent);
    await userEvent.type(screen.getByLabelText("Username"), "a");
    await userEvent.type(screen.getByLabelText("Password"), "b");

    await act(async () => {
      await userEvent.click(
        screen.getByText("Sign In", { selector: "button[type=submit]" }),
      );
    });
    expect(baseElement.querySelectorAll(".usa-error-message").length).toBe(0);
  });

  test("should simulate an unsuccessful login attempt", async () => {
    jest.spyOn(useAuthMock, "default").mockReturnValue({
      isSignedIn: false,
      currentUserData: {} as User,
      error: "Error",
      signIn: jest.fn(),
      signOut: jest.fn(),
    });

    const { baseElement } = render(signInComponent);
    await userEvent.type(screen.getByLabelText("Username"), "a");
    await userEvent.type(screen.getByLabelText("Password"), "b");

    await act(async () => {
      await userEvent.click(
        screen.getByText("Sign In", { selector: "button[type=submit]" }),
      );
    });
    expect(baseElement.querySelectorAll(".usa-alert").length).toBe(1);
  });

  test("should cancel a login attempt", async () => {
    const { baseElement } = render(signInComponent);
    await userEvent.click(
      screen.getByText("Cancel", { selector: "button[type=button]" }),
    );
    expect(baseElement.querySelectorAll(".usa-error-message").length).toBe(0);
  });
});
