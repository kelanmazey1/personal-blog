export interface BlogPost {
  id: string;
  date: string;
  title: string;
  image_filename: string;
  content: string;
}

export type BlogPostInfo = Omit<BlogPost, 'content'>;
