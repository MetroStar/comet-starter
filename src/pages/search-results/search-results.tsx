import { Spinner } from '@metrostar/comet-extras';
import { Card, CardBody } from '@metrostar/comet-uswds';
import ErrorNotification from '@src/components/error-notification/error-notification';
import useCasesApi from '@src/hooks/use-cases-api';
import { CaseSearchFilters } from '@src/types/case';
import React from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';

export const SearchResults = (): React.ReactElement => {
  const [searchParams] = useSearchParams();
  const { searchCases } = useCasesApi();

  const filters: CaseSearchFilters = {
    id: searchParams.get('caseId') || undefined,
    last_name: searchParams.get('lastName') || undefined,
    first_name: searchParams.get('firstName') || undefined,
    status:
      (searchParams.get('status') as CaseSearchFilters['status']) || undefined,
    assigned_to: searchParams.get('assignedTo') || undefined,
    created_before: searchParams.get('createdBefore') || undefined,
    created_after: searchParams.get('createdAfter') || undefined,
  };

  const { data, isLoading, isError, error } = searchCases(filters);

  const getResultsSummary = () => {
    // Build a summary string based on filters
    const summaryParts = [];
    if (filters.id) summaryParts.push(`Case ID: "${filters.id}"`);
    if (filters.last_name)
      summaryParts.push(`Last Name: "${filters.last_name}"`);
    if (filters.first_name)
      summaryParts.push(`First Name: "${filters.first_name}"`);
    if (filters.status) summaryParts.push(`Status: "${filters.status}"`);
    if (filters.assigned_to)
      summaryParts.push(`Assigned To: "${filters.assigned_to}"`);
    if (filters.created_before)
      summaryParts.push(`Created Before: "${filters.created_before}"`);
    if (filters.created_after)
      summaryParts.push(`Created After: "${filters.created_after}"`);
    const summary =
      summaryParts.length > 0 ? summaryParts.join(', ') : 'All Cases';

    if (!data) {
      return `Found 0 search results for "${summary}"`;
    }

    return data.length === 1
      ? `Found 1 search result for "${summary}"`
      : `Found ${data.length} search results for "${summary}"`;
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
