/* eslint-disable jsx-a11y/label-has-associated-control */
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Layout } from '../../components/layout';
import { ActivitiesByCoordsChart, TotalActivitiesChart } from '../../components/charts';
import ActivitiesByCarbonNum from '../../components/charts/ActivitiesByCarbonNum';

type DateGroup = {
  startDate?: string;
  endDate?: string;
};

const StatisticsPage: FC = () => {
  const [dates, setDates] = useState<DateGroup>();
  const { register, handleSubmit } = useForm<{ startDate?: string; endDate?: string }>({
    defaultValues: { startDate: null, endDate: null } as any,
  });

  const onSubmit = (data: DateGroup) => setDates(data);

  return (
    <Layout>
      <div className="ml-12 p-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col items-center justify-center gap-4 lg:w-5/6 lg:flex-row lg:justify-start"
        >
          <fieldset className="flex w-full flex-col lg:w-1/5">
            <label htmlFor="startDate" className="my-2 text-white">
              Start date
            </label>
            <input type="date" className="w-full rounded-xl p-2" {...register('startDate')} />
          </fieldset>
          <fieldset className="flex w-full flex-col lg:w-1/5">
            <label htmlFor="endDate" className="my-2 text-white">
              End date
            </label>
            <input type="date" className="w-full rounded-xl p-2" {...register('endDate')} />
          </fieldset>
          <button type="submit" className="btn btn-primary btn-md mt-3 w-full hover:text-white lg:mt-9 lg:w-auto">
            Submit
          </button>
        </form>
        <div className="flex w-full flex-col items-center justify-start gap-4">
          <TotalActivitiesChart startDate={dates?.startDate} endDate={dates?.endDate} />
          <div className="flex w-full flex-col rounded border border-opacity-50 p-3 shadow">
            <h2 className="text-center text-lg text-white lg:text-3xl">Coordinates peer activity</h2>
            <ActivitiesByCoordsChart startDate={dates?.startDate} endDate={dates?.endDate} />
          </div>
          <div className="flex w-full flex-col rounded border border-opacity-50 p-3 shadow">
            <h2 className="text-center text-lg text-white lg:text-3xl">Carbon peer activity</h2>
            <ActivitiesByCarbonNum startDate={dates?.startDate} endDate={dates?.endDate} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StatisticsPage;
