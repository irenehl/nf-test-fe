import { FC } from 'react';
import { MapView } from '../../components/MapView';
import { Layout } from '../../components/layout';

const HomePage: FC = () => {
  return (
    <Layout>
      <MapView />
    </Layout>
  );
};

export default HomePage;
