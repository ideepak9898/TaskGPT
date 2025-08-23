import { GitHub, LinkedIn, Public } from "@mui/icons-material";
import { Box, Typography, IconButton } from "@mui/material";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.8 }}
    >
      <Box
        sx={{
          background: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          padding: "30px 20px",
          textAlign: "center",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: "#b5b5b5",
            mb: 2,
            fontSize: "0.9rem",
          }}
        >
          © 2025 TaskPilot. Built with ❤️ by Deepak
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <IconButton
            href="https://github.com/ideepak9898"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "#b5b5b5",
              "&:hover": {
                color: "#14d1d1",
                transform: "translateY(-2px)",
                boxShadow: "0 4px 12px rgba(20, 209, 209, 0.3)",
              },
              transition: "all 0.3s ease",
              padding: "8px",
            }}
          >
            <GitHub sx={{ fontSize: "1.5rem" }} />
          </IconButton>
          <IconButton
            href="https://www.linkedin.com/in/ideepak9898/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "#b5b5b5",
              "&:hover": {
                color: "#14d1d1",
                transform: "translateY(-2px)",
                boxShadow: "0 4px 12px rgba(20, 209, 209, 0.3)",
              },
              transition: "all 0.3s ease",
              padding: "8px",
            }}
          >
            <LinkedIn sx={{ fontSize: "1.5rem" }} />
          </IconButton>
          <IconButton
            href="https://portfolio4deepak.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "#b5b5b5",
              "&:hover": {
                color: "#14d1d1",
                transform: "translateY(-2px)",
                boxShadow: "0 4px 12px rgba(20, 209, 209, 0.3)",
              },
              transition: "all 0.3s ease",
              padding: "8px",
            }}
          >
            <Public sx={{ fontSize: "1.5rem" }} />
          </IconButton>
        </Box>
      </Box>
    </motion.div>
  );
};

export default Footer;
