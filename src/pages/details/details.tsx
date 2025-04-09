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
            <h1>{data?.name}</h1>
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
                  <div className="grid-row grid-gap">
                    <div className="grid-col-12 margin-bottom-2">
                      <div className="text-bold margin-bottom-05">
                        Description
                      </div>
                      <div>{data.description}</div>
                    </div>
                    <div className="tablet:grid-col-6 margin-bottom-2">
                      <div className="text-bold margin-bottom-05">
                        Affiliation
                      </div>
                      <div>{data.affiliation}</div>
                    </div>
                    <div className="tablet:grid-col-6 margin-bottom-2">
                      <div className="text-bold margin-bottom-05">
                        Dimensions
                      </div>
                      <div>{data.dimensions}</div>
                    </div>
                    <div className="tablet:grid-col-6 margin-bottom-2">
                      <div className="text-bold margin-bottom-05">
                        Appearances
                      </div>
                      <div>{data.appearances}</div>
                    </div>
                  </div>
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
