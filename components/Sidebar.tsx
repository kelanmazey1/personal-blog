import ContactLinks from './ContactLinks';
import { BlogPostInfo } from '../types';

interface SidebarProps {
  blogPostInfo: BlogPostInfo[];
}

const Sidebar = ({ blogPostInfo }: SidebarProps) => {
  return (
    <div>
      <ContactLinks />
      <h3>Blogs</h3>
      <ul>
        {blogPostInfo.map(({ title, id }) => (
          <li key={id}>{title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
