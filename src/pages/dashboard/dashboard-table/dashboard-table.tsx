import { Table, TableColumn } from '@metrostar/comet-uswds';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Launch } from '../../../types/launch';
import { LaunchData } from '../types';

interface DashboardTableProps {
  items: Launch[] | undefined;
}

export const DashboardTable = ({
  items,
}: DashboardTableProps): React.ReactElement => {
  const [data, setData] = useState<LaunchData[]>();
  useEffect(() => {
    if (items) {
      const newData: LaunchData[] = [];
      items.forEach((item: Launch) => {
        newData.push({
          name: {
            value: (
              <NavLink
                id={`details-link-${item.id}`}
                to={`/details/${item.id}`}
              >
                {item.name}
              </NavLink>
            ),
            sortValue: item.status.name,
          },
          provider: {
            value: item.launch_service_provider.name,
            sortValue: item.launch_service_provider.name,
          },
          status: { value: item.status.name, sortValue: item.status.name },
          last_updated: {
            value: item.last_updated,
            sortValue: item.last_updated,
          },
        });
      });
      setData(newData);
    }
  }, [items]);

  const columns: TableColumn[] = [
    { id: 'name', name: 'Name' },
    { id: 'provider', name: 'Service Provider' },
    { id: 'status', name: 'Status' },
    { id: 'last_updated', name: 'Last Updated' },
  ];

  return data ? (
    <Table
      id="launch-table"
      className="width-full"
      columns={columns}
      data={data}
      sortable
    />
  ) : (
    <></>
  );
};
