import React from "react";
import { useHistory } from "react-router-dom";
import "./Home.css";
import {
  flatlistButtons,
  specialOffers,
  content2Flatlist,
  foodList,
  footerMenu,
  footerInstagram,
  footerContacts,
} from "./data";

const Home = () => {
  const history = useHistory();
  const handleOrder = () => {
    history.push("/order");
  };

  return (
    <div style={{ backgroundColor: "#FAF7F2" }}>
      <div className="home-header">
        <img src="/images/iteration-1-images/logo.svg" alt="Pizza Logo" />
        <h1 className="cool-text">
          KOD ACIKTIRIR<br /> PİZZA, DOYURUR
        </h1>
        <button className="btn" onClick={handleOrder}>
          ACIKTIM
        </button>
        <div className="cool-div"></div>
      </div>

      <div className="home-content">
        <div className="home-buttons-flatlist">
          {flatlistButtons.map((btn, i) => (
            <button type="button" className="button" key={i}>
              <img src={btn.icon} alt={btn.label} />
              {btn.label}
            </button>
          ))}
        </div>

        <div className="home-special-offers">
          <div className="home-special-offers-big">
            <h2 className="home-special-offers-big-title" style={specialOffers.big.style}>
              {specialOffers.big.title}
            </h2>
            <p style={{ position: "absolute", marginTop: "10rem" }}>
              {specialOffers.big.description}
            </p>
            <button className="btn-special-offer">{specialOffers.big.button}</button>
          </div>
          <div className="home-special-offers-small">
            {specialOffers.small.map((offer, i) => (
              <div className={`home-special-offers-small-item home-special-offers-small-image${i + 1}`} key={i}>
                <h3 className="home-special-offers-small-title" style={offer.style}>
                  {offer.title}
                </h3>
                <button className="btn-special-offer">{offer.button}</button>
              </div>
            ))}
          </div>
        </div>

        <div className="home-content2">
          <h3 className="home-content2-title">en çok paketlenen menüler</h3>
          <h2 className="home-content2-title2">Hızlı ve Lezzetli Seçenekler</h2>
          <div className="home-content2-flatlist">
            {content2Flatlist.map((btn, i) => (
              <button type="button" className="button2" key={i}>
                <img src={btn.icon} alt={btn.label} />
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        <div className="home-content2-foodlist">
          {foodList.map((food, i) => (
            <div className="home-content2-foodlist-item" key={i}>
              <button type="foodlist-button">
                <img src={food.img} alt={food.title} />
                <h4 className="home-content2-foodlist-item-title">{food.title}</h4>
                <div className="home-content2-foodlist-item-description">
                  {food.description.map((desc, j) => (
                    <p key={j}>{desc}</p>
                  ))}
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="home-footer">
        <footer className="footer">
          <div className="footer-section1">
            <img src="/images/iteration-2-images/footer/logo-footer.svg" alt="Pizza Logo" />
            {footerContacts.map((item, i) => (
              <p className="footer-text" key={i}>
                <img src={item.icon} alt="" />
                {item.text}
              </p>
            ))}
          </div>
          <div className="footer-section2">
            <h2>Sıccacık Menüler</h2>
            <ul className="footer-menu-list" style={{ listStyleType: "none", padding: 0, textDecoration: "none", color: "#fff" }}>
              {footerMenu.map((item, i) => (
                <li key={i}>
                  <a href={item.href}>{item.label}</a>
                  <br />
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-section3">
            <h2>Instagram</h2>
            <div className="footer-instagram-images">
              {footerInstagram.map((src, i) => (
                <img src={src} alt={`Instagram ${i + 1}`} key={i} />
              ))}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
