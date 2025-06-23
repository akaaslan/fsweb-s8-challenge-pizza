import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";
import './Success.css';

const Success = () => {
  const history = useHistory();
  const location = useLocation();
  const [width, height] = useWindowSize();

  const order = location.state?.order;

  const handleGoHome = () => {
    history.push("/");
  };

  return (
    <div className="success-root">
      <Confetti
        width={width * 0.99}
        height={height * 0.99}
        numberOfPieces={180}
        recycle={false}
        className="bg-[#CE2829] justify-center"
      />

      <div className="success-header">
        <div className="success-header-inner">
          <h1 className="success-header-title">Sipariş Alındı!</h1>
        </div>
      </div>

      <div className="success-center">
        <div className="success-card">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <CheckCircle className="success-check" size={72} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="success-title"
          >
            Siparişiniz başarıyla alındı!
          </motion.h2>

          {order ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="success-details"
            >
              <p><span className="font-bold">İsim:</span> {order.name}</p>
              <p><span className="font-bold">Boyut:</span> {order.size}</p>
              <p><span className="font-bold">Hamur:</span> {order.dough}</p>
              <p><span className="font-bold">Adet:</span> {order.quantity}</p>
              <p><span className="font-bold">Not:</span> {order.note || "Yok"}</p>
              <p>
                <span className="font-bold">Malzemeler:</span>{" "}
                {order.extras && order.extras.length > 0
                  ? order.extras.join(", ")
                  : "Yok"}
              </p>
            </motion.div>
          ) : (
            <p className="success-error">Sipariş bilgisi alınamadı.</p>
          )}

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.4 }}
            onClick={handleGoHome}
            className="success-btn"
          >
            Ana Sayfaya Dön
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Success;
