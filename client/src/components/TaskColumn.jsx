import { Droppable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import { Box, Paper, Typography, Chip, Stack } from "@mui/material";
import HourglassEmptyOutlinedIcon from "@mui/icons-material/HourglassEmptyOutlined";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const STATUS_META = {
  pending: {
    label: "Pending",
    color: "#f59e0b",
    icon: <HourglassEmptyOutlinedIcon sx={{ color: "#fbbf24" }} />,
    surface: "rgba(251, 191, 36, 0.12)",
  },
  ongoing: {
    label: "Ongoing",
    color: "#3b82f6",
    icon: <PlayCircleOutlineIcon sx={{ color: "#60a5fa" }} />,
    surface: "rgba(59, 130, 246, 0.12)",
  },
  completed: {
    label: "Completed",
    color: "#22c55e",
    icon: <CheckCircleOutlineIcon sx={{ color: "#34d399" }} />,
    surface: "rgba(34, 197, 94, 0.12)",
  },
};

const TaskColumn = ({ status, tasks }) => {
  const meta = STATUS_META[status] || STATUS_META.pending;

  return (
    <div className="col-md-4 mb-5">
      <Paper
        elevation={3}
        sx={{
          p: 2,
          borderRadius: 2,
          background: `linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))`,
          backdropFilter: "blur(4px)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Box
              sx={{
                width: 34,
                height: 34,
                borderRadius: 1.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: meta.surface,
                border: `1px solid ${meta.surface.replace("0.12", "0.3")}`,
              }}
            >
              {meta.icon}
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: "#e5e7eb" }}>
              {meta.label}
            </Typography>
          </Stack>
          <Chip
            label={tasks.length}
            size="small"
            sx={{
              color: "#fff",
              fontWeight: 700,
              background: meta.color,
            }}
          />
        </Stack>

        <Droppable droppableId={status}>
          {(provided, snapshot) => (
            <Box
              ref={provided.innerRef}
              {...provided.droppableProps}
              sx={{
                p: 1.5,
                minHeight: 240,
                borderRadius: 2,
                backgroundColor: snapshot.isDraggingOver ? meta.surface : "rgba(255,255,255,0.04)",
                border: `1px dashed ${snapshot.isDraggingOver ? meta.color : "rgba(255,255,255,0.08)"}`,
                transition: "background-color 0.2s ease, border-color 0.2s ease",
              }}
            >
              {tasks.length === 0 && (
                <Box sx={{ py: 3, textAlign: "center", color: "#9ca3af", fontSize: 14 }}>
                  No tasks here yet
                </Box>
              )}
              {tasks.map((task, index) => (
                <TaskCard key={task._id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </Paper>
    </div>
  );
};

export default TaskColumn;
