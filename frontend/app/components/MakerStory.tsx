import Image from "next/image";
import Link from "next/link";

export default function MakerStory() {
  return (
    <section
      id="our-story"
      className="py-24 bg-white border-t border-[#EDE6DC] text-[#24211E]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Studio Image */}
        <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-md bg-[#EAE3D9]">
          <Image
            src="https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop"
            alt="Artisan crafting ceramics in a workshop"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        {/* Story Text */}
        <div className="space-y-6">
          <span className="text-xs uppercase tracking-widest text-[#7A7268] font-semibold">
            Our Philosophy
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-normal leading-snug">
            Honest goods born from patience and organic craft.
          </h2>
          <p className="text-[#5B554E] leading-relaxed text-base sm:text-lg">
            Every piece we produce begins with natural, sustainably sourced
            materials. We reject mass manufacturing to preserve the time-honored
            integrity of handcrafted goods.
          </p>
          <p className="text-[#5B554E] leading-relaxed text-sm sm:text-base">
            From hand-poured botanical candles to wheel-thrown stoneware, each
            creation carries the unique touch and character of its maker.
          </p>
          <div className="pt-2">
            <Link
              href="/story"
              className="inline-block border-b border-[#24211E] pb-1 text-[#24211E] font-medium hover:text-[#7A7268] hover:border-[#7A7268] transition"
            >
              Read Our Full Journey &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
