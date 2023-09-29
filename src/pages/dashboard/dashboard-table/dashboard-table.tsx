import { DataTable } from '@metrostar/comet-extras';
import { Spacecraft } from '@src/types/spacecraft';
import { ColumnDef } from '@tanstack/react-table';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { TableData } from '../types';

interface DashboardTableProps {
  items: Spacecraft[] | undefined;
}

export const DashboardTable = ({
  items,
}: DashboardTableProps): React.ReactElement => {
  const [data, setData] = useState<TableData[]>();
  const cols = React.useMemo<ColumnDef<TableData>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'affiliation',
        header: 'Affiliation',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'dimensions',
        header: 'Dimensions',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'appearances',
        header: 'Appearances',
        cell: (info) => info.getValue(),
      },
    ],
    [],
  );

  useEffect(() => {
    if (items) {
      const newData: TableData[] = [];
      items.forEach((item: Spacecraft) => {
        newData.push({
          name: (
            <NavLink id={`details-link-${item.id}`} to={`/details/${item.id}`}>
              {item.name}
            </NavLink>
          ),
          affiliation: item.affiliation,
          dimensions: item.dimensions,
          appearances: item.appearances,
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
      sortCol="appearances"
      sortDir="desc"
    ></DataTable>
  ) : (
    <></>
  );
};
