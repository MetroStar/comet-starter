import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '@metrostar/comet-uswds';
import { Spinner } from '@metrostar/comet-extras';
import { Launch } from '../../api/types';
import useApi from '../../hooks/useApi';
import useAuth from '../../hooks/useAuth';

export const Details = (): React.ReactElement => {
  const { id } = useParams();
  const { isSignedIn } = useAuth();
  const { getItem, item, loading } = useApi();
  const [data, setData] = useState<Launch | null>(null);

  useEffect(() => {
    if (isSignedIn && id) {
      getItem(id);
    }
  }, [isSignedIn, id]);

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
