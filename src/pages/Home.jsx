import { useNavigate } from "react-router-dom";
import { Leaf, Wind, Sun, Heart, ArrowRight } from "lucide-react";

const heroImage =
  "https://images.pexels.com/photos/28961744/pexels-photo-28961744.jpeg?auto=compress&cs=tinysrgb&h=900&w=1600";
const heroImage2 =
  "https://images.pexels.com/photos/6777855/pexels-photo-6777855.jpeg?auto=compress&cs=tinysrgb&h=900&w=1600";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      {/* Hero section */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-badge">
            <Leaf size={16} /> Indoor Plant Specialists
          </span>
          <h1>
            Bring Nature <span className="hero-accent">Home.</span>
          </h1>
          <p className="hero-intro">
            Indoor plants do more than beautify a room. They purify the air you
            breathe, reduce stress, and create a calm, lively atmosphere in your
            living space. At Paradise Nursery, we handpick every plant so it
            arrives healthy and ready to thrive in your home.
          </p>
          <button
            className="cta-btn"
            onClick={() => navigate("/products")}
          >
            Get Started <ArrowRight size={20} />
          </button>
        </div>
        <div className="hero-images">
          <img src={heroImage} alt="Lush greenhouse filled with green plants" />
          <img
            src={heroImage2}
            alt="Vibrant indoor plant collection"
            className="hero-img-2"
          />
        </div>
      </section>

      {/* Benefits section */}
      <section className="benefits">
        <h2>Why Fill Your Home With Plants?</h2>
        <div className="benefit-cards">
          <div className="benefit-card">
            <Wind size={32} className="benefit-icon" />
            <h3>Cleaner Air</h3>
            <p>
              Plants absorb toxins and release oxygen, improving indoor air
              quality naturally.
            </p>
          </div>
          <div className="benefit-card">
            <Heart size={32} className="benefit-icon" />
            <h3>Less Stress</h3>
            <p>
              Studies show that surrounding yourself with greenery lowers anxiety
              and boosts your mood.
            </p>
          </div>
          <div className="benefit-card">
            <Sun size={32} className="benefit-icon" />
            <h3>Easy Care</h3>
            <p>
              Our plants are chosen for their hardiness — many thrive with minimal
              water and light.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
