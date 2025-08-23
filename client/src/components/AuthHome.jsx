import { Link } from "react-router-dom";
import { Box, Typography, Button, Container, Grid, Paper, Stack, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import PsychologyIcon from "@mui/icons-material/Psychology";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { GitHub, LinkedIn, Public } from "@mui/icons-material";

const AuthHome = () => {
  const features = [
    {
      icon: <TaskAltIcon sx={{ fontSize: 40, color: "#14d1d1" }} />,
      title: "Smart Task Management",
      description: "Organize tasks with intelligent categorization and priority management"
    },
    {
      icon: <PsychologyIcon sx={{ fontSize: 40, color: "#14d1d1" }} />,
      title: "AI-Powered Assistant",
      description: "Get intelligent insights and suggestions from our DeepAI assistant"
    },
    {
      icon: <DragIndicatorIcon sx={{ fontSize: 40, color: "#14d1d1" }} />,
      title: "Drag & Drop Interface",
      description: "Intuitive drag-and-drop workflow for seamless task organization"
    }
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "radial-gradient(circle at 20% 80%, rgba(20, 209, 209, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(20, 209, 209, 0.1) 0%, transparent 50%)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg" sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", py: 4 }}>
        <Grid container spacing={4} alignItems="center">
          {/* Hero Section */}
          <Grid item xs={12} lg={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4rem" },
                  fontWeight: 800,
                  color: "#fff",
                  mb: 2,
                  lineHeight: 1.2,
                  textShadow: "0 4px 20px rgba(0,0,0,0.3)",
                }}
              >
                Welcome to{" "}
                <Box
                  component="span"
                  sx={{
                    background: "linear-gradient(45deg, #14d1d1, #00a8a8)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textShadow: "0 0 30px rgba(20, 209, 209, 0.5)",
                  }}
                >
                  TaskPilot
                </Box>
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  color: "#b5b5b5",
                  mb: 3,
                  fontWeight: 400,
                  lineHeight: 1.6,
                }}
              >
                Your AI-powered task manager designed to boost productivity and keep you organized with intelligent insights.
              </Typography>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ mb: 4 }}
              >
                <Button
                  component={Link}
                  to="/register"
                  variant="contained"
                  size="large"
                  sx={{
                    background: "linear-gradient(45deg, #14d1d1, #00a8a8)",
                    color: "#fff",
                    fontWeight: 600,
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    textTransform: "none",
                    fontSize: "1.1rem",
                    boxShadow: "0 8px 25px rgba(20, 209, 209, 0.3)",
                    "&:hover": {
                      background: "linear-gradient(45deg, #00a8a8, #14d1d1)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 12px 35px rgba(20, 209, 209, 0.4)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Get Started
                </Button>
                <Button
                  component={Link}
                  to="/login"
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: "rgba(255,255,255,0.3)",
                    color: "#fff",
                    fontWeight: 600,
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    textTransform: "none",
                    fontSize: "1.1rem",
                    "&:hover": {
                      borderColor: "#14d1d1",
                      backgroundColor: "rgba(20, 209, 209, 0.1)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Login
                </Button>
              </Stack>
            </motion.div>
          </Grid>

          {/* Features Section */}
          <Grid item xs={12} lg={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Grid container spacing={3}>
                {features.map((feature, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    >
                      <Paper
                        elevation={0}
                        sx={{
                          p: 3,
                          height: "100%",
                          background: "rgba(255,255,255,0.05)",
                          backdropFilter: "blur(10px)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: 3,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-5px)",
                            background: "rgba(255,255,255,0.08)",
                            borderColor: "rgba(20, 209, 209, 0.3)",
                          },
                        }}
                      >
                        <Box sx={{ mb: 2 }}>
                          {feature.icon}
                        </Box>
                        <Typography
                          variant="h6"
                          sx={{
                            color: "#fff",
                            fontWeight: 600,
                            mb: 1,
                          }}
                        >
                          {feature.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#b5b5b5",
                            lineHeight: 1.6,
                          }}
                        >
                          {feature.description}
                        </Typography>
                      </Paper>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </Grid>
        </Grid>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Box
            sx={{
              textAlign: "center",
              mt: 6,
              p: 3,
              background: "rgba(255,255,255,0.03)",
              borderRadius: 3,
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "#fff",
                mb: 1,
                fontWeight: 600,
              }}
            >
              Ready to boost your productivity?
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#b5b5b5",
                mb: 2,
              }}
            >
            </Typography>
            <Button
              component={Link}
              to="/register"
              variant="contained"
              sx={{
                background: "linear-gradient(45deg, #14d1d1, #00a8a8)",
                color: "#fff",
                fontWeight: 600,
                px: 4,
                py: 1.5,
                borderRadius: 3,
                textTransform: "none",
                "&:hover": {
                  background: "linear-gradient(45deg, #00a8a8, #14d1d1)",
                },
              }}
            >
              Join Now
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default AuthHome;