import { Products } from '@/components/landing/products';
import { getProducts, getFeaturedProducts } from '@/lib/strapi/queries/products';

interface ProductsCMSProps {
  /**
   * When true, shows only featured products (for homepage)
   * When false or omitted, shows all products (for products page)
   */
  featuredOnly?: boolean;
}

/**
 * Products CMS Wrapper Component
 * Server component that fetches products data from Strapi and renders Products component
 */
export async function ProductsCMS({ featuredOnly = false }: ProductsCMSProps) {
  const products = featuredOnly 
    ? await getFeaturedProducts()
    : await getProducts();
  
  return <Products data={products} />;
}