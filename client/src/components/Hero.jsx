import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/authSlice";

const Hero = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [scrolling, setScrolling] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };

  // Scroll to next section
  const handleScrollDown = () => {
    const nextSection = document.getElementById("next-section");
    if (nextSection) {
      window.scrollTo({
        top: nextSection.offsetTop,
        behavior: "smooth",
      });
      setScrolling(true);
    }
  };

  return (
    <section
      ref={ref}
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        padding: "20px",
        textAlign: "center",
        overflow: "hidden",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
      }}
    >
      {token && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 16px",
            borderBottom: "1px solid rgba(255,255,255,0.25)",
            zIndex: 10000,
            background: "rgba(0, 0, 0, 0.25)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
          }}
        >
          <div
            style={{
              color: "#fff",
              fontWeight: 600,
              textShadow: "0 2px 6px rgba(0,0,0,0.35)",
            }}
          >
            {getTimeBasedGreeting()}, {user?.username}
          </div>
          <button
            onClick={handleLogout}
            style={{
              padding: "8px 16px",
              borderRadius: 20,
              border: "none",
              background: "linear-gradient(90deg, #ff6b6b, #ff4757)",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 4px 10px rgba(255, 71, 87, 0.3)",
            }}
          >
            Logout
          </button>
        </div>
      )}
      {/* Hero Title */}
      <motion.h1
        initial={{ opacity: 0, y: 60 }}
        animate={{
          opacity: inView ? 1 : 0,
          y: inView ? 0 : 60,
        }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        style={{
          fontSize: "4.5rem",
          fontWeight: "800",
          color: "#fff",
          fontFamily: "Poppins, sans-serif",
          letterSpacing: "1.5px",
          lineHeight: "1.2",
          textAlign: "center",
          textShadow: "0px 0px 15px rgba(20,209,209,0.4)",
        }}
      >
        Welcome to{" "}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{
            opacity: inView ? 1 : 0,
            color: inView ? "#14d1d1" : "#333",
            textShadow: inView ? "0 0 25px rgba(20, 209, 209, 0.9)" : "none",
          }}
          transition={{ type: "spring", stiffness: 100, damping: 25 }}
          style={{ display: "inline-block" }}
        >
          TaskGPT
        </motion.span>
      </motion.h1>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
        style={{
          color: "#b5b5b5",
          fontFamily: "Roboto, sans-serif",
          marginTop: "18px",
          fontSize: "1.6rem",
          fontWeight: "500",
          letterSpacing: "1px",
        }}
      >
        Powered by <span style={{ color: "#14d1d1", fontWeight: "600" }}>DeepAI</span>
      </motion.p>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 40 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.9 }}
        style={{
          fontSize: "1.25rem",
          color: "#e0e0e0",
          maxWidth: "750px",
          marginTop: "25px",
          lineHeight: "1.8",
          fontFamily: "Roboto, sans-serif",
          letterSpacing: "0.5px",
        }}
      >
        Your AI-powered task manager—stay organized, boost productivity, and
        focus on what matters most. <br />
        <strong>Drag and drop your tasks effortlessly</strong> to manage your
        workflow with ease.
      </motion.p>

      {/* CTA + Scroll Arrow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
        transition={{ duration: 1.2, delay: 1.2 }}
        style={{
          position: "absolute",
          bottom: "35px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleScrollDown}
          style={{
            marginTop: "30px",
            padding: "12px 28px",
            fontSize: "1.1rem",
            fontWeight: "600",
            border: "none",
            borderRadius: "30px",
            cursor: "pointer",
            background: "linear-gradient(90deg, #14d1d1, #00a8a8)",
            color: "#fff",
            boxShadow: "0px 4px 12px rgba(20,209,209,0.4)",
          }}
        >
          Get Started
        </motion.button>

        <motion.div
          animate={{
            y: [0, -12, 0],
            opacity: [1, 0.7, 1],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          onClick={handleScrollDown}
          style={{
            cursor: "pointer",
            fontSize: "3rem",
            color: "#14d1d1",
            fontWeight: "bold",
            userSelect: "none",
          }}
        >
          &#x2193;
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;