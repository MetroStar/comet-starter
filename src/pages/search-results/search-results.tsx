import { Card, CardBody } from '@metrostar/comet-uswds';
import ErrorNotification from '@src/components/error-notification/error-notification';
import { mockData } from '@src/data/spacecraft';
import useAuth from '@src/hooks/use-auth';
import { Spacecraft } from '@src/types/spacecraft';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';

export const SearchResults = (): React.ReactElement => {
  const [searchParams] = useSearchParams();
  const { isSignedIn } = useAuth();
  const { error, data: items } = useQuery<Spacecraft[], { message: string }>({
    queryKey: ['results', searchParams.get('q')],
    queryFn: () =>
      // axios
      //   .get('/search?q=' + searchParams.get('q'))
      //   .then((response) => {
      //     return response.data;
      //   })
      //   .then((data) => {
      //     return data.items;
      //   }),

      // TODO: Remove this mock response and uncomment above if API available
      Promise.resolve(filterResults(mockData.items)),
    enabled: isSignedIn,
  });

  const filterResults = (items: Spacecraft[] | undefined) => {
    const query = searchParams.get('q')?.toLowerCase() || '';
    if (items) {
      return items.filter(
        (result) =>
          result.name.toLowerCase().includes(query) ||
          result.description.toLowerCase().includes(query) ||
          result.affiliation.toLowerCase().includes(query),
      );
    }
    return [];
  };

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
      {error && (
        <div className="grid-row padding-bottom-2">
          <div className="grid-col">
            <ErrorNotification error={error.message} />
          </div>
        </div>
      )}
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
    </div>
  );
};
