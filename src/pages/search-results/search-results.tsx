import { Spinner } from '@metrostar/comet-extras';
import { Card, CardBody } from '@metrostar/comet-uswds';
import ErrorNotification from '@src/components/error-notification/error-notification';
import useCasesApi from '@src/hooks/use-cases-api';
import { CaseSearchFilters } from '@src/types/case';
import React, { useEffect, useState } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import { AdvancedSearchPanel } from './advanced-search-panel';

export const SearchResults = (): React.ReactElement => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchCases } = useCasesApi();

  const [simpleQuery, setSimpleQuery] = useState(searchParams.get('q') || '');

  useEffect(() => {
    setSimpleQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const filters: CaseSearchFilters = {
    id: searchParams.get('caseId') || undefined,
    gender: searchParams.getAll('gender'),
    status: searchParams.getAll('status'),
    created_before: searchParams.get('createdBefore') || undefined,
    created_after: searchParams.get('createdAfter') || undefined,
    q: searchParams.get('q') || undefined,
  };

  // Pass both simple and advanced filters to the API
  const { data, isLoading, isError, error } = searchCases({
    ...filters,
    q: simpleQuery || undefined,
  });

  // Advanced search handler
  const handleAdvancedSearch = (newFilters: CaseSearchFilters) => {
    const params = new URLSearchParams();
    if (newFilters.id) params.append('caseId', newFilters.id);
    if (newFilters.gender) {
      for (const gender of newFilters.gender) {
        params.append('gender', gender);
      }
    }
    if (newFilters.status) {
      for (const status of newFilters.status) {
        params.append('status', status);
      }
    }
    if (newFilters.created_before)
      params.append('createdBefore', newFilters.created_before);
    if (newFilters.created_after)
      params.append('createdAfter', newFilters.created_after);
    // Preserve simple query if present
    if (simpleQuery) params.append('q', simpleQuery);
    setSearchParams(params);
  };

  const handleAdvancedClear = () => {
    setSearchParams({});
    setSimpleQuery('');
  };

  const getResultsSummary = () => {
    // Build a summary string based on filters
    const summaryParts = [];
    if (simpleQuery) summaryParts.push(`Search: ${simpleQuery}`);
    if (filters.id) summaryParts.push(`Case ID: ${filters.id}`);
    if (filters.gender && filters.gender.length > 0)
      summaryParts.push(`Gender: ${filters.gender}`);
    if (filters.status && filters.status.length > 0)
      summaryParts.push(`Status: ${filters.status}`);
    if (filters.created_before)
      summaryParts.push(`Created Before: ${filters.created_before}`);
    if (filters.created_after)
      summaryParts.push(`Created After: ${filters.created_after}`);
    const summary =
      summaryParts.length > 0 ? summaryParts.join('; ') : 'All Cases';

    if (!data) {
      return `Found 0 search results for "${summary}"`;
    }

    return data.length === 1
      ? `Found 1 search result for "${summary}"`
      : `Found ${data.length} search results for "${summary}"`;
  };

  return (
    <div className="grid-container">
      <div className="grid-row">
        {/* Advanced Search Panel on the left */}
        <div className="grid-col-3 display-none desktop:display-block">
          <AdvancedSearchPanel
            initialFilters={filters}
            onSearch={handleAdvancedSearch}
            onClear={handleAdvancedClear}
          />
        </div>
        {/* Search Results and Simple Search on the right */}
        <div className="grid-col-9">
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
      </div>
    </div>
  );
};
