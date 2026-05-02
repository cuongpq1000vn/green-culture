"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getStrapiImageProps } from "@/lib/strapi/utils/media";
import type { Facility } from "@/lib/strapi/types";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface SectionHeader {
  badge?: string;
  title: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
}

interface FacilitiesProps {
  data?: Facility[];
  sectionHeader?: SectionHeader;
}

const defaultFacilities = [
  {
    id: 1,
    title: "Processing Plant",
    description: "State-of-the-art rice milling and processing facility",
    image: "/images/facility-1.jpg",
    order: 1,
  },
  {
    id: 2,
    title: "Storage Facility",
    description: "Climate-controlled storage warehouses",
    image: "/images/facility-2.jpg",
    order: 2,
  },
  {
    id: 3,
    title: "Quality Control Lab",
    description: "Advanced testing and quality assurance laboratory",
    image: "/images/facility-1.jpg",
    order: 3,
  },
];

const defaultSectionHeader: SectionHeader = {
  badge: "Our Processing Facilities",
  title: "Integrated Facilities for Export-Ready Products",
  description: "Our modern facilities combine traditional expertise with advanced technology, featuring practical infrastructure designed to support export-ready standards.",
  buttonText: "Learn More",
};

export function Facilities({ data, sectionHeader }: FacilitiesProps = {}) {
  // Use fallback if data is undefined, null, or empty array
  const displayFacilities = data && data.length > 0 ? data : defaultFacilities;
  const header = sectionHeader || defaultSectionHeader;
  return (
    <section id="factory" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full border border-foreground/20 text-sm text-foreground/70 mb-4">
              {header.badge}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
              {header.title}
            </h2>
            <p className="text-foreground/70 leading-relaxed mb-8">
              {header.description}
            </p>
            <Button className="bg-[#F5A623] hover:bg-[#D4911E] text-foreground font-semibold rounded-full px-8">
              {header.buttonText}
            </Button>
          </motion.div>

          {/* Image Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <Swiper
              modules={[Autoplay, Navigation, Pagination]}
              spaceBetween={20}
              slidesPerView={1}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              className="rounded-2xl overflow-hidden"
            >
              {displayFacilities.map((facility) => (
                <SwiperSlide key={facility.id || facility.title}>
                  <div className="relative h-80 lg:h-[400px]">
                    {facility.image && typeof facility.image === 'object' && 'url' in facility.image ? (
                      <Image
                        {...getStrapiImageProps(facility.image, {
                          quality: 85,
                          fill: true,
                        })}
                        alt={facility.image.alternativeText || facility.title}
                        className="object-cover"
                      />
                    ) : (
                      <Image
                        src={typeof facility.image === 'string' ? facility.image : '/images/facility-1.jpg'}
                        alt={facility.title}
                        fill
                        className="object-cover"
                      />
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                      <h3 className="text-white font-semibold text-lg">
                        {facility.title}
                      </h3>
                      {facility.description && (
                        <p className="text-white/80 text-sm mt-1">
                          {facility.description}
                        </p>
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
