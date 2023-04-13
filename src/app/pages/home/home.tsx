import React from "react";
import useAuth from "../../hooks/useAuth";
import { Alert } from "@metrostar/warpspeed";

export const Home = (): React.ReactElement => {
  const { isSignedIn, currentUserData } = useAuth();
  return (
    <div className="grid-container">
      <div className="grid-row">
        <div className="grid-col">
          <h1>Welcome {currentUserData.displayName}</h1>
        </div>
      </div>
      {!isSignedIn && (
        <div className="grid-row">
          <div className="grid-col">
            <Alert id="sign-in-alert" type="info">
              You are not currently signed in. Please Sign In to access the
              Dashboard.
            </Alert>
          </div>
        </div>
      )}
    </div>
  );
};
