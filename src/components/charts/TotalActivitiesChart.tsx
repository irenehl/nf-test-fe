import { FC } from 'react';
import useGetTotalActivities from '../../hooks/queries/useGetTotalActivities';
import Loading from '../loading/Loading';

type ChartProps = {
  startDate?: string;
  endDate?: string;
};

const TotalActivitiesChart: FC<ChartProps> = ({ startDate, endDate }) => {
  const { res, isLoading } = useGetTotalActivities(startDate, endDate);

  if (!res || !res.data || isLoading) return <Loading />;

  const total = res.data.soilTotal + res.data.fertilizationTotal;
  const soilPercentage = (res.data.soilTotal * 100) / total;
  const fertilizationPercentage = 100 - soilPercentage;

  return (
    <div className="my-10 flex w-full flex-col items-center justify-center gap-3 md:flex-row md:justify-between">
      <div className="stat w-full place-content-center place-items-center rounded-lg bg-slate-800 shadow md:w-1/4">
        <div className="stat-title text-white">Total Activities</div>
        <div className="stat-value text-primary">{total}</div>
        <div className="stat-desc">Soil + Fertilization</div>
      </div>
      <div className="stat w-full place-content-center place-items-center rounded-lg bg-slate-800 shadow md:w-1/4">
        <div className="stat-title text-white">Soil Percentage</div>
        <div className="stat-value text-primary">{soilPercentage ? soilPercentage.toFixed(1) : 0} %</div>
        <div className="stat-desc">From {res.data.soilTotal} entries</div>
      </div>
      <div className="stat w-full place-content-center place-items-center rounded-lg bg-slate-800 shadow md:w-1/4">
        <div className="stat-title text-white">Fertilization Percentage</div>
        <div className="stat-value text-primary">
          {fertilizationPercentage ? fertilizationPercentage.toFixed(1) : 0} %
        </div>
        <div className="stat-desc">From {res.data.fertilizationTotal} entries</div>
      </div>
    </div>
  );
};

export default TotalActivitiesChart;
