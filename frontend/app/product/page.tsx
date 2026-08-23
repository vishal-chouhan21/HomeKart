import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  inStock: boolean;
}

const STATIC_PRODUCTS: Product[] = [
  {
    id: "prod_1",
    name: "Wireless Noise-Canceling Headphones",
    category: "Audio",
    price: 249.99,
    rating: 4.8,
    reviewsCount: 128,
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    inStock: true,
  },
  {
    id: "prod_2",
    name: "Minimalist Mechanical Keyboard",
    category: "Accessories",
    price: 119.5,
    rating: 4.6,
    reviewsCount: 84,
    imageUrl:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80",
    inStock: true,
  },
  {
    id: "prod_3",
    name: "Smart Fitness & Health Watch",
    category: "Wearables",
    price: 179.0,
    rating: 4.7,
    reviewsCount: 215,
    imageUrl:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    inStock: false,
  },
  {
    id: "prod_4",
    name: "Classic Leather Minimalist Wallet",
    category: "Lifestyle",
    price: 45.0,
    rating: 4.9,
    reviewsCount: 92,
    imageUrl:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
    inStock: true,
  },
  {
    id: "prod_5",
    name: "Anodized Aluminum Water Bottle",
    category: "Lifestyle",
    price: 28.0,
    rating: 4.5,
    reviewsCount: 64,
    imageUrl:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80",
    inStock: true,
  },
  {
    id: "prod_6",
    name: "Vintage 35mm Film Camera",
    category: "Photography",
    price: 320.0,
    rating: 4.9,
    reviewsCount: 47,
    imageUrl:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80",
    inStock: true,
  },
];

const ProductsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Featured Products | Store</title>
        <meta
          name="description"
          content="Explore our handpicked collection of premium gear."
        />
      </Head>

      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="border-b border-gray-200 pb-6 mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                Featured Gear
              </h1>
              <p className="mt-2 text-sm text-gray-500">
                Explore our curated collection of everyday essentials.
              </p>
            </div>
            <span className="text-sm font-medium text-gray-500">
              {STATIC_PRODUCTS.length} Products Available
            </span>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {STATIC_PRODUCTS.map((product) => (
              <div
                key={product.id}
                className="group relative flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
              >
                {/* Image Container */}
                <div className="relative aspect-square w-full bg-gray-100 overflow-hidden">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  {!product.inStock && (
                    <span className="absolute top-3 left-3 bg-gray-900/80 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                      Out of Stock
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold tracking-wider text-indigo-600 uppercase">
                      {product.category}
                    </span>
                    <h2 className="mt-1.5 text-base font-semibold text-gray-900 line-clamp-1">
                      {product.name}
                    </h2>

                    {/* Rating */}
                    <div className="mt-2 flex items-center gap-1.5 text-sm text-gray-500">
                      <span className="text-amber-400 font-bold">★</span>
                      <span className="font-medium text-gray-800">
                        {product.rating}
                      </span>
                      <span>({product.reviewsCount})</span>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">
                      ${product.price.toFixed(2)}
                    </span>
                    <Link
                      href={`/products/${product.id}`}
                      className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm"
                    >
                      View Product
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default ProductsPage;
