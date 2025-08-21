// const express = require("express");
// const router = express.Router();
// const taskController = require("../controllers/taskController");

// router.use(authMiddleware); // all task routes require authentication

// router.get("/tasks", taskController.getAllTasks);
// router.post("/tasks", taskController.createTask);
// router.put("/tasks/:id", taskController.updateTask);
// router.delete("/tasks/:id", taskController.deleteTask);

// module.exports = router

const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const { authenticateUser } = require("../middleware/authMiddleware");

// 🔒 All task routes are protected
router.use(authenticateUser);

// ✅ Routes (no extra `/tasks`, since mounted at `/api/tasks` in index.js)
router.get("/", taskController.getAllTasks);
router.post("/", taskController.createTask);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;