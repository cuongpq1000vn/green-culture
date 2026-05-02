"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getStrapiImageProps } from "@/lib/strapi/utils/media";
import type { Navigation, SiteSettings } from "@/lib/strapi/types";

interface HeaderProps {
  siteSettings?: SiteSettings;
  navigation?: Navigation;
}

// Fallback navigation when CMS data is not available
const defaultNavItems = [
  { id: 1, label: "Home", href: "/", children: [] },
  { id: 2, label: "About Us", href: "/about", children: [] },
  {
    id: 3,
    label: "Products",
    href: "/products",
    children: [
      { id: 31, label: "Rice", href: "/products#rice", icon: "", openInNewTab: false },
      { id: 32, label: "Coffee", href: "/products#coffee", icon: "", openInNewTab: false },
      { id: 33, label: "Mango", href: "/products#mango", icon: "", openInNewTab: false },
      { id: 34, label: "Cassava", href: "/products#cassava", icon: "", openInNewTab: false },
    ],
  },
  { id: 4, label: "Factory", href: "/factory", children: [] },
  { id: 5, label: "News", href: "/news", children: [] },
];

export function Header({ siteSettings, navigation }: HeaderProps = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  // Use CMS navigation data or fallback to default
  const navItems = navigation?.mainNav || defaultNavItems;

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            {siteSettings?.logo ? (
              <Image
                {...getStrapiImageProps(siteSettings.logo, {
                  width: 60,
                  height: 60,
                  quality: 85,
                })}
                alt={siteSettings.logo.alternativeText || siteSettings.siteName || "Logo"}
                className="object-contain"
              />
            ) : (
              <Image
                src="/images/logo.jpg"
                alt="EGO Logo"
                width={60}
                height={60}
                className="object-contain"
              />
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <div
                key={item.id || item.label}
                className="relative"
                onMouseEnter={() => item.children && item.children.length > 0 && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-[#F5A623]"
                      : "text-foreground/80 hover:text-[#C4880A]"
                  }`}
                >
                  {item.label}
                  {item.children && item.children.length > 0 && (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Link>

                {/* Dropdown */}
                <AnimatePresence>
                  {item.children && item.children.length > 0 && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-border overflow-hidden"
                    >
                      {item.children.map((subItem) => (
                        <Link
                          key={subItem.id || subItem.label}
                          href={subItem.href}
                          className="block px-4 py-3 text-foreground/80 hover:bg-secondary hover:text-[#C4880A] transition-colors"
                          {...(subItem.openInNewTab && { target: "_blank", rel: "noopener noreferrer" })}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Contact Button */}
          <Button
            className="hidden lg:flex bg-[#F5A623] hover:bg-[#D4911E] text-foreground font-semibold rounded-full px-6"
          >
            Contact Us
          </Button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-foreground"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-border"
          >
            <nav className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <div key={item.id || item.label}>
                  <Link
                    href={item.href}
                    className={`block py-2 font-medium transition-colors ${
                      isActive(item.href)
                        ? "text-[#F5A623]"
                        : "text-foreground/80 hover:text-[#C4880A]"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.children && item.children.length > 0 && (
                    <div className="pl-4 space-y-1">
                      {item.children.map((subItem) => (
                        <Link
                          key={subItem.id || subItem.label}
                          href={subItem.href}
                          className="block py-1 text-sm text-foreground/60 hover:text-[#C4880A] transition-colors"
                          onClick={() => setIsOpen(false)}
                          {...(subItem.openInNewTab && { target: "_blank", rel: "noopener noreferrer" })}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Button className="w-full mt-4 bg-[#F5A623] hover:bg-[#D4911E] text-foreground font-semibold rounded-full">
                Contact Us
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
