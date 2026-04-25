"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Quote } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    quote:
      "EGO has been our trusted rice supplier for over 5 years. Their consistent quality and reliable delivery have been crucial for our distribution business.",
    author: "Ahmed Al-Rashid",
    company: "Gulf Food Distributors",
    country: "UAE",
  },
  {
    quote:
      "The quality control standards at EGO are impressive. Every shipment meets our strict specifications, making them our preferred partner for premium rice imports.",
    author: "Chen Wei Ming",
    company: "Asia Pacific Trading Co.",
    country: "China",
  },
  {
    quote:
      "Working with EGO has streamlined our supply chain significantly. Their professional approach and transparent communication make partnership easy.",
    author: "Maria Santos",
    company: "Pacific Grain Imports",
    country: "Philippines",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full border border-foreground/20 text-sm text-foreground/70 mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            What Our Partners Say
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.author}>
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-border h-full">
                  <Quote className="h-8 w-8 text-[#a3d977] mb-4" />
                  <p className="text-foreground/70 leading-relaxed mb-6 italic">
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <div>
                    <p className="font-semibold text-foreground">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-foreground/60">
                      {testimonial.company} · {testimonial.country}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
