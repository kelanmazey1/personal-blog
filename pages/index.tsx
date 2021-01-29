import Link from 'next/link';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar';

import { getPostInfo } from '../utils/posts';

import { BlogPostInfo } from '../types';
import { GetStaticPropsResult } from 'next';

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
      <Navbar />
      <h2>About</h2>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Enim nulla aliquet
        porttitor lacus luctus. Gravida neque convallis a cras semper auctor.
        Diam maecenas ultricies mi eget mauris pharetra et. Mi proin sed libero
        enim. Nibh mauris cursus mattis molestie a iaculis at erat. Quam
        pellentesque nec nam aliquam sem et tortor consequat id. Viverra
        suspendisse potenti nullam ac. Mauris nunc congue nisi vitae suscipit
        tellus. Cum sociis natoque penatibus et. Arcu odio ut sem nulla pharetra
        diam sit amet. Curabitur vitae nunc sed velit dignissim. Auctor urna
        nunc id cursus metus aliquam. Et tortor consequat id porta nibh
        venenatis cras sed. Enim lobortis scelerisque fermentum dui faucibus in
        ornare. Neque sodales ut etiam sit amet nisl purus in.
      </div>
      <h2>Projects</h2>
      <div>
        {blogPostInfo.map(({ id, image_filename }) => (
          <Link href={`/projects/${id}`} key={id}>
            <img src={`/images/${image_filename}`} width={200} height={200} />
          </Link>
        ))}
      </div>
      <h2>Contact</h2>
      <div>This will be a form</div>
    </Layout>
  );
};

export default Home;
