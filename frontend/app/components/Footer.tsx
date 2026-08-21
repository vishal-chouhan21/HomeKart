"use client";

import Link from "next/link";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#24211E] text-[#FAF7F2] pt-16 pb-12 border-t border-[#3D3833]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Newsletter Subscription Banner */}
        <div className="border-b border-white/10 pb-16 mb-16 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#B3ABA0] font-semibold">
              Stay Connected
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif mt-1">
              Join our small batch newsletter
            </h3>
            <p className="text-sm text-[#B3ABA0] mt-2">
              Receive 10% off your first order plus early access to limited
              seasonal drops.
            </p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              placeholder="Enter your email address"
              className="bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-white flex-1"
              required
            />
            <button
              type="submit"
              className="bg-[#FAF7F2] hover:bg-white text-[#24211E] px-6 py-3 rounded-lg text-sm font-medium transition"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 text-sm">
          <div>
            <h4 className="font-serif text-lg mb-4">Artisan Collective</h4>
            <p className="text-xs text-[#B3ABA0] leading-relaxed">
              Thoughtfully curated handmade goods, consciously crafted in small
              batches.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-xs uppercase tracking-widest text-[#B3ABA0] mb-4">
              Shop
            </h4>
            <ul className="space-y-2.5 text-[#D1C9BE]">
              <li>
                <Link href="#products" className="hover:text-white transition">
                  All Goods
                </Link>
              </li>
              <li>
                <Link
                  href="/category/candles"
                  className="hover:text-white transition"
                >
                  Candles
                </Link>
              </li>
              <li>
                <Link
                  href="/category/ceramics"
                  className="hover:text-white transition"
                >
                  Ceramics
                </Link>
              </li>
              <li>
                <Link
                  href="/category/apothecary"
                  className="hover:text-white transition"
                >
                  Apothecary
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-xs uppercase tracking-widest text-[#B3ABA0] mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-[#D1C9BE]">
              <li>
                <Link href="#our-story" className="hover:text-white transition">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/journal" className="hover:text-white transition">
                  Journal
                </Link>
              </li>
              <li>
                <Link
                  href="/sustainability"
                  className="hover:text-white transition"
                >
                  Sustainability
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-xs uppercase tracking-widest text-[#B3ABA0] mb-4">
              Help
            </h4>
            <ul className="space-y-2.5 text-[#D1C9BE]">
              <li>
                <Link href="/shipping" className="hover:text-white transition">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#B3ABA0]">
          <p>
            &copy; {new Date().getFullYear()} Artisan Collective. All rights
            reserved.
          </p>
          <div className="flex gap-4">
            {/* Instagram SVG */}
            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-white transition"
            >
              <svg
                className="w-4 h-4 fill-none stroke-current stroke-2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>

            {/* Facebook SVG */}
            <a
              href="#"
              aria-label="Facebook"
              className="hover:text-white transition"
            >
              <svg
                className="w-4 h-4 fill-none stroke-current stroke-2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>

            {/* Email Icon */}
            <a
              href="mailto:hello@artisancollective.com"
              aria-label="Email"
              className="hover:text-white transition"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
