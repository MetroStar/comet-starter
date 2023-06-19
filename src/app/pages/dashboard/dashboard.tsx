import React, { useEffect } from 'react';
import { Spinner } from '@metrostar/comet-extras';
import useAuth from '../../hooks/useAuth';
import useApi from '../../hooks/useApi';
import { DashboardTable } from './dashboard-table/dashboard-table';

export const Dashboard = (): React.ReactElement => {
  const { isSignedIn } = useAuth();
  const { getItems, items, loading } = useApi();

  useEffect(() => {
    if (isSignedIn) {
      getItems();
    }
  }, [isSignedIn]);

  return (
    <div className="grid-container">
      <div className="grid-row">
        <div className="grid-col">
          <h1>My Dashboard</h1>
        </div>
      </div>
      <div className="grid-row">
        <div className="grid-col-6"></div>
      </div>
      <div className="grid-row">
        <div className="grid-col">
          {loading ? (
            <Spinner id="spinner" type="small" loadingText="Loading..." className="padding-top-2" />
          ) : (
            <DashboardTable items={items} />
          )}
        </div>
      </div>
    </div>
  );
};
