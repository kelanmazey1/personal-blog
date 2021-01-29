import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getAllPostIds, getPostData, PostData } from '../../utils/posts';

interface projectBlogProps {
  projectBlogData: PostData;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<projectBlogProps> = async (
  context
) => {
  let postData;
  if (context.params && typeof context.params.id === 'string') {
    postData = await getPostData(context.params.id);
  }
  return {
    props: {
      // overwriting type as all posts come from internal store
      projectBlogData: postData as PostData,
    },
  };
};

const ProjectBlog = ({ projectBlogData }: projectBlogProps) => {
  const { contentHtml, metaData } = projectBlogData;
  return (
    <div>
      <h2>{metaData.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </div>
  );
};

export default ProjectBlog;
