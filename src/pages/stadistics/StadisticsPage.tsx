import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Layout } from '../../components/layout';
import { ActivitiesByCoordsChart, TotalActivitiesChart } from '../../components/charts';

type DateGroup = {
  startDate?: string;
  endDate?: string;
};

const StadisticsPage: FC = () => {
  const [dates, setDates] = useState<DateGroup>();
  const { register, handleSubmit } = useForm<{ startDate?: string; endDate?: string }>({
    defaultValues: { startDate: null, endDate: null } as any,
  });

  const onSubmit = (data: DateGroup) => setDates(data);

  console.log(dates);

  return (
    <Layout>
      <div className="ml-12 p-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="date" {...register('startDate')} />
          <input type="date" {...register('endDate')} />
          <button type="submit">Submit</button>
        </form>
        <div className="flex items-center justify-start gap-4">
          <TotalActivitiesChart />
          <div className="w-1/4 rounded border border-opacity-50 p-3 shadow">
            <h2>Title</h2>
            <ActivitiesByCoordsChart startDate={dates?.startDate} endDate={dates?.endDate} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StadisticsPage;
