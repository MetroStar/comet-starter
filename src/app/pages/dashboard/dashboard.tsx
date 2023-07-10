import React, { useEffect } from 'react';
import { Card, CardBody } from '@metrostar/comet-uswds';
import { Spinner } from '@metrostar/comet-extras';
import useAuth from '../../hooks/use-auth';
import useApi from '../../hooks/use-api';
import { DashboardTable } from './dashboard-table/dashboard-table';
import { DashboardPieChart } from './dashboard-pie-chart/dashboard-pie-chart';
import { DashboardBarChart } from './dashboard-bar-chart/dashboard-bar-chart';
import ErrorNotification from '../../components/error-notification/error-notification';

export const Dashboard = (): React.ReactElement => {
  const { isSignedIn } = useAuth();
  const { getItems, items, loading, error } = useApi();

  useEffect(() => {
    if (isSignedIn) {
      getItems();
    }
  }, [isSignedIn]);

  return (
    <div className="grid-container">
      <div className="grid-row padding-bottom-2">
        <div className="grid-col">
          <h1>My Dashboard</h1>
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
        <div className="tablet:grid-col-6">
          <Card id="pie-chart-card">
            <CardBody>
              <h2>Launch Success/Failure</h2>
              <DashboardPieChart items={items} />
            </CardBody>
          </Card>
        </div>
        <div className="tablet:grid-col-6">
          <Card id="pie-bar-card">
            <CardBody>
              <h2>Service Provider</h2>
              <DashboardBarChart items={items} />
            </CardBody>
          </Card>
        </div>
      </div>
      <div className="grid-row">
        <div className="grid-col">
          {loading ? (
            <Spinner id="spinner" type="small" loadingText="Loading..." />
          ) : (
            <DashboardTable items={items} />
          )}
        </div>
      </div>
    </div>
  );
};
