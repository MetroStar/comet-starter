import { BarGraph } from '@metrostar/comet-data-viz';
import { Case } from '@src/types/case';
import React, { useEffect, useState } from 'react';
import { ChartData } from '../types';

interface DashboardBarChartProps {
  items: Case[] | undefined;
}

export const DashboardBarChart = ({
  items,
}: DashboardBarChartProps): React.ReactElement => {
  const [data, setData] = useState<ChartData[]>();
  useEffect(() => {
    if (items) {
      const newData: ChartData[] = [];
      const set = new Set<string>();
      items.forEach((item: Case) => {
        if (!item.applicant.state) {
          return;
        }

        set.add(item.applicant.state.toString());
      });

      set.forEach((name: string) => {
        const total = items.filter(
          (item: Case) => item.applicant.state?.toString() === name,
        ).length;
        newData.push({ x: name, y: total });
      });
      setData(newData);
    }
  }, [items]);

  return data ? (
    <div
      style={{
        height: '300px',
        width: '400px',
      }}
    >
      <BarGraph
        chart={{
          height: 300,
          title: 'Cases by State Bar Graph',
          width: 375,
        }}
        alignment="start"
        data={data}
        color="#0d7ea2"
      />
    </div>
  ) : (
    <></>
  );
};
