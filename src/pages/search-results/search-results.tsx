import { Spinner } from '@metrostar/comet-extras';
import { Card, CardBody } from '@metrostar/comet-uswds';
import ErrorNotification from '@src/components/error-notification/error-notification';
import useSpacecraftApi from '@src/hooks/use-spacecraft-api';
import React from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';

export const SearchResults = (): React.ReactElement => {
  const [searchParams] = useSearchParams();
  const { searchItems } = useSpacecraftApi();
  const {
    data: items,
    isLoading,
    isError,
    error,
  } = searchItems(searchParams.get('q') || '');

  const getResultsSummary = () => {
    const query = searchParams.get('q') || '';
    if (!items) {
      return `Found 0 search results for "${query}"`;
    }

    return items.length === 1
      ? `Found 1 search result for "${query}"`
      : `Found ${items.length} search results for "${query}"`;
  };

  return (
    <div className="grid-container">
      <div className="grid-row padding-bottom-2">
        <div className="grid-col">
          <h1>{getResultsSummary()}</h1>
        </div>
      </div>
      {isError && (
        <div className="grid-row padding-bottom-2">
          <div className="grid-col">
            <ErrorNotification error={error.message} />
          </div>
        </div>
      )}
      {isLoading ? (
        <Spinner id="spinner" type="small" loadingText="Loading..." />
      ) : (
        <div className="grid-row">
          <div className="grid-col">
            {items && items.length > 0 ? (
              items.map((item) => (
                <Card
                  key={`result-card-${item.id}`}
                  id={`result-card-${item.id}`}
                >
                  <CardBody>
                    <NavLink
                      id={`details-link-${item.id}`}
                      to={`/details/${item.id}`}
                    >
                      <strong>{item.name}</strong>
                    </NavLink>
                    <p>{item.description}</p>
                  </CardBody>
                </Card>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
