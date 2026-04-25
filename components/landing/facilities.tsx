"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const facilities = [
  {
    image: "/images/facility-1.jpg",
    title: "Processing Plant",
  },
  {
    image: "/images/facility-2.jpg",
    title: "Storage Facility",
  },
  {
    image: "/images/facility-1.jpg",
    title: "Quality Control Lab",
  },
];

export function Facilities() {
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
              Our Processing Facilities
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
              Integrated Facilities for Export-Ready Products
            </h2>
            <p className="text-foreground/70 leading-relaxed mb-8">
              Our modern facilities combine traditional expertise with advanced
              technology, featuring practical infrastructure designed to support
              export-ready standards.
            </p>
            <Button className="bg-[#a3d977] hover:bg-[#8bc55f] text-foreground font-semibold rounded-full px-8">
              Learn More
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
              {facilities.map((facility) => (
                <SwiperSlide key={facility.title}>
                  <div className="relative h-80 lg:h-[400px]">
                    <Image
                      src={facility.image}
                      alt={facility.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                      <h3 className="text-white font-semibold text-lg">
                        {facility.title}
                      </h3>
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
