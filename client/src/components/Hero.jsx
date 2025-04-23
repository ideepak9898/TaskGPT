import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";

const Hero = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [scrolling, setScrolling] = useState(false);

  // Function to scroll to the next section
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
      }}
    >
      {/* Hero Title Animation */}
      <motion.h1
        initial={{ opacity: 0, y: 60 }}
        animate={{
          opacity: inView ? 1 : 0,
          y: inView ? 0 : 60,
        }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
          delay: 0.3,
        }}
        style={{
          fontSize: "4rem",
          fontWeight: "700",
          color: "rgba(255, 255, 255,1)",
          fontFamily: "Poppins, sans-serif",
          letterSpacing: "1.5px",
          lineHeight: "1.2",
          textAlign: "center",
          textShadow: "2px 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        Welcome to{" "}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{
            opacity: inView ? 1 : 0,
            color: inView ? "#14d1d1" : "#333", // Change color when in view
            textShadow: inView ? "0 0 20px rgb(20, 209, 209)" : "none",
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 25,
            duration: 1,
          }}
        >
          TaskGPT
        </motion.span>
      </motion.h1>

      {/* Powered by FinOpsly AI Animation */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
          delay: 1,
        }}
        style={{
          color: "#888",
          fontFamily: "Roboto, sans-serif",
          marginTop: "20px",
          lineHeight: "1.5",
          letterSpacing: "1px",
          cursor: "pointer",
          fontSize: "1.4rem",
        }}
        whileHover={{
          color: "rgb(20, 209, 209)",
          scale: 1.05,
          transition: { type: "spring", stiffness: 300, damping: 25 },
        }}
      >
        Powered by DeepAI
      </motion.p>

      {/* Hero Subtitle with Parallax-like Effect */}
      <motion.p
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 40 }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
          delay: 0.5,
        }}
        style={{
          fontSize: "1.3rem",
          color: "rgba(255, 255, 255,1)",
          maxWidth: "700px",
          marginTop: "20px",
          lineHeight: "1.6",
          fontFamily: "Roboto, sans-serif",
          letterSpacing: "0.5px",
        }}
      >
        Your AI-powered personal task manager—designed to help you stay organized, boost productivity, and get more done with ease and focus.{" "}
        <br/>
        <strong>
          By dragging and dropping your tasks according to their status,
        </strong>{" "}
        you'll effortlessly manage your workflow.
      </motion.p>

      {/* Scroll Down Arrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: inView ? 1 : 0,
          y: inView ? 0 : 30,
        }}
        transition={{
          duration: 1,
          ease: "easeOut",
          delay: 1.5,
        }}
        style={{
          position: "absolute",
          bottom: "20px",
          zIndex: 1,
        }}
      >
        <motion.div
          animate={{
            y: [0, -12, 0],
            opacity: [1, 0.7, 1],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
          onClick={handleScrollDown}
          style={{
            cursor: "pointer",
            fontSize: "3.5rem",
            color: "rgba(255, 255, 255,1)",
            fontWeight: "bold",
            letterSpacing: "1px",
            display: "block",
            transformOrigin: "center",
            willChange: "transform, opacity",
          }}
        >
          &#x2193;
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
