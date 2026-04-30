"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import { getStrapiImageUrl } from "@/lib/strapi/utils/media";
import type { Product } from "@/lib/strapi/types";

interface ProductsProps {
  data?: Product[];
}

// Helper to normalize product data from CMS or fallback
function normalizeProduct(product: Product | DefaultProduct): NormalizedProduct {
  const title = 'title' in product && product.title ? product.title : 
                'name' in product && product.name ? product.name : 'Product';
  
  const categoryName = typeof product.category === 'string' 
    ? product.category 
    : product.category?.name || 'General';
  
  let imageUrl: string;
  if (typeof product.image === 'string' && product.image) {
    imageUrl = product.image;
  } else if (product.image?.url) {
    const strapiUrl = getStrapiImageUrl(product.image);
    imageUrl = strapiUrl || '/images/rice-varieties.jpg'; // Fallback if empty
  } else {
    // Use a default image that exists based on product type/category
    const productId = 'id' in product ? product.id : '';
    if (productId.toLowerCase().includes('rice')) {
      imageUrl = '/images/rice-varieties.jpg';
    } else if (productId.toLowerCase().includes('coffee')) {
      imageUrl = '/images/coffee-beans.jpg';
    } else if (productId.toLowerCase().includes('mango')) {
      imageUrl = '/images/tropical-mango.jpg';
    } else if (productId.toLowerCase().includes('cassava')) {
      imageUrl = '/images/cassava-roots.jpg';
    } else {
      imageUrl = '/images/rice-varieties.jpg'; // Default fallback
    }
  }
  
  const imageAlt = typeof product.image === 'object' && product.image?.alternativeText
    ? product.image.alternativeText
    : title;

  // Normalize certifications - can be string[] or Certification[]
  const certifications = (product.certifications || []).map((cert: any) => 
    typeof cert === 'string' ? cert : cert?.name || ''
  ).filter(Boolean);

  // Normalize varieties - can be string[] or array of objects
  const varieties = (product.varieties || []).map((v: any) =>
    typeof v === 'string' ? v : v?.name || ''
  ).filter(Boolean);

  // Generate a stable id from available data
  const productId = product.id != null ? String(product.id) : 
                    ('slug' in product && product.slug) ? product.slug :
                    title.toLowerCase().replace(/\s+/g, '-');

  return {
    id: productId,
    slug: 'slug' in product && product.slug ? product.slug : productId,
    title,
    description: product.description || '',
    image: imageUrl,
    imageAlt,
    category: categoryName,
    varieties,
    certifications,
    packaging: product.packaging || '',
  };
}

interface NormalizedProduct {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  category: string;
  varieties: string[];
  certifications: string[];
  packaging: string;
}

interface DefaultProduct {
  id: string;
  title: string;
  description: string;
  image: string;
  varieties: string[];
  certifications: string[];
  packaging: string;
  category: string;
}

const defaultProducts = [
  {
    id: "rice",
    title: "Premium Rice",
    description: "High-quality Vietnamese rice varieties including fragrant jasmine and premium long-grain rice, carefully processed to maintain nutritional value and authentic taste.",
    image: "/images/rice-varieties.jpg",
    varieties: ["Jasmine Rice", "Long-grain Rice", "Short-grain Rice", "Brown Rice"],
    certifications: ["Organic Certified", "Fair Trade", "ISO 22000"],
    packaging: "5kg, 10kg, 25kg, 50kg bags",
    category: "Grains"
  },
  {
    id: "coffee",
    title: "Arabica Coffee",
    description: "Premium Vietnamese coffee beans sourced from highland regions, offering rich aroma and exceptional flavor profile for coffee enthusiasts worldwide.",
    image: "/images/coffee-beans.jpg",
    varieties: ["Robusta", "Arabica", "Specialty Blend", "Instant Coffee"],
    certifications: ["Rainforest Alliance", "UTZ Certified", "Organic"],
    packaging: "250g, 500g, 1kg bags",
    category: "Beverages"
  },
  {
    id: "mango",
    title: "Tropical Mango",
    description: "Fresh tropical mangoes cultivated in optimal growing conditions, delivering sweet, juicy fruit that meets international quality standards.",
    image: "/images/tropical-mango.jpg",
    varieties: ["Kent Mango", "Tommy Atkins", "Haden", "Keitt"],
    certifications: ["GlobalGAP", "Organic", "HACCP"],
    packaging: "4kg, 6kg, 10kg cartons",
    category: "Fruits"
  },
  {
    id: "cassava",
    title: "Cassava Products",
    description: "Versatile cassava products including fresh roots, dried chips, and starch, processed using modern techniques to ensure quality and shelf life.",
    image: "/images/cassava-roots.jpg",
    varieties: ["Fresh Cassava", "Cassava Chips", "Cassava Starch", "Tapioca"],
    certifications: ["HACCP", "ISO 22000", "BRC Food"],
    packaging: "20kg, 25kg, 50kg bags",
    category: "Roots & Tubers"
  }
];

export function Products({ data }: ProductsProps = {}) {
  // Use fallback if data is undefined, null, or empty array
  const rawProducts = data && data.length > 0 ? data : defaultProducts;
  const products = rawProducts.map(p => normalizeProduct(p as Product | DefaultProduct));
  
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Our Premium Products
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our range of high-quality agricultural products, sourced from Vietnam&apos;s finest farms 
            and processed to meet international standards.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {products.map((product, index) => (
            <motion.div
              key={product.id || `product-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 h-full">
                <div className="aspect-[16/10] relative overflow-hidden">
                  {product.image && (
                    <Image
                      src={product.image}
                      alt={product.imageAlt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-[#F5A623] text-foreground">
                      {product.category}
                    </Badge>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    {product.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 line-clamp-3">
                    {product.description}
                  </p>

                  {/* Varieties */}
                  {product.varieties.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-foreground mb-2">Varieties</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.varieties.slice(0, 3).map((variety, vIndex) => (
                        <Badge key={variety || `variety-${vIndex}`} variant="outline" className="text-xs">
                          {variety}
                        </Badge>
                      ))}
                      {product.varieties.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{product.varieties.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  )}

                  {/* Certifications */}
                  {product.certifications.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-foreground mb-2">Certifications</h4>
                    <div className="flex items-start gap-2">
                      {product.certifications.slice(0, 2).map((cert, cIndex) => (
                        <div key={cert || `cert-${cIndex}`} className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3 text-[#C4880A]" />
                          <span className="text-xs text-muted-foreground">{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  )}

                  {/* Packaging */}
                  {product.packaging && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-foreground mb-1">Packaging</h4>
                    <p className="text-xs text-muted-foreground">{product.packaging}</p>
                  </div>
                  )}

                  {/* CTA Button */}
                  <Button 
                    asChild
                    className="w-full bg-[#F5A623] hover:bg-[#D4911E] text-foreground font-semibold"
                  >
                    <Link href={`/products#${product.slug || product.id}`} className="inline-flex items-center justify-center gap-2">
                      Learn More
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quality Assurance Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-background to-[#FFF8E7] rounded-2xl p-8 md:p-12 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
            Quality Assurance Guarantee
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
            Every product undergoes rigorous quality control processes and meets international food safety standards. 
            We're committed to delivering only the finest agricultural products to our global partners.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {["ISO 22000", "HACCP", "GlobalGAP", "Organic Certified"].map((standard) => (
              <div key={standard} className="flex items-center gap-2 bg-white/50 px-4 py-2 rounded-full">
                <CheckCircle className="h-5 w-5 text-[#C4880A]" />
                <span className="font-medium text-foreground">{standard}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}