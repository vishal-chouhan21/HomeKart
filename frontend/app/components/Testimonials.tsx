import { Star, Quote } from "lucide-react";

const reviews = [
  {
    id: 1,
    quote:
      "The soy candle fills the entire living room with the most calming lavender scent. You can immediately tell it was made with pure essential oils.",
    author: "Elena R.",
    product: "Wild Soy Candle",
    location: "Verified Buyer",
  },
  {
    id: 2,
    quote:
      "The ceramic mug has become an essential part of my morning routine. The texture and weight feel so sturdy and grounding in the hand.",
    author: "Marcus T.",
    product: "Stoneware Cup",
    location: "Verified Buyer",
  },
  {
    id: 3,
    quote:
      "Packaging was entirely plastic-free and arrived beautifully wrapped. Outstanding attention to detail and craftsmanship.",
    author: "Sarah L.",
    product: "Herbal Elixir",
    location: "Verified Buyer",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-[#FAF7F2] border-t border-[#EDE6DC] text-[#24211E]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#7A7268] font-semibold">
            From Our Community
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif mt-1">
            Loved in Homes Everywhere
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white border border-[#EDE6DC] rounded-2xl p-8 flex flex-col justify-between shadow-xs"
            >
              <div>
                <Quote className="w-8 h-8 text-[#C2B7A8] mb-4 opacity-50" />
                <div className="flex text-[#C48B3F] mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-[#4A453E] text-sm sm:text-base leading-relaxed italic">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-[#F3EFE9]">
                <p className="font-semibold text-sm text-[#24211E]">
                  {rev.author}
                </p>
                <p className="text-xs text-[#7A7268]">
                  Purchased: {rev.product}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
