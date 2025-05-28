import { DataTable } from '@metrostar/comet-extras';
import { Case } from '@src/types/case';
import { ColumnDef } from '@tanstack/react-table';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { CaseTableData } from '../types';

interface DashboardTableProps {
  items: Case[] | undefined;
}

export const DashboardTable = ({
  items,
}: DashboardTableProps): React.ReactElement => {
  const [data, setData] = useState<CaseTableData[]>();
  const cols = React.useMemo<ColumnDef<CaseTableData>[]>(
    () => [
      {
        accessorKey: 'case_id_link',
        header: 'Case ID',
        cell: (info) => info.getValue(),
        sortingFn: (rowA, rowB) => {
          return rowA.original.case_id - rowB.original.case_id;
        },
      },
      {
        accessorKey: 'last_name',
        header: 'Last Name',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'first_name',
        header: 'First Name',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'assigned_to',
        header: 'Assigned To',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'created_at',
        header: 'Created At',
        cell: (info) => info.getValue(),
        sortingFn: (rowA, rowB) => {
          return (
            new Date(rowA.original.created_at).getTime() -
            new Date(rowB.original.created_at).getTime()
          );
        },
      },
    ],
    [],
  );

  useEffect(() => {
    if (items) {
      const newData: CaseTableData[] = [];
      items.forEach((item: Case) => {
        newData.push({
          case_id: item.id,
          case_id_link: (
            <NavLink id={`case-link-${item.id}`} to={`/cases/${item.id}`}>
              {item.id}
            </NavLink>
          ),
          last_name: item.applicant.last_name,
          first_name: item.applicant.first_name,
          status: item.status,
          assigned_to: item.assigned_to || '',
          created_at: item.created_at.toLocaleDateString('en-US'),
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
      sortCol="case_id_link"
      sortDir="asc"
      pageable
    ></DataTable>
  ) : (
    <></>
  );
};
