import type { NextPage } from 'next';

import { SEO } from '../components/SEO';
import { DashboardComponent } from '../features/dashboard';
import { Layout } from '../layouts';

const Home: NextPage = () => (
  <>
    <SEO
      title="Fichas Disponíveis"
      description="consulte a disponibilidade de atentimento"
    />
    <Layout>
      <DashboardComponent />
    </Layout>
  </>
);

export default Home;
