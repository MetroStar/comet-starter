import { PieChart } from '@metrostar/comet-data-viz';
import React, { useEffect, useState } from 'react';
import { Launch } from '../../../types/launch';
import { ChartData } from '../types';

interface DashboardPieChartProps {
  items: Launch[] | undefined;
}

export const DashboardPieChart = ({
  items,
}: DashboardPieChartProps): React.ReactElement => {
  const [data, setData] = useState<ChartData[]>();
  useEffect(() => {
    if (items) {
      const newData: ChartData[] = [];
      const set = new Set<string>();
      items.forEach((item: Launch) => {
        set.add(item.status.name);
      });

      set.forEach((name: string) => {
        const total = items.filter(
          (item: Launch) => item.status.name === name,
        ).length;
        newData.push({ x: name.replace('Launch ', ''), y: total });
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
      <PieChart
        title="Launch Success/Failure Pie Chart"
        innerRadius={60}
        width={375}
        height={300}
        data={data}
        colors={['#0d7ea2', '#cd425b']}
      />
    </div>
  ) : (
    <></>
  );
};
