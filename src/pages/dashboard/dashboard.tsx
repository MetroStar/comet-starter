import { Spinner } from '@metrostar/comet-extras';
import { Card, CardBody } from '@metrostar/comet-uswds';
import useCasesApi from '@src/hooks/use-cases-api';
import React from 'react';
import ErrorNotification from '../../components/error-notification/error-notification';
import { DashboardBarChart } from './dashboard-bar-chart/dashboard-bar-chart';
import { DashboardPieChart } from './dashboard-pie-chart/dashboard-pie-chart';
import { DashboardTable } from './dashboard-table/dashboard-table';

export const Dashboard = (): React.ReactElement => {
  const {
    getCases: { isLoading, data: items, error, isError },
  } = useCasesApi();

  return (
    <div className="grid-container">
      <div className="grid-row padding-bottom-2">
        <div className="grid-col">
          <h1>Active Cases</h1>
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
        <div className="tablet:grid-col-6">
          <Card id="pie-chart-card">
            <CardBody>
              <h2>Cases by Status</h2>
              <DashboardPieChart items={items} />
            </CardBody>
          </Card>
        </div>
        <div className="tablet:grid-col-6">
          <Card id="pie-bar-card">
            <CardBody>
              <h2>Cases by State</h2>
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
