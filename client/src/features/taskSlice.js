import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../utils/constants";

const withAuth = (getState) => {
	const state = getState();
	const token = state?.auth?.token || localStorage.getItem("token");
	return {
		headers: {
			Authorization: token ? `Bearer ${token}` : "",
			"Content-Type": "application/json",
		},
	};
};

export const fetchTasks = createAsyncThunk(
	"tasks/fetchTasks",
	async (_, { rejectWithValue, getState }) => {
		try {
			const response = await axios.get(`${API_URL}/api/tasks`, withAuth(getState));
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response?.data?.message || "Failed to fetch tasks");
		}
	}
);

export const addTaskAsync = createAsyncThunk("tasks/addTask", async (task, { rejectWithValue, getState }) => {
	try {
		const response = await axios.post(`${API_URL}/api/tasks`, task, withAuth(getState));
		return response.data;
	} catch (error) {
		return rejectWithValue(error.response?.data?.message || "Failed to add task");
	}
});

export const updateTaskAsync = createAsyncThunk(
	"tasks/updateTask",
	async ({ _id, title, description, status }, { rejectWithValue, getState }) => {
		try {
			const payload = {};
			if (title !== undefined) payload.title = title;
			if (description !== undefined) payload.description = description;
			if (status !== undefined) payload.status = status;
			const response = await axios.put(`${API_URL}/api/tasks/${_id}`, payload, withAuth(getState));
			return response.data; // returns the updated task
		} catch (error) {
			return rejectWithValue(error.response?.data?.message || "Failed to update task");
		}
	}
);

export const deleteTaskAsync = createAsyncThunk(
	"tasks/deleteTask",
	async (_id, { rejectWithValue, getState }) => {
		try {
			await axios.delete(`${API_URL}/api/tasks/${_id}`, withAuth(getState));
			return _id;
		} catch (error) {
			return rejectWithValue(error.response?.data?.message || "Failed to delete task");
		}
	}
);

const taskSlice = createSlice({
	name: "tasks",
	initialState: {
		tasks: [],
		loading: false,
		error: null
	},

	reducers: {
		optimisticAddTask: (state, action) => {
			state.tasks.push(action.payload);
			state.addedTask = action.payload;
		},

		updateTaskStatus: (state, action) => {
			const { _id, status } = action.payload
			console.log("reduce triggered", _id, status)
			const task = state.tasks.find(task => task._id === _id)
			if (task) {
				task.status = status
			}
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTasks.pending, (state) => {
				state.loading = true;
				state.error = null
			})
			.addCase(fetchTasks.fulfilled, (state, action) => {
				state.loading = false;
				state.tasks = action.payload
			})
			.addCase(fetchTasks.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || action.error.message;
			})

			.addCase(addTaskAsync.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(addTaskAsync.fulfilled, (state, action) => {
				state.loading = false;
				const newTask = action.payload;
				const exists = state.tasks.some((t) => t._id === newTask._id);
				if (!exists) {
					state.tasks.push(newTask);
				}
			})
			.addCase(addTaskAsync.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || action.error.message;
			})

			.addCase(updateTaskAsync.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateTaskAsync.fulfilled, (state, action) => {
				state.loading = false;
				const updatedTask = action.payload;
				const index = state.tasks.findIndex((task) => task._id === updatedTask._id);
				if (index !== -1) {
					state.tasks[index] = updatedTask; // replace old with updated
				}
			})
			.addCase(updateTaskAsync.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || action.error.message;
			})
			.addCase(deleteTaskAsync.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deleteTaskAsync.fulfilled, (state, action) => {
				state.loading = false;
				state.tasks = state.tasks.filter((task) => task._id !== action.payload);
			})
			.addCase(deleteTaskAsync.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || action.error.message;
			});
	}
})

export const { updateTaskStatus, optimisticAddTask } = taskSlice.actions
export default taskSlice.reducer;