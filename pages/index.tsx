import Layout from '../components/Layout';
import Blogview from '../components/Blogview';
import Sidebar from '../components/Sidebar';

import { getPostInfo } from '../utils/posts';
import { GetStaticPropsResult } from 'next';

import { BlogPostInfo } from '../types';

interface homeProps {
  blogPostInfo: BlogPostInfo[];
}

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

const Home = ({ blogPostInfo }: homeProps) => {
  return (
    <Layout title="Kelan Mazey's Blog">
      <div>Hello</div>
      <Sidebar blogPostInfo={blogPostInfo} />
    </Layout>
  );
};

export default Home;
