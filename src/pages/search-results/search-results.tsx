import { Spinner } from '@metrostar/comet-extras';
import { Card, CardBody } from '@metrostar/comet-uswds';
import ErrorNotification from '@src/components/error-notification/error-notification';
import useCasesApi from '@src/hooks/use-cases-api';
import React from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';

export const SearchResults = (): React.ReactElement => {
  const [searchParams] = useSearchParams();
  const { searchCases } = useCasesApi();
  const { data, isLoading, isError, error } = searchCases(
    searchParams.get('q') || '',
  );

  const getResultsSummary = () => {
    const query = searchParams.get('q') || '';
    if (!data) {
      return `Found 0 search results for "${query}"`;
    }

    return data.length === 1
      ? `Found 1 search result for "${query}"`
      : `Found ${data.length} search results for "${query}"`;
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
            {data && data.length > 0 ? (
              data.map((item) => (
                <Card
                  key={`result-card-${item.id}`}
                  id={`result-card-${item.id}`}
                >
                  <CardBody>
                    Case:{' '}
                    <NavLink
                      id={`case-link-${item.id}`}
                      to={`/cases/${item.id}`}
                    >
                      <strong>{item.id}</strong>
                    </NavLink>
                    <div>
                      Applicant: {item.applicant.first_name}{' '}
                      {item.applicant.last_name}
                    </div>
                    <div>Status: {item.status}</div>
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
