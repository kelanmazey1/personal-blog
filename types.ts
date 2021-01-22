export interface BlogPost {
  id: string;
  date: string;
  title: string;
  content: string;
}

export type BlogPostInfo = Omit<BlogPost, 'content'>;
