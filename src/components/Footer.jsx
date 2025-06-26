import React from "react";
import "./Footer.css";
const footerContacts = [
  {
    icon: "../../../images/iteration-2-images/footer/icons/icon-1.png",
    text: "Adres: Örnek Mah. No:123, 34567 İstanbul",
  },
  {
    icon: "../../../images/iteration-2-images/footer/icons/icon-2.png",
    text: "Telefon: 0123 456 78 90",
  },
  {
    icon: "../../../images/iteration-2-images/footer/icons/icon-3.png",
    text: "Email: info@pizzacompany.com",
  },
];

const footerMenu = [
  { label: "Anasayfa", href: "/" },
  { label: "Hakkımızda", href: "/about" },
  { label: "Menü", href: "/menu" },
  { label: "İletişim", href: "/contact" },
];

const footerInstagram = [
  "../../images/iteration-2-images/footer/insta/li-1.png",
  "../../images/iteration-2-images/footer/insta/li-2.png",
  "../../images/iteration-2-images/footer/insta/li-3.png",
  "../../images/iteration-2-images/footer/insta/li-4.png",
  "../../images/iteration-2-images/footer/insta/li-5.png",
  "../../images/iteration-2-images/footer/insta/li-6.png",
];

const Footer = () => (
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
);

export default Footer;