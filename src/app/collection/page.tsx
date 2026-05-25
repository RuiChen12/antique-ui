import Image from 'next/image';
import Link from 'next/link';

const collectionItems = [
  {
    title: "Rare Jian 'Hare's Fur' Tea Bowl",
    period: 'Song Dynasty',
    imageSrc: '/images/Vase.jpg',
    imageAlt: 'Tea bowl',
  },
  {
    title: 'Bronze Ding Vessel',
    period: 'Han Dynasty',
    imageSrc: '/images/Miscellaneous.jpg',
    imageAlt: 'Bronze ding vessel',
  },
  {
    title: 'White Glazed Meiping Vase',
    period: 'Yuan Dynasty',
    imageSrc: '/images/Vase.jpg',
    imageAlt: 'White glazed vase',
  },
  {
    title: 'Gilt-Bronze Buddha',
    period: 'Ming Dynasty',
    imageSrc: '/images/Buddha.jpg',
    imageAlt: 'Buddha statue',
  },
  {
    title: "Blue and White Scholar's Vase",
    period: 'Ming Dynasty',
    imageSrc: '/images/Vase.jpg',
    imageAlt: 'Blue and white vase',
  },
  {
    title: 'Archaic Bronze Yue',
    period: 'Shang Dynasty',
    imageSrc: '/images/Miscellaneous.jpg',
    imageAlt: 'Bronze yue',
  },
  {
    title: 'Qingbai Lobed Ewer',
    period: 'Song Dynasty',
    imageSrc: '/images/Vase.jpg',
    imageAlt: 'Qingbai ewer',
  },
  {
    title: 'Pair of Zitan and Marble Stands',
    period: 'Qing Dynasty',
    imageSrc: '/images/furniture.jpg',
    imageAlt: 'Zitan stands',
  },
];

export default function CollectionPage() {
  return (
    <main className="site-main">
      <section className="collection-page">
        <section className="collection-hero">
          <p className="collection-kicker">Collection</p>

          <h1 className="collection-page-title">Collection</h1>

          <p className="collection-page-lead">
            A selection of Eastern antiques with quiet form, material depth, and enduring presence.
          </p>
        </section>

        <section className="collection-toolbar">
          <div className="collection-tabs" aria-label="Collection categories">
            <button type="button" className="collection-tab active">
              View All
            </button>
            <button type="button" className="collection-tab">
              Ceramics
            </button>
            <button type="button" className="collection-tab">
              Bronzes
            </button>
            <button type="button" className="collection-tab">
              Objects
            </button>
          </div>

          <div className="collection-toolbar-icon" aria-hidden="true">
            ☰
          </div>
        </section>

        <section className="collection-grid-section">
          <div className="collection-grid">
            {collectionItems.map((item) => (
              <article className="collection-item" key={`${item.title}-${item.period}`}>
                <div className="collection-item-media">
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    width={700}
                    height={700}
                    className="collection-item-image"
                  />
                </div>

                <div className="collection-item-content">
                  <h2 className="collection-item-title">{item.title}</h2>
                  <p className="collection-item-period">{item.period}</p>

                  <Link href="/contact" className="collection-item-link">
                    Inquire for Details
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="collection-cta">
          <p className="collection-cta-text">
            For inquiries and to learn more about the collection, please contact us.
          </p>

          <Link href="/contact" className="collection-cta-link">
            Contact Us
          </Link>
        </section>
      </section>
    </main>
  );
}
