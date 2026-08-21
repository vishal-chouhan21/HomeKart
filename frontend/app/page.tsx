import Hero from "./components/Hero";
import FeaturedProducts from "./components/FeaturedProduct";
import Categories from "./components/Categories";
import MakerStory from "./components/MakerStory";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <main>
        <Hero />
        <FeaturedProducts />
        <Categories />
        <MakerStory />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
