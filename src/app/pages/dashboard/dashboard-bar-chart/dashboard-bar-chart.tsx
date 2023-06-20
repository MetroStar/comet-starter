import React, { useEffect, useState } from 'react';
import { BarGraph } from '@metrostar/comet-data-viz';
import { Launch } from '../../../api/types';

interface ChartData {
  x: string;
  y: number;
}

interface DashboardBarChartProps {
  items: Launch[] | undefined;
}

export const DashboardBarChart = ({ items }: DashboardBarChartProps): React.ReactElement => {
  const [data, setData] = useState<ChartData[]>([]);
  useEffect(() => {
    if (items) {
      const newData: ChartData[] = [];
      let spaceX = 0;
      let soviet = 0;
      let navy = 0;
      let army = 0;
      items.forEach((item: Launch) => {
        if (item.launch_service_provider.id === 66) {
          soviet++;
        } else if (item.launch_service_provider.id === 166) {
          navy++;
        } else if (item.launch_service_provider.id === 271) {
          army++;
        } else {
          spaceX++;
        }
      });
      if (soviet > 0) newData.push({ x: 'Soviet Space Program', y: soviet });
      if (navy > 0) newData.push({ x: 'US Navy', y: navy });
      if (army > 0) newData.push({ x: 'Army Ballistic Missile Agency', y: army });
      if (spaceX > 0) newData.push({ x: 'SpaceX', y: spaceX });

      setData(newData);
    }
  }, [items]);

  return (
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
  );
};
