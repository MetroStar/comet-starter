import { BarGraph } from '@metrostar/comet-data-viz';
import React, { useEffect, useState } from 'react';
import { Launch } from '../../../types/launch';
import { ChartData } from '../types';

interface DashboardBarChartProps {
  items: Launch[] | undefined;
}

export const DashboardBarChart = ({
  items,
}: DashboardBarChartProps): React.ReactElement => {
  const [data, setData] = useState<ChartData[]>();
  useEffect(() => {
    if (items) {
      const newData: ChartData[] = [];
      const set = new Set<string>();
      items.forEach((item: Launch) => {
        set.add(item.launch_service_provider.name);
      });

      set.forEach((name: string) => {
        const total = items.filter(
          (item: Launch) => item.launch_service_provider.name === name,
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
          title: 'Service Provider Bar Graph',
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
