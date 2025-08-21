import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../features/authSlice";
import { toast } from "react-toastify";
import { Box, Typography, Button, Container, Paper, TextField, Stack, IconButton, Dialog, DialogContent } from "@mui/material";
import { motion } from "framer-motion";
import { ArrowBack } from "@mui/icons-material";
import LoginIcon from "@mui/icons-material/Login";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Login = () => {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(formData)).unwrap();
      setFormData({ identifier: "", password: "" });
      setShowSuccessPopup(true);
      setTimeout(() => {
        setShowSuccessPopup(false);
        navigate("/tasks", { replace: true });
      }, 2000);
    } catch (err) {
      const message = typeof err === "string" ? err : err?.message || "Login failed";
      toast.error(message);
    }
  };

  useEffect(() => {
    if (token) {
      // Remove the automatic redirect since we're handling it in handleSubmit
      // navigate("/tasks", { replace: true });
    }
  }, [token, navigate]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        py: 4,
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

      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 4,
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 3,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Back Button */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 3,
              }}
            >
              <IconButton
                onClick={() => navigate("/")}
                sx={{
                  color: "#b5b5b5",
                  "&:hover": {
                    color: "#14d1d1",
                    transform: "translateX(-2px)",
                  },
                  transition: "all 0.3s ease",
                  mr: 2,
                }}
              >
                <ArrowBack />
              </IconButton>
              <Typography
                variant="h4"
                sx={{
                  color: "#fff",
                  fontWeight: 700,
                  flex: 1,
                  textAlign: "center",
                  mr: 4, // Compensate for back button
                }}
              >
                Welcome Back
              </Typography>
            </Box>

            {/* Icon */}
            <Box
              sx={{
                textAlign: "center",
                mb: 3,
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background: "linear-gradient(45deg, #14d1d1, #00a8a8)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto",
                    boxShadow: "0 8px 25px rgba(20, 209, 209, 0.3)",
                  }}
                >
                  <LoginIcon sx={{ fontSize: 40, color: "#fff" }} />
                </Box>
              </motion.div>
            </Box>

            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Username or Email"
                  name="identifier"
                  value={formData.identifier}
                  onChange={handleChange}
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: "#fff",
                      "& fieldset": {
                        borderColor: "rgba(255,255,255,0.2)",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(20, 209, 209, 0.5)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#14d1d1",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "#b5b5b5",
                      "&.Mui-focused": {
                        color: "#14d1d1",
                      },
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: "#fff",
                      "& fieldset": {
                        borderColor: "rgba(255,255,255,0.2)",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(20, 209, 209, 0.5)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#14d1d1",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "#b5b5b5",
                      "&.Mui-focused": {
                        color: "#14d1d1",
                      },
                    },
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={loading}
                  sx={{
                    background: "linear-gradient(45deg, #14d1d1, #00a8a8)",
                    color: "#fff",
                    fontWeight: 600,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: "none",
                    fontSize: "1.1rem",
                    boxShadow: "0 8px 25px rgba(20, 209, 209, 0.3)",
                    "&:hover": {
                      background: "linear-gradient(45deg, #00a8a8, #14d1d1)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 12px 35px rgba(20, 209, 209, 0.4)",
                    },
                    "&:disabled": {
                      background: "rgba(255,255,255,0.1)",
                      color: "#b5b5b5",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  {loading ? "Logging In..." : "Login"}
                </Button>
              </Stack>
            </form>

            {/* Register Link */}
            <Box
              sx={{
                textAlign: "center",
                mt: 3,
                pt: 3,
                borderTop: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: "#b5b5b5",
                  mb: 1,
                }}
              >
                Don't have an account?
              </Typography>
              <Button
                onClick={() => navigate("/register")}
                sx={{
                  color: "#14d1d1",
                  textTransform: "none",
                  fontWeight: 600,
                  "&:hover": {
                    color: "#00a8a8",
                    textDecoration: "underline",
                  },
                }}
              >
                Register Here
              </Button>
            </Box>
          </Paper>
        </motion.div>
      </Container>

      {/* Custom Success Popup */}
      <Dialog
        open={showSuccessPopup}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 3,
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            maxWidth: "400px",
          },
        }}
        sx={{
          "& .MuiDialog-paper": {
            margin: 0,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <DialogContent sx={{ p: 3, textAlign: "center" }}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: "linear-gradient(45deg, #22c55e, #16a34a)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
                boxShadow: "0 8px 25px rgba(34, 197, 94, 0.3)",
              }}
            >
              <CheckCircleIcon sx={{ fontSize: 30, color: "#fff" }} />
            </Box>
          </motion.div>
          
          <Typography
            variant="h6"
            sx={{
              color: "#fff",
              fontWeight: 700,
              mb: 1.5,
            }}
          >
            Login Successful!
          </Typography>
          
          <Typography
            variant="body2"
            sx={{
              color: "#b5b5b5",
              mb: 2.5,
            }}
          >
            Redirecting to your dashboard
          </Typography>
          
          <Box
            sx={{
              width: "100%",
              height: 3,
              background: "rgba(255,255,255,0.1)",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "linear" }}
              style={{
                height: "100%",
                background: "linear-gradient(45deg, #14d1d1, #00a8a8)",
                borderRadius: 2,
              }}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Login;
