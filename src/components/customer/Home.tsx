import HeroSection from '../../components/customer/home/HeroSection';
import FeaturedCategories from '../../components/customer/home/FeaturedCategories';
import FeaturedProducts from '../../components/customer/home/FeaturedProducts';
import FeaturedBrands from '../../components/customer/home/FeaturedBrands';
import NewsletterSection from '../../components/customer/home/NewsletterSection';
import { useProducts } from '../../hooks/useProducts';

export default function Home() {
  const { data: productsData } = useProducts(1, 8);
  const featuredProducts = productsData?.pages.flatMap(page => page.data) || [];

  return (
    <>
        <title>E-Commerce Store - Premium Products & Brands</title>
        <meta name="description" content="Discover premium products from top brands. Shop the latest trends with fast shipping, secure payments, and excellent customer service. Browse our curated collection of trending and best-selling items." />
        <meta name="keywords" content="ecommerce, online shopping, premium products, brands, trending products, best sellers, fashion, electronics, home, lifestyle, deals, discounts" />
        <meta name="url" content="/" />
        <meta name="type" content="website" />
      <div className="min-h-screen">
        <HeroSection />
        <FeaturedCategories />
        <FeaturedProducts products={featuredProducts} title="Trending Now" subtitle="Discover what's hot right now" />
        <FeaturedBrands />
        <FeaturedProducts products={featuredProducts} title="Best Sellers" subtitle="Our most popular products" />
        <NewsletterSection />
      </div>
    </>
  );
}