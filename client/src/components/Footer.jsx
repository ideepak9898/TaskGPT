import { GitHub, LinkedIn, Public } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={iconContainerStyle}>
          <IconButton
            href="https://github.com/ideepak9898"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHub style={iconStyle} />
          </IconButton>
          <IconButton
            href="https://www.linkedin.com/in/ideepak9898/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedIn style={iconStyle} />
          </IconButton>
          <IconButton
            href="https://portfolio4deepak.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Public style={iconStyle} />
          </IconButton>
        </div>
      </div>
    </footer>
  );
};

const footerStyle = {
  backgroundColor: "transparent",
  color: "#333",
  padding: "20px",
  position: "relative",
  width: "100%",
  textAlign: "center",
  marginTop: "auto",
};

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
};

const iconContainerStyle = {
  display: "flex",
  gap: "15px",
};

const iconStyle = {
  color: "#fff",
  transition: "color 0.3s ease",
};

export default Footer;
