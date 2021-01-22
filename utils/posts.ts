import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import html from 'remark-html';
import remark from 'remark';

import { BlogPostInfo } from '../types';

interface postData {
  id: string;
  contentHtml: string;
  grayMatterData: { [key: string]: any };
}

const postsDirectory = path.join(process.cwd(), 'posts');

// Helper to extract file contents from markdown
const getFileContents = (directory: string, fileName: string): string => {
  const fullPath = path.join(directory, `${fileName}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  return fileContents;
};

export const getPostData = async (id: string): Promise<postData> => {
  // Parse post metadata
  const matterResult = matter(getFileContents(postsDirectory, id));

  // Convert markdown to HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    grayMatterData: matterResult.data,
  };
};

export const getPostInfo = (): BlogPostInfo[] => {
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsInfo = fileNames.map((fileName) => {
    // set filename without extensino as id
    const id = fileName.replace(/\.md$/, '');
    const matterResult = matter(getFileContents(postsDirectory, id));
    const {
      data: { title, date },
    } = matterResult;
    return {
      id,
      date,
      title,
    };
  });

  return allPostsInfo;
};
