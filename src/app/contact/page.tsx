export default function ContactPage() {
  return (
    <main className="site-main">
      <section className="contact-page">
        <section className="contact-hero">
          <p className="contact-kicker">Contact Us</p>

          <h1 className="contact-title">Contact Us</h1>

          <p className="contact-lead">
            Speak with us about selling, consigning, or having an antique reviewed.
          </p>

          <p className="contact-sublead">
            Send a short message with your contact information. We will respond as soon
            as possible.
          </p>
        </section>

        <section className="contact-help">
          <h2 className="contact-section-title">How We Can Help</h2>

          <div className="contact-help-grid">
            <article className="contact-help-card">
              <p className="contact-help-icon">◇</p>
              <h3>Sell an Antique</h3>
              <p>
                Contact us if you have ceramics, paintings, scholar objects, furniture,
                or other Asian antiques.
              </p>
            </article>

            <article className="contact-help-card">
              <p className="contact-help-icon">◇</p>
              <h3>Consignment</h3>
              <p>
                We can discuss whether consignment is appropriate for your item or
                collection.
              </p>
            </article>

            <article className="contact-help-card">
              <p className="contact-help-icon">◇</p>
              <h3>Estate Pieces</h3>
              <p>
                We review inherited objects and estate pieces with a careful,
                straightforward process.
              </p>
            </article>

            <article className="contact-help-card">
              <p className="contact-help-icon">◇</p>
              <h3>General Questions</h3>
              <p>
                Ask about our process, timing, in-person review, or what types of items
                we consider.
              </p>
            </article>
          </div>
        </section>

        <section className="contact-form-section">
          <h2 className="contact-section-title">Send a Message</h2>

          <form className="contact-form">
            <div className="contact-form-grid">
              <div className="contact-field">
                <label htmlFor="contactName">
                  Full Name
                  <input
                    id="contactName"
                    name="contactName"
                    type="text"
                    placeholder="Full Name"
                  />
                </label>
              </div>

              <div className="contact-field">
                <label htmlFor="contactPhone">
                  Phone Number
                  <input
                    id="contactPhone"
                    name="contactPhone"
                    type="tel"
                    placeholder="Phone Number"
                  />
                </label>
              </div>
            </div>

            <div className="contact-form-grid">
              <div className="contact-field">
                <label htmlFor="contactEmail">
                  Email Address
                  <input
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    placeholder="Email Address"
                  />
                </label>
              </div>

              <div className="contact-field">
                <label htmlFor="contactReason">
                  Reason for Contact
                  <select id="contactReason" name="contactReason" defaultValue="">
                    <option value="" disabled>
                      Select one
                    </option>
                    <option value="sell">Sell to Us</option>
                    <option value="consignment">Consignment</option>
                    <option value="estate">Estate Pieces</option>
                    <option value="question">General Question</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="contact-form-grid-message">
              <div className="contact-field">
                <label htmlFor="contactMessage">
                  Message
                  <textarea
                    id="contactMessage"
                    name="contactMessage"
                    rows={5}
                    placeholder="Tell us briefly how we can help."
                  />
                </label>
              </div>
            </div>

            <button type="button" className="contact-submit">
              Submit Message
            </button>
          </form>
        </section>

        <section className="contact-direct">
          <p className="contact-email">Email: antiquegallery@example.com</p>

          <p className="contact-direct-text">
            For faster review, please include clear photographs, your name, and the best
            way to contact you.
          </p>

          <p className="contact-direct-text">
            If you are contacting us for an older family collection or estate item, a
            short note about where the object came from can be helpful.
          </p>
        </section>
      </section>
    </main>
  );
}
