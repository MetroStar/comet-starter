import React, { ReactNode, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Table, TableColumn } from '@metrostar/comet-uswds';
import { Launch } from '../../../api/types';

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

interface DashboardTableProps {
  items: Launch[] | undefined;
}

export const DashboardTable = ({ items }: DashboardTableProps): React.ReactElement => {
  const [data, setData] = useState<LaunchData[]>([]);
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

  return <Table id="launch-table" className="width-full" columns={columns} data={data} sortable />;
};
