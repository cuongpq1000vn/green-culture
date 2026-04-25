"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Linkedin, Mail, Phone } from "lucide-react";

const footerLinks = {
  company: [
    { label: "About Us", href: "#about" },
    { label: "Our Products", href: "#products" },
    { label: "Processing Facilities", href: "#factory" },
    { label: "News & Updates", href: "#news" },
  ],
  products: [
    { label: "Rice", href: "#rice" },
    { label: "Coffee", href: "#coffee" },
    { label: "Mango", href: "#mango" },
    { label: "Cassava", href: "#cassava" },
  ],
  contact: [
    { label: "Contact Us", href: "#contact" },
    { label: "Partnership Inquiry", href: "#partnership" },
    { label: "Export Information", href: "#export" },
  ],
};

export function Footer() {
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
              <Image
                src="/images/logo.jpg"
                alt="EGO Logo"
                width={100}
                height={100}
                className="object-contain rounded-lg"
              />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed">
              Leading agricultural export company specializing in high-quality
              rice processing and international trade.
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
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-[#a3d977] transition-colors text-sm"
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
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-[#a3d977] transition-colors text-sm"
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
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-[#a3d977] transition-colors text-sm"
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
                className="p-2 rounded-full border border-white/20 hover:border-[#a3d977] hover:text-[#a3d977] transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="p-2 rounded-full border border-white/20 hover:border-[#a3d977] hover:text-[#a3d977] transition-colors"
              >
                <Mail className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="p-2 rounded-full border border-white/20 hover:border-[#a3d977] hover:text-[#a3d977] transition-colors"
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
