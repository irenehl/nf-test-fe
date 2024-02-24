import { FC } from 'react';
import { Chart as ReactChartJS } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import useGetCoordinates from '../../hooks/queries/useGetCoordinates';
import Loading from '../loading/Loading';

type ChartProps = {
  startDate?: string;
  endDate?: string;
};

Chart.register(...registerables);

const ActivitiesByCoordsChart: FC<ChartProps> = ({ startDate, endDate }) => {
  const { res, isLoading } = useGetCoordinates(startDate, endDate);

  if (!res || !res.data || isLoading) return <Loading />;

  const totalActivities = res.data.length;

  const activityCoordinates = res.data.map(({ coordinates }: any) => coordinates);

  const labels = Array.from({ length: totalActivities }, (_, index) => (index + 1).toString());

  const data = {
    labels,
    datasets: [
      {
        label: 'Count',
        data: activityCoordinates,
        fill: false,
        borderColor: '#7380ff',
        backgroundColor: '#FF6384',
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
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Coordinates',
        },
      },
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Activity',
        },
      },
    },
  };

  return <ReactChartJS type="line" data={data} options={options as any} />;
};

export default ActivitiesByCoordsChart;
