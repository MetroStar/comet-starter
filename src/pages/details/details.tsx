import { Spinner } from '@metrostar/comet-extras';
import { Card } from '@metrostar/comet-uswds';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ErrorNotification from '../../components/error-notification/error-notification';
import useApi from '../../hooks/use-api';
import useAuth from '../../hooks/use-auth';
import { Launch } from '../../types/launch';

export const Details = (): React.ReactElement => {
  const { id } = useParams();
  const { isSignedIn } = useAuth();
  const { getItem, item, loading, error } = useApi();
  const [data, setData] = useState<Launch | null>(null);

  useEffect(() => {
    if (isSignedIn && id) {
      getItem(id);
    }
  }, [isSignedIn, id, getItem]);

  useEffect(() => {
    if (item) {
      setData(item);
    }
  }, [item]);

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
              <ErrorNotification error={error} />
            </div>
          </div>
        )}
        <div className="grid-row">
          <div className="grid-col">
            {loading ? (
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
