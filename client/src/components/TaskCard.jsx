// import { Draggable } from "react-beautiful-dnd";
// import {
//   Card,
//   CardContent,
//   CardActions,
//   IconButton,
//   Typography,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { useDispatch } from "react-redux";
// import { deleteTaskAsync } from "../features/taskSlice";
// import { useSnackbar } from "notistack";

// const TaskCard = ({ task, index }) => {
//   const dispatch = useDispatch();
//   const { enqueueSnackbar } = useSnackbar();

//   const handleDeleteTask = () => {
//     enqueueSnackbar("Task deleted successfully!", { variant: "success" });
//     dispatch(deleteTaskAsync(task._id));
//   };

//   return (
//     <Draggable draggableId={task._id} index={index}>
//       {(provided) => (
//         <Card
//           ref={provided.innerRef}
//           {...provided.draggableProps}
//           {...provided.dragHandleProps}
//           sx={{
//             maxWidth: 345,
//             marginBottom: 2,
//             boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//             borderRadius: 2,
//             transition: "transform 0.3s ease",
//             "&:hover": {
//               transform: "scale(1.05)",
//             },
//             position: "relative",
//           }}
//         >
//           <CardContent>
//             <Typography
//               variant="h6"
//               component="div"
//               sx={{
//                 fontWeight: "600",
//                 marginBottom: 1,
//               }}
//             >
//               {task.title.charAt(0).toUpperCase() + task.title.slice(1)}
//             </Typography>

//             <Typography
//               variant="body2"
//               color="text.secondary"
//               sx={{ marginBottom: 1 }}
//             >
//               <strong>Status: </strong> {task.status}
//             </Typography>

//             <Typography
//               variant="body2"
//               color="text.primary"
//               sx={{
//                 fontSize: "0.9rem",
//                 lineHeight: 1.5,
//                 color: "#444",
//               }}
//             >
//               {task.description}
//             </Typography>
//           </CardContent>

//           <CardActions
//             sx={{
//               position: "absolute",
//               top: 8,
//               right: 8,
//               padding: 0,
//             }}
//           >
//             <IconButton
//               onClick={handleDeleteTask}
//               color="error"
//               aria-label="delete"
//               size="small"
//               sx={{
//                 backgroundColor: "#fff",
//                 borderRadius: "50%",
//                 boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//                 "&:hover": {
//                   transform: "scale(1.1)",
//                 },
//               }}
//             >
//               <DeleteIcon />
//             </IconButton>
//           </CardActions>
//         </Card>
//       )}
//     </Draggable>
//   );
// };

// export default TaskCard;


import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import {
  Card,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { deleteTaskAsync, updateTaskAsync } from "../features/taskSlice";
import { useSnackbar } from "notistack";

const TaskCard = ({ task, index }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: task.title,
    description: task.description,
    status: task.status,
  });

  // delete handler
  const handleDeleteTask = () => {
    enqueueSnackbar("Task deleted successfully!", { variant: "success" });
    dispatch(deleteTaskAsync(task._id));
  };

  // edit handler
  const handleUpdateTask = () => {
    dispatch(updateTaskAsync({ _id: task._id, ...editedTask }));
    enqueueSnackbar("Task updated successfully!", { variant: "success" });
    setOpen(false);
  };

  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{
            maxWidth: 345,
            marginBottom: 2,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            borderRadius: 2,
            transition: "transform 0.3s ease",
            "&:hover": { transform: "scale(1.05)" },
            position: "relative",
          }}
        >
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: "600", marginBottom: 1 }}>
              {task.title.charAt(0).toUpperCase() + task.title.slice(1)}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
              <strong>Status: </strong> {task.status}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: "0.9rem", lineHeight: 1.5, color: "#444" }}>
              {task.description}
            </Typography>
          </CardContent>

          <CardActions sx={{ position: "absolute", top: 8, right: 8, gap: 1 }}>
            {/* Edit Button */}
            <IconButton
              onClick={() => setOpen(true)}
              color="primary"
              size="small"
              sx={{
                backgroundColor: "#fff",
                borderRadius: "50%",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                "&:hover": { transform: "scale(1.1)" },
              }}
            >
              <EditIcon />
            </IconButton>

            {/* Delete Button */}
            <IconButton
              onClick={handleDeleteTask}
              color="error"
              size="small"
              sx={{
                backgroundColor: "#fff",
                borderRadius: "50%",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                "&:hover": { transform: "scale(1.1)" },
              }}
            >
              <DeleteIcon />
            </IconButton>
          </CardActions>

          {/* Edit Dialog */}
          <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogContent>
              <TextField
                fullWidth
                margin="dense"
                label="Title"
                value={editedTask.title}
                onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
              />
              <TextField
                fullWidth
                margin="dense"
                label="Description"
                multiline
                rows={3}
                value={editedTask.description}
                onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
              />
              <TextField
                fullWidth
                margin="dense"
                label="Status"
                value={editedTask.status}
                onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value })}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={handleUpdateTask} variant="contained" color="primary">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </Card>
      )}
    </Draggable>
  );
};

export default TaskCard;