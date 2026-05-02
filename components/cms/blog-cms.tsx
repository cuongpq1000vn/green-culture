import { Blog } from '@/components/landing/blog';
import { getRecentBlogPosts, getBlogPosts } from '@/lib/strapi/queries/blog';

interface BlogCMSProps {
  limit?: number;
}

/**
 * Blog CMS Wrapper Component
 * Server component that fetches blog posts data from Strapi and renders Blog component
 * @param limit - Number of posts to show (default: 3 for landing page preview, undefined for all)
 */
export async function BlogCMS({ limit }: BlogCMSProps = {}) {
  const blogPosts = limit ? await getRecentBlogPosts(limit) : await getBlogPosts();
  
  return <Blog data={blogPosts} />;
}