import { DataTable } from '@metrostar/comet-extras';
import { ColumnDef } from '@tanstack/react-table';
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
  const cols = React.useMemo<ColumnDef<LaunchData>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'provider',
        header: 'Service Provider',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'last_updated',
        header: 'Last Updated',
        cell: (info) => info.getValue(),
      },
    ],
    [],
  );

  useEffect(() => {
    if (items) {
      const newData: LaunchData[] = [];
      items.forEach((item: Launch) => {
        newData.push({
          name: (
            <NavLink id={`details-link-${item.id}`} to={`/details/${item.id}`}>
              {item.name}
            </NavLink>
          ),
          provider: item.launch_service_provider.name,
          status: item.status.name,
          last_updated: item.last_updated,
        });
      });
      setData(newData);
    }
  }, [items]);

  return data ? (
    <DataTable
      id="launch-table"
      className="width-full"
      columns={cols}
      data={data}
      sortable
      sortCol="last_updated"
      sortDir="desc"
    ></DataTable>
  ) : (
    <></>
  );
};
