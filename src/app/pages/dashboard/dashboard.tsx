import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Table } from '@metrostar/comet-uswds';
import { Spinner } from '@metrostar/comet-extras';
import useAuth from '../../hooks/useAuth';
import useApi from '../../hooks/useApi';
import { Launch } from '../../api/types';

export const Dashboard = (): React.ReactElement => {
  const { isSignedIn } = useAuth();
  const { getItems, items, loading } = useApi();
  const [data, setData] = useState<Launch[] | null>(null);

  useEffect(() => {
    if (isSignedIn) {
      getItems();
    }
  }, [isSignedIn]);

  useEffect(() => {
    if (items) {
      setData(items);
    }
  }, [items]);
  return (
    <div className="grid-container">
      <div className="grid-row">
        <div className="grid-col">
          <h1>My Dashboard</h1>
        </div>
      </div>
      <div className="grid-row">
        <div className="grid-col">
          {loading ? (
            <Spinner id="spinner" type="small" loadingText="Loading..." className="padding-top-2" />
          ) : (
            data && (
              <Table
                id="characters-table"
                className="width-full"
                columns={[
                  { id: 'id', name: 'ID' },
                  { id: 'name', name: 'Name' },
                ]}
                data={data.map(({ id, name }) => {
                  return {
                    id,
                    name: (
                      <NavLink id={`details-link-${id}`} to={`/details/${id}`}>
                        {name}
                      </NavLink>
                    ),
                  };
                })}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};
