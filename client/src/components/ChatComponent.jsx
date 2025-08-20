// import { useState, useRef, useEffect } from "react";
// import {
//   TextField,
//   Drawer,
//   Box,
//   Typography,
//   Button,
//   CircularProgress,
// } from "@mui/material";
// import SendIcon from "@mui/icons-material/Send";
// import axios from "axios";
// import { API_URL } from "../utils/constants";

// const ChatComponent = ({ onClose }) => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const endOfMessagesRef = useRef(null);

//   useEffect(() => {
//     setMessages([
//       {
//         role: "assistant",
//         content: (
//           <>
//             Hello! I am <strong>DeepAI</strong>, your AI Assistant. You can
//             ask me anything related to tasks.
//           </>
//         ),
//       },
//     ]);
//   }, []);

//   useEffect(() => {
//     if (endOfMessagesRef.current) {
//       endOfMessagesRef.current.scrollIntoView({
//         behavior: "smooth",
//         block: "end",
//       });
//     }
//   }, [messages]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (input.trim() === "") return;

//     setMessages([...messages, { role: "user", content: input }]);
//     setInput("");

//     setIsTyping(true);

//     try {
//       const response = await axios.post(`${API_URL}/api/gemini/completion`, {
//         query: input,
//       });

//       const assistantResponse = response.data.response.trim();

//       setIsTyping(false);
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { role: "assistant", content: assistantResponse },
//       ]);
//     } catch (error) {
//       console.error("Error communicating with the API:", error);
//       setIsTyping(false);
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         {
//           role: "assistant",
//           content:
//             "Sorry, there was an error processing your request. Please try again later.",
//         },
//       ]);
//     }
//   };

//   return (
//     <Drawer
//       anchor="right"
//       open={true}
//       onClose={onClose}
//       sx={{
//         width: "350px",
//         flexShrink: 0,
//         "& .MuiDrawer-paper": {
//           width: "350px",
//           height: "100vh",
//           display: "flex",
//           flexDirection: "column",
//           padding: "16px",
//         },
//       }}
//     >
//       <Box
//         sx={{
//           flexGrow: 1,
//           overflowY: "auto",
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         <Box
//           sx={{
//             flexGrow: 1,
//             overflowY: "auto",
//             paddingBottom: "16px",
//             marginBottom: "16px",
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           {messages.map((message, index) => (
//             <Box
//               key={index}
//               sx={{
//                 display: "flex",
//                 flexDirection:
//                   message.role === "assistant" ? "row" : "row-reverse",
//                 marginBottom: "8px",
//               }}
//             >
//               <Box
//                 sx={{
//                   maxWidth: "70%",
//                   padding: "10px",
//                   borderRadius: "8px",
//                   backgroundColor:
//                     message.role === "assistant" ? "rgb(20, 209, 209)" : "rgb(20, 209, 209)",
//                   color: message.role === "assistant" ? "#000" : "#000",
//                 }}
//               >
//                 <Typography>{message.content}</Typography>
//               </Box>
//             </Box>
//           ))}
//           {isTyping && (
//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: "row",
//                 marginBottom: "8px",
//               }}
//             >
//               <Box
//                 sx={{
//                   maxWidth: "70%",
//                   padding: "10px",
//                   borderRadius: "8px",
//                   backgroundColor: "#e9ecef",
//                 }}
//               >
//                 <CircularProgress size={24} />
//               </Box>
//             </Box>
//           )}
//           <div ref={endOfMessagesRef} />
//         </Box>

//         <Box
//           component="form"
//           onSubmit={handleSubmit}
//           sx={{ display: "flex", alignItems: "center" }}
//         >
//           <TextField
//             variant="outlined"
//             placeholder="Type your message..."
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             sx={{
//               flexGrow: 1,
//               marginRight: "8px",
//             }}
//             fullWidth
//             autoFocus
//           />
//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             sx={{
//               padding: "10px",
//             }}
//             disabled={!input.trim()}
//           >
//             <SendIcon />
//           </Button>
//         </Box>
//       </Box>
//     </Drawer>
//   );
// };

// export default ChatComponent;

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// import { useState, useRef, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Avatar,
//   Drawer,
//   IconButton,
// } from "@mui/material";
// import SendRoundedIcon from "@mui/icons-material/SendRounded";
// import CloseIcon from "@mui/icons-material/Close";
// import { keyframes } from "@mui/system";
// import axios from "axios";
// import { API_URL } from "../utils/constants";

// // A subtle animation for new messages
// const fadeIn = keyframes`
//   from { opacity: 0; transform: translateY(10px); }
//   to { opacity: 1; transform: translateY(0); }
// `;

// // Keyframes for typing indicator
// const bounce = keyframes`
//   0%, 80%, 100% { transform: scale(0); }
//   40% { transform: scale(1.0); }
// `;

// const TypingIndicator = () => (
//   <Box sx={{ display: "flex", alignItems: "center", ml: 1 }}>
//     <Box sx={{ animation: `${bounce} 1.4s infinite ease-in-out both`, animationDelay: "-0.32s", height: 8, width: 8, backgroundColor: "#8E8E93", borderRadius: "50%", m: "0 2px" }} />
//     <Box sx={{ animation: `${bounce} 1.4s infinite ease-in-out both`, animationDelay: "-0.16s", height: 8, width: 8, backgroundColor: "#8E8E93", borderRadius: "50%", m: "0 2px" }} />
//     <Box sx={{ animation: `${bounce} 1.4s infinite ease-in-out both`, height: 8, width: 8, backgroundColor: "#8E8E93", borderRadius: "50%", m: "0 2px" }} />
//   </Box>
// );

// const ChatComponent = ({ onClose }) => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const endOfMessagesRef = useRef(null);

//   // Initial greeting
//   useEffect(() => {
//     setMessages([
//       { role: "assistant", content: "Hello! I'm your AI Assistant. How can I help you today?" },
//     ]);
//   }, []);

//   // Auto scroll
//   useEffect(() => {
//     endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, isTyping]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     const userMessage = { role: "user", content: input };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");
//     setIsTyping(true);

//     try {
//       // Call your backend instead of Gemini directly
//       const response = await axios.post(`${API_URL}/api/gemini/completion`, {
//         query: input,
//       });

//       const assistantResponse =
//         response.data?.response || "Sorry, I couldn't get a response.";

//       const assistantMessage = { role: "assistant", content: assistantResponse };
//       setMessages((prev) => [...prev, assistantMessage]);
//     } catch (error) {
//       console.error("Error communicating with the API:", error);
//       const errorMessage = {
//         role: "assistant",
//         content: "⚠️ Sorry, there was an error. Please try again.",
//       };
//       setMessages((prev) => [...prev, errorMessage]);
//     } finally {
//       setIsTyping(false);
//     }
//   };

//   return (
//     <Drawer
//       anchor="right"
//       open={true}
//       onClose={onClose}
//       sx={{
//         "& .MuiDrawer-paper": {
//           width: { xs: "100%", sm: 400 },
//           height: "100%",
//           backgroundColor: "#1C1C1E",
//           color: "#FFFFFF",
//           display: "flex",
//           flexDirection: "column",
//           boxShadow: "none",
//           border: "none",
//         },
//       }}
//     >
//       {/* Header */}
//       <Box
//         sx={{
//           p: 2,
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           backgroundColor: "#2C2C2E",
//         }}
//       >
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//           <Avatar sx={{ bgcolor: "#5856D6" }}>AI</Avatar>
//           <Box>
//             <Typography variant="h6" sx={{ fontWeight: "600", lineHeight: 1.2 }}>
//               DeepAI Assistant
//             </Typography>
//             <Typography
//               variant="caption"
//               sx={{ color: "#4CAF50", display: "flex", alignItems: "center", gap: 0.5 }}
//             >
//               <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "#4CAF50" }} />
//               Online
//             </Typography>
//           </Box>
//         </Box>
//         <IconButton onClick={onClose} sx={{ color: "#8E8E93" }}>
//           <CloseIcon />
//         </IconButton>
//       </Box>

//       {/* Messages */}
//       <Box
//         sx={{
//           flexGrow: 1,
//           overflowY: "auto",
//           p: 3,
//           display: "flex",
//           flexDirection: "column",
//           gap: 2.5,
//           backgroundColor: "#1C1C1E",
//           "&::-webkit-scrollbar": { width: "6px" },
//           "&::-webkit-scrollbar-thumb": { backgroundColor: "#3A3A3C", borderRadius: "3px" },
//         }}
//       >
//         {messages.map((message, index) => (
//           <Box
//             key={index}
//             sx={{
//               display: "flex",
//               justifyContent: message.role === "assistant" ? "flex-start" : "flex-end",
//               animation: `${fadeIn} 0.5s ease-in-out`,
//               gap: 1.5,
//               alignItems: "flex-end",
//             }}
//           >
//             {message.role === "assistant" && (
//               <Avatar sx={{ bgcolor: "#5856D6", width: 32, height: 32 }}>AI</Avatar>
//             )}
//             <Box
//               sx={{
//                 maxWidth: "80%",
//                 py: 1.5,
//                 px: 2,
//                 borderRadius: "18px",
//                 backgroundColor: message.role === "assistant" ? "#2C2C2E" : "#5856D6",
//                 color: "#FFFFFF",
//               }}
//             >
//               <Typography variant="body1" sx={{ lineHeight: 1.5, whiteSpace: "pre-wrap" }}>
//                 {message.content}
//               </Typography>
//             </Box>
//             {message.role === "user" && (
//               <Avatar sx={{ bgcolor: "#3A3A3C", width: 32, height: 32 }}>U</Avatar>
//             )}
//           </Box>
//         ))}

//         {isTyping && (
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//             <Avatar sx={{ bgcolor: "#5856D6", width: 32, height: 32 }}>AI</Avatar>
//             <Box
//               sx={{
//                 py: 1.5,
//                 px: 2,
//                 borderRadius: "18px",
//                 backgroundColor: "#2C2C2E",
//                 display: "flex",
//                 alignItems: "center",
//               }}
//             >
//               <TypingIndicator />
//             </Box>
//           </Box>
//         )}
//         <div ref={endOfMessagesRef} />
//       </Box>

//       {/* Input */}
//       <Box
//         component="form"
//         onSubmit={handleSubmit}
//         sx={{
//           p: 2,
//           display: "flex",
//           alignItems: "center",
//           gap: 1.5,
//           backgroundColor: "#2C2C2E",
//         }}
//       >
//         <TextField
//           variant="outlined"
//           placeholder="Type a message..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           fullWidth
//           autoFocus
//           autoComplete="off"
//           maxRows={4}
//           sx={{
//             "& .MuiOutlinedInput-root": {
//               borderRadius: "20px",
//               backgroundColor: "#3A3A3C",
//               "& fieldset": { border: "none" },
//               "& .MuiOutlinedInput-input": {
//                 color: "#F2F2F7",
//                 padding: "12px 20px",
//                 "&::placeholder": { color: "#8E8E93" },
//               },
//             },
//           }}
//         />
//         <Button
//           type="submit"
//           variant="contained"
//           disabled={!input.trim()}
//           sx={{
//             width: 48,
//             height: 48,
//             borderRadius: "50%",
//             backgroundColor: "#5856D6",
//             "&:hover": { backgroundColor: "#4947b8" },
//             "&.Mui-disabled": { backgroundColor: "#3A3A3C", color: "#8E8E93" },
//           }}
//         >
//           <SendRoundedIcon />
//         </Button>
//       </Box>
//     </Drawer>
//   );
// };

// export default ChatComponent;


import { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Drawer,
  IconButton,
} from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import CloseIcon from "@mui/icons-material/Close";
import { keyframes } from "@mui/system";
import axios from "axios";
import { API_URL } from "../utils/constants";

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const bounce = keyframes`
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1.0); }
`;

const TypingIndicator = () => (
  <Box sx={{ display: "flex", alignItems: "center", ml: 1 }}>
    <Box sx={{ animation: `${bounce} 1.4s infinite ease-in-out both`, animationDelay: "-0.32s", height: 8, width: 8, backgroundColor: "#8E8E93", borderRadius: "50%", m: "0 2px" }} />
    <Box sx={{ animation: `${bounce} 1.4s infinite ease-in-out both`, animationDelay: "-0.16s", height: 8, width: 8, backgroundColor: "#8E8E93", borderRadius: "50%", m: "0 2px" }} />
    <Box sx={{ animation: `${bounce} 1.4s infinite ease-in-out both`, height: 8, width: 8, backgroundColor: "#8E8E93", borderRadius: "50%", m: "0 2px" }} />
  </Box>
);

const ChatComponent = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    setMessages([
      { role: "assistant", content: "Hello! I'm your AI Assistant. How can I help you today?" },
    ]);
  }, []);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await axios.post(`${API_URL}/api/gemini/completion`, {
        query: input,
      });

      const assistantResponse =
        response.data?.response || "Sorry, I couldn't get a response.";

      const assistantMessage = { role: "assistant", content: assistantResponse };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error communicating with the API:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Sorry, there was an error. Please try again." },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <Drawer
      anchor="right"
      open={true}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: { xs: "100%", sm: 400 },
          height: "100%",
          backgroundColor: "#1C1C1E",
          color: "#FFFFFF",
          display: "flex",
          flexDirection: "column",
          boxShadow: "none",
          border: "none",
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#2C2C2E",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Avatar sx={{ bgcolor: "rgb(20, 209, 209)" }}>AI</Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "600", lineHeight: 1.2 }}>
              DeepAI Assistant
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "#4CAF50", display: "flex", alignItems: "center", gap: 0.5 }}
            >
              <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "#4CAF50" }} />
              Online
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={onClose} sx={{ color: "#8E8E93" }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Messages */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          p: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2.5,
          backgroundColor: "#1C1C1E",
          "&::-webkit-scrollbar": { width: "6px" },
          "&::-webkit-scrollbar-thumb": { backgroundColor: "#3A3A3C", borderRadius: "3px" },
        }}
      >
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: message.role === "assistant" ? "flex-start" : "flex-end",
              animation: `${fadeIn} 0.5s ease-in-out`,
              gap: 1.5,
              alignItems: "flex-end",
            }}
          >
            {message.role === "assistant" && (
              <Avatar sx={{ bgcolor: "rgb(20, 209, 209)", width: 32, height: 32 }}>AI</Avatar>
            )}
            <Box
              sx={{
                maxWidth: "80%",
                py: 1.5,
                px: 2,
                borderRadius: "18px",
                backgroundColor: message.role === "assistant" ? "#2C2C2E" : "rgb(20, 209, 209)",
                color: "#FFFFFF",
              }}
            >
              <Typography variant="body1" sx={{ lineHeight: 1.5, whiteSpace: "pre-wrap" }}>
                {message.content}
              </Typography>
            </Box>
            {message.role === "user" && (
              <Avatar sx={{ bgcolor: "#3A3A3C", width: 32, height: 32 }}>U</Avatar>
            )}
          </Box>
        ))}

        {isTyping && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Avatar sx={{ bgcolor: "rgb(20, 209, 209)", width: 32, height: 32 }}>AI</Avatar>
            <Box
              sx={{
                py: 1.5,
                px: 2,
                borderRadius: "18px",
                backgroundColor: "#2C2C2E",
                display: "flex",
                alignItems: "center",
              }}
            >
              <TypingIndicator />
            </Box>
          </Box>
        )}
        <div ref={endOfMessagesRef} />
      </Box>

      {/* Input */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          backgroundColor: "#2C2C2E",
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          fullWidth
          autoFocus
          autoComplete="off"
          maxRows={4}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px",
              backgroundColor: "#3A3A3C",
              "& fieldset": { border: "none" },
              "& .MuiOutlinedInput-input": {
                color: "#F2F2F7",
                padding: "12px 20px",
                "&::placeholder": { color: "#8E8E93" },
              },
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={!input.trim()}
          sx={{
            width: 30,
            height: 45,
            borderRadius: "50%",
            backgroundColor: "rgb(20, 209, 209)",
            "&:hover": { backgroundColor: "rgb(20, 209, 209)" },
            "&.Mui-disabled": { backgroundColor: "#3A3A3C", color: "#8E8E93" },
          }}
        >
          <SendRoundedIcon />
        </Button>
      </Box>
    </Drawer>
  );
};

export default ChatComponent;
