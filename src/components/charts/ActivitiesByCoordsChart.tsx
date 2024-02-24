import { FC } from 'react';
import { Chart as ReactChartJS } from 'react-chartjs-2';
import useGetCoordinates from '../../hooks/queries/useGetCoordinates';
import { Chart, registerables } from 'chart.js';

type ChartProps = {
  startDate?: string;
  endDate?: string;
};

Chart.register(...registerables);

const ActivitiesByCoordsChart: FC<ChartProps> = ({ startDate, endDate }) => {
  console.log(startDate, endDate);
  const { res, isLoading } = useGetCoordinates(startDate, endDate);

  if (!res || !res.data || isLoading) return <div>loading</div>;

  const labels = [...new Set(res.data.map(({ coordinates: c }): number => c as number))].sort(
    (a: number, b: number) => a - b,
  );
  const coordinates = res.data.map(({ coordinates: c }) => c);

  const data = {
    labels,
    datasets: [
      {
        label: 'Count',
        data: coordinates,
        fill: false,
        borderColor: 'red',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintanAspectRatio: false,
    tooltips: {
      enabled: true,
    },
    datalabels: {
      color: 'white',
    },
  };

  return <ReactChartJS type="line" data={data} options={options as any} />;
};

export default ActivitiesByCoordsChart;
