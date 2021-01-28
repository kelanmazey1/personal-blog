import Layout from '../components/Layout';
import Navbar from '../components/Navbar';

import { getPostInfo } from '../utils/posts';
import { GetStaticPropsResult } from 'next';

interface homeProps {}

export const getStaticProps = async (): Promise<
  GetStaticPropsResult<homeProps>
> => {
  const blogPostInfo = getPostInfo();
  return {
    props: {
      blogPostInfo,
    },
  };
};

const Home = (props: homeProps) => {
  return (
    <Layout title="Kelan Mazey's Blog">
      <Navbar />
    </Layout>
  );
};

export default Home;
