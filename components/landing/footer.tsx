"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Linkedin, Mail, Phone } from "lucide-react";
import { getStrapiImageProps } from "@/lib/strapi/utils/media";
import type { Navigation, SiteSettings } from "@/lib/strapi/types";

interface FooterProps {
  navigation?: Navigation;
  siteSettings?: SiteSettings;
}

const defaultFooterLinks = {
  company: [
    { id: 1, label: "About Us", href: "/about", openInNewTab: false },
    { id: 2, label: "Our Products", href: "/products", openInNewTab: false },
    { id: 3, label: "Processing Facilities", href: "/factory", openInNewTab: false },
    { id: 4, label: "News & Updates", href: "/news", openInNewTab: false },
  ],
  products: [
    { id: 5, label: "Rice", href: "/products#rice", openInNewTab: false },
    { id: 6, label: "Coffee", href: "/products#coffee", openInNewTab: false },
    { id: 7, label: "Mango", href: "/products#mango", openInNewTab: false },
    { id: 8, label: "Cassava", href: "/products#cassava", openInNewTab: false },
  ],
  contact: [
    { id: 9, label: "Contact Us", href: "#contact", openInNewTab: false },
    { id: 10, label: "Partnership Inquiry", href: "#partnership", openInNewTab: false },
    { id: 11, label: "Export Information", href: "#export", openInNewTab: false },
  ],
};

export function Footer({ navigation, siteSettings }: FooterProps = {}) {
  const footerLinks = {
    company: navigation?.footerCompanyLinks || defaultFooterLinks.company,
    products: navigation?.footerProductLinks || defaultFooterLinks.products,
    contact: navigation?.footerContactLinks || defaultFooterLinks.contact,
  };
  return (
    <footer className="bg-[#1a1a1a] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <Link href="/" className="inline-block mb-6">
              {siteSettings?.footerLogo || siteSettings?.logo ? (
                <Image
                  {...getStrapiImageProps(siteSettings.footerLogo || siteSettings.logo, {
                    width: 100,
                    height: 100,
                    quality: 85,
                  })}
                  alt={(siteSettings.footerLogo || siteSettings.logo).alternativeText || siteSettings.siteName || "Logo"}
                  className="object-contain rounded-lg"
                />
              ) : (
                <Image
                  src="/images/logo.jpg"
                  alt="EGO Logo"
                  width={100}
                  height={100}
                  className="object-contain rounded-lg"
                />
              )}
            </Link>
            <p className="text-white/60 text-sm leading-relaxed">
              {siteSettings?.companyDescription || "Leading agricultural export company specializing in high-quality rice processing and international trade."}
            </p>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.id || link.label}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-[#F5A623] transition-colors text-sm"
                    {...(link.openInNewTab && { target: "_blank", rel: "noopener noreferrer" })}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Products Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-semibold text-lg mb-4">Products</h3>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.id || link.label}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-[#F5A623] transition-colors text-sm"
                    {...(link.openInNewTab && { target: "_blank", rel: "noopener noreferrer" })}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="font-semibold text-lg mb-4">Get in Touch</h3>
            <ul className="space-y-3">
              {footerLinks.contact.map((link) => (
                <li key={link.id || link.label}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-[#F5A623] transition-colors text-sm"
                    {...(link.openInNewTab && { target: "_blank", rel: "noopener noreferrer" })}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Large Logo Background */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.05 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex justify-center mt-16"
        >
          <Image
            src="/images/logo.jpg"
            alt="EGO"
            width={400}
            height={200}
            className="object-contain opacity-20 grayscale"
          />
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <Link
                href="#"
                className="p-2 rounded-full border border-white/20 hover:border-[#F5A623] hover:text-[#F5A623] transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="p-2 rounded-full border border-white/20 hover:border-[#F5A623] hover:text-[#F5A623] transition-colors"
              >
                <Mail className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="p-2 rounded-full border border-white/20 hover:border-[#F5A623] hover:text-[#F5A623] transition-colors"
              >
                <Phone className="h-4 w-4" />
              </Link>
            </div>
            <p className="text-white/40 text-sm">
              Copyright @ 2025 | EGO Agricultural Export | All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
