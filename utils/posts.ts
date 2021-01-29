import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import html from 'remark-html';
import remark from 'remark';

import { BlogPostInfo } from '../types';

export interface PostData {
  id: string;
  contentHtml: string;
  metaData: { [key: string]: any };
}

const projectsDirectory = path.join(process.cwd(), 'projects');

// Helper to extract file contents from markdown
const getFileContents = (directory: string, fileName: string): string => {
  const fullPath = path.join(directory, `${fileName}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  return fileContents;
};

export const getPostData = async (id: string): Promise<PostData> => {
  // Parse post metadata
  const matterResult = matter(getFileContents(projectsDirectory, id));

  // Convert markdown to HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    metaData: matterResult.data,
  };
};

export const getAllPostIds = () => {
  const fileNames = fs.readdirSync(projectsDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
};

export const getPostInfo = (): BlogPostInfo[] => {
  const fileNames = fs.readdirSync(projectsDirectory);

  const allPostsInfo = fileNames.map((fileName) => {
    // set filename without extensino as id
    const id = fileName.replace(/\.md$/, '');
    const matterResult = matter(getFileContents(projectsDirectory, id));
    const {
      data: { title, date, image_filename },
    } = matterResult;
    return {
      id,
      date,
      title,
      image_filename,
    };
  });

  return allPostsInfo;
};
