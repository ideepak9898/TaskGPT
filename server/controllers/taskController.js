// const Task = require("../model/task.model");

// exports.getAllTasks = async (req,res) => {
//     try {
//         const tasks = await Task.find();
//         return res.status(200).json(tasks);
//     } catch (error) {
//        console.log(error)
//         res.status(500).json({ message: error.message });
//     }
// }

// exports.createTask = async (req, res) => {
//     const {title, description, status} = req.body;
//     try {
//         console.log("➡️ Received POST request with data:", req.body);
//         const newTask = new Task({title, description, status});
//         await newTask.save();
//         console.log("✅ Task saved to DB:", newTask);
//         res.status(201).json({message : "Task Created Successfully", newTask})
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message :error.message})
//     }
// }


// exports.updateTask = async (req, res) => {
//     const { id } = req.params;
//     const { title, description, status } = req.body;
//     try {
//         const updatedTask = await Task.findByIdAndUpdate(

//             id,
//             { title, description, status },
//             { new: true }  
//         );
//         if (!updatedTask) return res.status(404).json({ message: 'Task not found' });
//         res.status(200).json(updatedTask);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };


// exports.deleteTask = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const deletedTask = await Task.findByIdAndDelete(id);
//         if (!deletedTask) return res.status(404).json({ message: 'Task not found' });
//         res.status(200).json({ message: 'Task deleted' });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };


const Task = require("../model/task.model");

// 📌 Get all tasks for logged-in user
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id }); // only this user's tasks
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📌 Create new task for logged-in user
exports.createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const newTask = new Task({
      title,
      description,
      status: status || "pending",
      userId: req.user.id, // attach user
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 📌 Update task (only if it belongs to logged-in user)
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and update only if task belongs to user
    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      req.body,
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found or not authorized" });
    }

    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 📌 Delete task (only if it belongs to logged-in user)
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findOneAndDelete({
      _id: id,
      userId: req.user.id,
    });

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found or not authorized" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};