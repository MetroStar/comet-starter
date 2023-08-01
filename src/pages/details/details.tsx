import { Spinner } from "@metrostar/comet-extras";
import { Card } from "@metrostar/comet-uswds";
import ErrorNotification from "@src/components/error-notification/error-notification";
import { useAuth } from "@src/hooks/use-auth";
import { Launch } from "@src/types/launch";
import axios from "@src/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { ReactElement } from "react";
import { useParams } from "react-router-dom";

export const Details = (): ReactElement => {
  const { id } = useParams();
  const { isSignedIn } = useAuth();
  const { isLoading, error, data } = useQuery<Launch, { message: string }>({
    queryKey: ["item", id],
    queryFn: () =>
      axios.get(`/${id}/?format=json`).then((response) => response.data),
    enabled: isSignedIn,
  });

  return (
    <div className="grid-container">
      <>
        <div className="grid-row">
          <div className="grid-col">
            <h1>Launch Details</h1>
          </div>
        </div>
        {error && (
          <div className="grid-row padding-bottom-2">
            <div className="grid-col">
              <ErrorNotification error={error.message} />
            </div>
          </div>
        )}
        <div className="grid-row">
          <div className="grid-col">
            {isLoading ? (
              <Spinner
                id="spinner"
                type="small"
                loadingText="Loading..."
                className="padding-top-2"
              />
            ) : data ? (
              <Card id="details-card">
                <ul>
                  <li>
                    <b>Name:</b> {data.name}
                  </li>
                  <li>
                    <b>Rocket Name:</b> {data.rocket.configuration.name}
                  </li>
                  <li>
                    <b>Rocket Family:</b> {data.rocket.configuration.family}
                  </li>
                  <li>
                    <b>Status:</b> {data.status.name}
                  </li>
                  <li>
                    <b>Last Updated:</b> {data.last_updated}
                  </li>
                </ul>
              </Card>
            ) : (
              <>No items found</>
            )}
          </div>
        </div>
      </>
    </div>
  );
};

export default Details;
