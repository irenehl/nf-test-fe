import { FC } from 'react';
import useGetTotalActivities from '../../hooks/queries/useGetTotalActivities';

type ChartProps = {
  startDate?: string;
  endDate?: string;
};

const TotalActivitiesChart: FC<ChartProps> = ({ startDate, endDate }) => {
  const { res, isLoading } = useGetTotalActivities(startDate, endDate);

  if (!res || !res.data || isLoading) return <div>loading</div>;

  const total = res.data.soilTotal + res.data.fertilizationTotal;
  const soilPercentage = (res.data.soilTotal * 100) / total;
  const fertilizationPercentage = 100 - soilPercentage;

  return (
    <>
      <div className="stat w-auto place-items-center shadow">
        <div className="stat-title">Total Activities</div>
        <div className="stat-value text-primary">{res.data.fertilizationTotal + res.data.soilTotal}</div>
        <div className="stat-desc">Soil + Fertilization</div>
      </div>
      <div className="stat w-auto place-items-center shadow">
        <div className="stat-title">Soil Percentage</div>
        <div className="stat-value text-primary">{soilPercentage.toFixed(1)} %</div>
        <div className="stat-desc">From {res.data.soilTotal} entries</div>
      </div>
      <div className="stat w-auto place-items-center shadow">
        <div className="stat-title">Fertilization Percentage</div>
        <div className="stat-value text-primary">{fertilizationPercentage.toFixed(1)} %</div>
        <div className="stat-desc">From {res.data.fertilizationTotal} entries</div>
      </div>
    </>
  );
};

export default TotalActivitiesChart;
