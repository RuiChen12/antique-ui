import Image from 'next/image';
import Link from 'next/link';
import CategoryCard from '@/components/CategoryCard';

export default function HomePage() {
  return (
    <main className="site-main">
      <section className="hero">
        <div className="hero-copy">
          <p className="hero-kicker">Antique Buying &amp; Consignment Services</p>

          <h1 className="hero-title">
            We Buy Antiques and
            <br />
            Offer Consignment
          </h1>

          <p className="hero-subtitle">
            Send us photographs and your contact information. Our specialists provide
            an initial review within 24 hours and discuss purchase or consignment options.
          </p>

          <div className="hero-actions">
            <Link href="/sell" className="hero-button hero-button-primary">
              Sell to Us
            </Link>

            <Link href="/contact" className="hero-button hero-button-secondary">
              Consignment
            </Link>
          </div>
        </div>

        <div className="hero-art">
          <Image
            src="/images/Painting.jpg"
            alt="Chinese antique painting"
            width={900}
            height={1100}
            priority
            className="hero-image"
          />
        </div>
      </section>

      <section className="category-strip">
        <div className="section-heading">
          <p className="section-kicker">What We Buy</p>
          <h2>Selected categories of Chinese and Asian antiques</h2>
        </div>

        <div className="category-grid">
          <CategoryCard
            title="Chinese Ceramics"
            description="Porcelain, celadon, blue-and-white, and other historic ceramic pieces."
            imageSrc="/images/Vase.jpg"
            imageAlt="Chinese ceramics"
          />

          <CategoryCard
            title="Bronze & Scholar Objects"
            description="Ritual bronzes, incense tools, brush pots, and desk objects."
            imageSrc="/images/Miscellaneous.jpg"
            imageAlt="Bronze and scholar objects"
          />

          <CategoryCard
            title="Buddhist Art"
            description="Figures, altar objects, temple pieces, and devotional works."
            imageSrc="/images/Buddha.jpg"
            imageAlt="Buddhist art"
          />

          <CategoryCard
            title="Rosewood Furniture"
            description="Chairs, cabinets, tables, and carved hardwood furniture."
            imageSrc="/images/Furniture.JPG"
            imageAlt="Rosewood furniture"
          />
        </div>
      </section>
    </main>
  );
}
