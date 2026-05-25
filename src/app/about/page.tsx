export default function AboutPage() {
  return (
    <main className="site-main">
      <section className="about-page">
        <section className="about-hero">
          <p className="about-kicker">About</p>

          <h1 className="about-page-title">About the Collection</h1>

          <p className="about-page-lead">
            A considered selection of Eastern antiques shaped by quiet form, material depth,
            and lasting presence.
          </p>
        </section>

        <section className="about-statement">
          <h2 className="about-section-title">Collection Perspective</h2>

          <div className="about-statement-body">
            <p>
              This collection focuses on objects that carry both restraint and character.
            </p>

            <p>
              Rather than pursuing quantity, the emphasis is placed on pieces that feel
              resolved in form, material, and presence.
            </p>

            <p>
              The selection includes ceramics with balanced silhouette, bronze objects with
              depth and age, devotional works with quiet dignity, and furniture that
              continues to live naturally within contemporary interiors.
            </p>

            <p>
              Each piece is considered not only for its origin or category, but for how it
              occupies space, holds light, and sustains attention over time.
            </p>
          </div>
        </section>

        <section className="about-values">
          <h2 className="about-section-title">What We Value</h2>

          <div className="about-values-grid">
            <article className="about-value-card">
              <h3>Form</h3>
              <p>
                Balanced proportion, restraint, and quiet visual strength.
              </p>
            </article>

            <article className="about-value-card">
              <h3>Material</h3>
              <p>
                Ceramics, bronze, wood, and objects with lasting surface character.
              </p>
            </article>

            <article className="about-value-card">
              <h3>Selection</h3>
              <p>
                Pieces chosen with care for condition, presence, and continuity.
              </p>
            </article>
          </div>
        </section>

        <section className="about-closing">
          <p className="about-closing-text">
            For further inquiries or to learn more about the collection, private contact is
            welcome.
          </p>

          <a href="/contact" className="about-contact-link">
            Contact Us
          </a>
        </section>
      </section>
    </main>
  );
}
