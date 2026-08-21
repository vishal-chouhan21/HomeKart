import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full h-[620px] sm:h-[720px] flex items-center justify-center bg-[#2B231D] overflow-hidden">
      {/* Background Image with Warm Lighting */}
      <Image
        src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=2000&auto=format&fit=crop"
        alt="Artisan crafting ceramics and homemade goods in a sunlit studio workshop"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-85"
      />

      {/* Subtle Vignette / Contrast Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20" />

      {/* Center Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white flex flex-col items-center">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-normal leading-[1.15] tracking-tight">
          Thoughtfully Made, <br />
          Beautifully Simple.
        </h1>

        <p className="mt-6 text-base sm:text-lg md:text-xl text-white/90 max-w-2xl font-light leading-relaxed">
          Discover unique handcrafted goods for your home and lifestyle, crafted
          in small batches with love and intention.
        </p>

        {/* Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-row items-center gap-4">
          <Link
            href="#products"
            className="bg-[#FAF7F2] hover:bg-white text-[#24211E] font-medium text-sm sm:text-base px-8 py-3.5 rounded-lg transition shadow-md"
          >
            Shop Now
          </Link>
          <Link
            href="#our-story"
            className="border border-white/80 hover:bg-white/10 text-white font-medium text-sm sm:text-base px-8 py-3.5 rounded-lg transition backdrop-blur-xs"
          >
            Our Story
          </Link>
        </div>
      </div>
    </section>
  );
}
