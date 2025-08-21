import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import {
  fetchTasks,
  updateTaskAsync,
  updateTaskStatus,
  addTaskAsync,
} from "../features/taskSlice";
import TaskColumn from "./TaskColumn";
import ChatComponent from "./ChatComponent";
import {
  Box,
  Fab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Typography,
  Container,
  Stack,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import AddIcon from "@mui/icons-material/Add";
import { Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/authSlice";

const Taskboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tasks } = useSelector((state) => state.tasks);
  const { user } = useSelector((state) => state.auth);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAddTaskFormOpen, setIsAddTaskFormOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    status: "pending",
    description: "",
  });

  const isFormValid = newTask.title && newTask.description && newTask.status;

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

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

  const columns = {
    pending: tasks.filter((task) => task.status === "pending") || [],
    ongoing: tasks.filter((task) => task.status === "ongoing") || [],
    completed: tasks.filter((task) => task.status === "completed") || [],
  };

  const onDragEnd = (result) => {
    const source = result?.source;
    const destination = result?.destination;
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const taskToMove = { ...columns[source.droppableId][source.index] };
    taskToMove.status = destination.droppableId;

    dispatch(updateTaskStatus(taskToMove));
    dispatch(
      updateTaskAsync({ _id: taskToMove._id, status: taskToMove.status })
    );
  };

  const handleAddTask = () => {
    dispatch(addTaskAsync(newTask));
    setIsAddTaskFormOpen(false);
    setNewTask({ title: "", status: "pending", description: "" });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
        position: "relative",
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

      {/* Header */}
      <Box
        sx={{
          background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          padding: { xs: "15px 20px", md: "20px 30px" },
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Box>
              <Typography
                variant="h4"
                sx={{
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: { xs: "1.5rem", md: "2rem" },
                  textShadow: "0 2px 6px rgba(0,0,0,0.35)",
                }}
              >
                {getTimeBasedGreeting()}, {user?.username}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#b5b5b5",
                  mt: 0.5,
                  fontSize: { xs: "0.875rem", md: "1rem" },
                }}
              >
                Manage your tasks efficiently
              </Typography>
            </Box>

            <Stack direction="row" spacing={2} alignItems="center">
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setIsAddTaskFormOpen(true)}
                sx={{
                  background: "linear-gradient(45deg, #14d1d1, #00a8a8)",
                  color: "#fff",
                  fontWeight: 600,
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  textTransform: "none",
                  fontSize: { xs: "0.875rem", md: "1rem" },
                  boxShadow: "0 4px 15px rgba(20, 209, 209, 0.3)",
                  "&:hover": {
                    background: "linear-gradient(45deg, #00a8a8, #14d1d1)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 25px rgba(20, 209, 209, 0.4)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Add Task
              </Button>

              <Button
                variant="outlined"
                startIcon={<Logout />}
                onClick={handleLogout}
                sx={{
                  borderColor: "rgba(255,255,255,0.3)",
                  color: "#fff",
                  fontWeight: 600,
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  textTransform: "none",
                  fontSize: { xs: "0.875rem", md: "1rem" },
                  "&:hover": {
                    borderColor: "#ff4757",
                    backgroundColor: "rgba(255, 71, 87, 0.1)",
                    color: "#ff4757",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Logout
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: 4, position: "relative", zIndex: 1 }}>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="container">
            <div className="row gx-3">
              {Object.entries(columns).map(([status, tasks]) => (
                <TaskColumn key={status} status={status} tasks={tasks} />
              ))}
            </div>
          </div>
        </DragDropContext>
      </Container>

      {/* Chat Button */}
      {!isChatOpen && (
        <Box
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 9999,
          }}
        >
          <Fab
            sx={{
              backgroundColor: "rgb(20, 209, 209)",
              color: "#000",
              borderRadius: "50%",
              width: 60,
              height: 60,
              boxShadow: "0px 4px 12px rgba(0, 123, 255, 0.3)",
            }}
            onClick={() => setIsChatOpen(true)}
          >
            <ChatIcon />
          </Fab>
        </Box>
      )}

      {/* Add Task Dialog */}
      <Dialog
        open={isAddTaskFormOpen}
        onClose={() => setIsAddTaskFormOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 3,
          },
        }}
      >
        <DialogTitle
          sx={{
            color: "#fff",
            fontWeight: 700,
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          Add New Task
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <p style={{ color: "#ff6b6b", marginBottom: "1rem" }}>All fields are required *</p>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
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
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
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
            select
            label="Status"
            fullWidth
            margin="normal"
            value={newTask.status}
            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
            SelectProps={{
              native: true,
            }}
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
          >
            <option value="pending">Pending</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </TextField>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button 
            onClick={() => setIsAddTaskFormOpen(false)} 
            sx={{
              color: "#b5b5b5",
              "&:hover": {
                color: "#fff",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddTask}
            variant="contained"
            disabled={!isFormValid}
            sx={{
              background: "linear-gradient(45deg, #14d1d1, #00a8a8)",
              color: "#fff",
              fontWeight: 600,
              px: 3,
              py: 1,
              borderRadius: 2,
              textTransform: "none",
              "&:hover": {
                background: "linear-gradient(45deg, #00a8a8, #14d1d1)",
              },
              "&:disabled": {
                background: "rgba(255,255,255,0.1)",
                color: "#b5b5b5",
              },
            }}
          >
            Add Task
          </Button>
        </DialogActions>
      </Dialog>

      {/* Chat Component */}
      {isChatOpen && (
        <Box
          sx={{
            position: "fixed",
            bottom: 80,
            right: 20,
            zIndex: 10000,
            width: 350,
            height: 400,
            overflow: "hidden",
          }}
        >
          <ChatComponent onClose={() => setIsChatOpen(false)} />
        </Box>
      )}
    </Box>
  );
};

export default Taskboard;
