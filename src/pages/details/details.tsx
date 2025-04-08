import { Spinner } from '@metrostar/comet-extras';
import { Card, CardBody } from '@metrostar/comet-uswds';
import useSpacecraftApi from '@src/hooks/use-spacecraft-api';
import React from 'react';
import { useParams } from 'react-router-dom';
import ErrorNotification from '../../components/error-notification/error-notification';

export const Details = (): React.ReactElement => {
  const { id } = useParams();
  const { getItem } = useSpacecraftApi();
  const { isLoading, data, error, isError } = getItem(Number(id));

  return (
    <div className="grid-container">
      <>
        <div className="grid-row">
          <div className="grid-col">
            <h1>Details</h1>
          </div>
        </div>
        {isError && (
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
                <CardBody>
                  <ul>
                    <li>
                      <b>Name:</b> {data.name}
                    </li>
                    <li>
                      <b>Description:</b> {data.description}
                    </li>
                    <li>
                      <b>Affiliation:</b> {data.affiliation}
                    </li>
                    <li>
                      <b>Dimensions:</b> {data.dimensions}
                    </li>
                    <li>
                      <b>Appearances:</b> {data.appearances}
                    </li>
                  </ul>
                </CardBody>
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
