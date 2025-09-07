import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  siteName?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  price?: string;
  currency?: string;
  availability?: 'in stock' | 'out of stock' | 'preorder';
  brand?: string;
  category?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

export default function SEO({
  title = 'E-Commerce Store - Premium Products & Brands',
  description = 'Discover premium products from top brands. Shop the latest trends with fast shipping, secure payments, and excellent customer service.',
  keywords = 'ecommerce, online shopping, premium products, brands, fashion, electronics, home, lifestyle',
  image = '/og-image.jpg',
  url,
  type = 'website',
  siteName = 'E-Commerce Store',
  author,
  publishedTime,
  modifiedTime,
  section,
  tags,
  price,
  currency = 'USD',
  availability,
  brand,
  category,
  noindex = false,
  nofollow = false,
}: SEOProps) {
  // Safe access to window object
  const isClient = typeof window !== 'undefined';
  const origin = isClient ? window.location.origin : 'https://yourstore.com';
  const currentUrl = isClient ? window.location.href : 'https://yourstore.com';
  
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  const fullUrl = url ? `${origin}${url}` : currentUrl;
  const fullImage = image.startsWith('http') ? image : `${origin}${image}`;

  const robotsContent = [
    noindex ? 'noindex' : 'index',
    nofollow ? 'nofollow' : 'follow',
  ].join(', ');

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author || siteName} />
      <meta name="robots" content={robotsContent} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* Article specific meta tags */}
      {type === 'article' && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {author && <meta property="article:author" content={author} />}
          {section && <meta property="article:section" content={section} />}
          {tags && tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Product specific meta tags */}
      {type === 'product' && (
        <>
          {price && <meta property="product:price:amount" content={price} />}
          {currency && <meta property="product:price:currency" content={currency} />}
          {availability && <meta property="product:availability" content={availability} />}
          {brand && <meta property="product:brand" content={brand} />}
          {category && <meta property="product:category" content={category} />}
        </>
      )}

      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#3b82f6" />
      <meta name="msapplication-TileColor" content="#3b82f6" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Structured Data for Organization */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": siteName,
          "url": origin,
          "logo": `${origin}/logo.png`,
          "description": "Premium e-commerce store offering quality products from top brands",
          "sameAs": [
            "https://facebook.com/yourstore",
            "https://twitter.com/yourstore",
            "https://instagram.com/yourstore"
          ]
        })}
      </script>
    </Helmet>
  );
}
