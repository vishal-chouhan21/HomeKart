import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "Ceramics & Tableware",
    count: "18 Products",
    image:
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=800&auto=format&fit=crop",
    href: "/category/ceramics",
  },
  {
    name: "Aromatherapy & Candles",
    count: "12 Products",
    image:
      "https://images.unsplash.com/photo-1596433809252-260c2745dfdd?q=80&w=800&auto=format&fit=crop",
    href: "/category/candles",
  },
  {
    name: "Organic Apothecary",
    count: "15 Products",
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop",
    href: "/category/apothecary",
  },
];

export default function Categories() {
  return (
    <section id="categories" className="py-20 bg-[#FAF7F2] text-[#24211E]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest text-[#7A7268] font-semibold">
            Explore Collections
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif mt-1">
            Shop by Category
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="group relative h-96 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-end p-6 text-white"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
              <div className="relative z-10 space-y-1">
                <span className="text-xs text-white/80 uppercase tracking-wider">
                  {cat.count}
                </span>
                <h3 className="font-serif text-2xl group-hover:translate-x-1 transition-transform">
                  {cat.name} &rarr;
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
