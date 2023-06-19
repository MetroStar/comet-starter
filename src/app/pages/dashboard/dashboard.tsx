import React, { ReactNode, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Table, TableColumn } from '@metrostar/comet-uswds';
import { Spinner } from '@metrostar/comet-extras';
import useAuth from '../../hooks/useAuth';
import useApi from '../../hooks/useApi';
import { Launch } from '../../api/types';

interface LaunchData {
  id: SortableDataCell;
  name: SortableDataCell;
  status: SortableDataCell;
  last_updated: SortableDataCell;
}

interface SortableDataCell {
  value: string | ReactNode;
  sortValue: string;
}

export const Dashboard = (): React.ReactElement => {
  const { isSignedIn } = useAuth();
  const { getItems, items, loading } = useApi();
  const [data, setData] = useState<LaunchData[] | null>(null);

  useEffect(() => {
    if (isSignedIn) {
      getItems();
    }
  }, [isSignedIn]);

  useEffect(() => {
    if (items) {
      const newData: LaunchData[] = [];
      items.forEach((item: Launch) => {
        newData.push({
          name: {
            value: (
              <NavLink id={`details-link-${item.id}`} to={`/details/${item.id}`}>
                {item.name}
              </NavLink>
            ),
            sortValue: item.status.name,
          },
          id: { value: item.id, sortValue: item.id },
          status: { value: item.status.name, sortValue: item.status.name },
          last_updated: { value: item.last_updated, sortValue: item.last_updated },
        });
      });
      setData(newData);
    }
  }, [items]);

  const columns: TableColumn[] = [
    { id: 'name', name: 'Name' },
    { id: 'id', name: 'ID' },
    { id: 'status', name: 'Status' },
    { id: 'last_updated', name: 'Last Updated' },
  ];

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
                columns={columns}
                data={data}
                sortable
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};
