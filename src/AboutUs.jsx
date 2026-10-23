function AboutUs() {
  return (
    <section className="about-us">
      <div className="about-header">
        <p className="section-tag">About us</p>
        <h1>Paradise Nursery</h1>
        <p className="about-intro">
          We help people bring more life, color, and calm into their homes with
          beautiful, easy-to-care-for houseplants.
        </p>
      </div>

      <div className="about-grid">
        <article className="about-card">
          <h2>Our Story</h2>
          <p>
            Paradise Nursery began with a simple idea: nature should be easy to
            welcome into everyday spaces. We curate healthy, stylish plants that
            suit homes, offices, and growing families.
          </p>
        </article>

        <article className="about-card">
          <h2>Our Mission</h2>
          <p>
            To make greener living accessible, affordable, and enjoyable for
            everyone while helping people create fresh, healthier spaces.
          </p>
        </article>

        <article className="about-card">
          <h2>Our Promise</h2>
          <p>
            Every plant is chosen for quality, care guidance, and long-lasting
            value so you can enjoy nature at home with confidence.
          </p>
        </article>
      </div>
    </section>
  );
}

export default AboutUs;
