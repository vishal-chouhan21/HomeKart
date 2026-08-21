import Image from "next/image";
import {
  Sparkles,
  ShieldCheck,
  Leaf,
  HeartHandshake,
  Star,
} from "lucide-react";

const products = [
  {
    id: 1,
    name: "Wild Soy Candle",
    category: "Aromatherapy",
    price: "$28.00",
    rating: 5.0,
    reviews: 44,
    image:
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Botanical Herbal Face Elixir",
    category: "Skincare",
    price: "$42.00",
    rating: 4.9,
    reviews: 62,
    image:
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Handmade Stoneware Cup",
    category: "Ceramics",
    price: "$34.00",
    rating: 5.0,
    reviews: 18,
    image:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop",
  },
];

export default function FeaturedProducts() {
  return (
    <>
      {/* Values Bar */}
      <div className="bg-[#FAF7F2] border-b border-[#EDE6DC] py-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center text-[#4A453E]">
          <div className="flex flex-col items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-[#24211E]" />
            <span className="text-sm font-medium">Small-Batch Production</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Leaf className="w-5 h-5 text-[#24211E]" />
            <span className="text-sm font-medium">Sustainably Sourced</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#24211E]" />
            <span className="text-sm font-medium">Artisan Crafted</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#24211E]" />
            <span className="text-sm font-medium">Plastic-Free Shipping</span>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <section id="products" className="py-24 bg-[#FAF7F2] text-[#24211E]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#7A7268] font-semibold">
                Small Batch Releases
              </p>
              <h2 className="text-3xl sm:text-4xl font-serif mt-1">
                Featured Goods
              </h2>
            </div>
            <a
              href="#"
              className="text-sm font-medium text-[#24211E] underline underline-offset-4"
            >
              View All &rarr;
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((item) => (
              <div
                key={item.id}
                className="group flex flex-col bg-white border border-[#EDE6DC] rounded-xl overflow-hidden shadow-xs hover:shadow-md transition"
              >
                <div className="relative aspect-4/3 w-full bg-[#EAE3D9] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs uppercase text-[#7A7268] tracking-wider">
                      {item.category}
                    </span>
                    <h3 className="font-serif text-lg text-[#24211E] mt-1">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-1 mt-2 text-[#C48B3F]">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-xs font-medium text-[#24211E]">
                        {item.rating}
                      </span>
                      <span className="text-xs text-[#7A7268]">
                        ({item.reviews})
                      </span>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-between pt-4 border-t border-[#F3EFE9]">
                    <span className="font-semibold text-lg">{item.price}</span>
                    <button className="bg-[#24211E] hover:bg-[#3D3A35] text-white text-sm px-4 py-2 rounded-md font-medium transition">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
