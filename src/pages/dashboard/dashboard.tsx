import { Spinner } from '@metrostar/comet-extras';
import { Card, CardBody } from '@metrostar/comet-uswds';
import { mockData } from '@src/data/spacecraft';
import { Spacecraft } from '@src/types/spacecraft';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import ErrorNotification from '../../components/error-notification/error-notification';
import useAuth from '../../hooks/use-auth';
import { DashboardBarChart } from './dashboard-bar-chart/dashboard-bar-chart';
import { DashboardPieChart } from './dashboard-pie-chart/dashboard-pie-chart';
import { DashboardTable } from './dashboard-table/dashboard-table';
// import axios from '@src/utils/axios';

export const Dashboard = (): React.ReactElement => {
  const { isSignedIn } = useAuth();
  const {
    isLoading,
    error,
    data: items,
  } = useQuery<Spacecraft[], { message: string }>({
    queryKey: ['dashboard'],
    queryFn: () =>
      // axios
      //   .get('/spacecraft')
      //   .then((response) => {
      //     return response.data;
      //   })
      //   .then((data) => {
      //     return data.items;
      //   }),

      // TODO: Remove this mock response and uncomment above if API available
      Promise.resolve(mockData.items),
    enabled: isSignedIn,
  });

  return (
    <div className="grid-container">
      <div className="grid-row padding-bottom-2">
        <div className="grid-col">
          <h1>Dashboard</h1>
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
        <div className="tablet:grid-col-6">
          <Card id="pie-chart-card">
            <CardBody>
              <h2>Spacecraft Affiliation</h2>
              <DashboardPieChart items={items} />
            </CardBody>
          </Card>
        </div>
        <div className="tablet:grid-col-6">
          <Card id="pie-bar-card">
            <CardBody>
              <h2>Spacecraft Appearances</h2>
              <DashboardBarChart items={items} />
            </CardBody>
          </Card>
        </div>
      </div>
      <div className="grid-row">
        <div className="grid-col">
          {isLoading ? (
            <Spinner id="spinner" type="small" loadingText="Loading..." />
          ) : (
            <DashboardTable items={items} />
          )}
        </div>
      </div>
    </div>
  );
};
