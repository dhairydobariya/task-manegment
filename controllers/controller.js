require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET; 
const User = require('../model/usermodel');
const Task = require('../model/taskmodel');


const defaults = (req, res) => {
    res.send("It's the default route, please sign in");
};

const register = async (req, res) => {
    const { name, password, roll } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, password: hashedPassword, roll });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};


const login = async (req, res) => {
    const { name, password } = req.body;
    try {
        const user = await User.findOne({ name });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ data: user }, secret);
        res.cookie('token', token, { httpOnly: true });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const addTaskForUser = async (req, res) => {
    const { taskname, description, status, category } = req.body;
    const userId = req.user._id; 

    try {
        const task = new Task({
            taskname,
            description,
            status,
            createdby: userId,
            assignedTo: userId, 
            category
        });

        await task.save();
        res.status(201).json({ message: 'Task added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const addTaskForAdmin = async (req, res) => {
    const { taskname, description, status, category, assignedTo } = req.body;
    const userId = req.user._id; 

    try {
        const createdBy = assignedTo ? assignedTo : userId;

        const task = new Task({
            taskname,
            description,
            status,
            createdby: userId,
            assignedTo: createdBy,
            category
        });

        await task.save();
        res.status(201).json({ message: 'Task added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const gettasks = async (req, res) => {
    try {
        const filter = req.user.roll === 'admin' ? {} : { assignedTo: req.user._id };
        const tasks = await Task.find(filter);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const updatetasks = async (req, res) => {
    const { id } = req.params;
    const { taskname, description, status, category } = req.body;

    try {
        const task = await Task.findById(id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        if (req.user.roll !== 'admin' && task.assignedTo.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Forbidden: You can only update your own tasks' });
        }

        const updatedTask = await Task.findByIdAndUpdate(id, { taskname, description, status, category }, { new: true });
        res.status(200).json({ message: 'Task updated successfully', updatedTask });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const deletetask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findById(id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        if (req.user.roll !== 'admin' && task.assignedTo.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Forbidden: You can only delete your own tasks' });
        }

        await Task.findByIdAndDelete(id);
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const updateTaskByAdmin = async (req, res) => {
    const { id } = req.params;
    const { taskname, description, status, category, assignedTo } = req.body;

    try {
        const task = await Task.findById(id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        const updatedTask = await Task.findByIdAndUpdate(id, { taskname, description, status, category, assignedTo }, { new: true });
        res.status(200).json({ message: 'Task updated successfully', updatedTask });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const deleteTaskByAdmin = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findById(id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        await Task.findByIdAndDelete(id);
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, roll } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, { name, roll }, { new: true });
        if (!updatedUser) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User updated successfully', updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        await User.findByIdAndDelete(id);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    defaults,
    register,
    login,
    addTaskForUser,
    addTaskForAdmin,
    gettasks,
    updatetasks,
    deletetask,
    getAllTasks,
    updateTaskByAdmin,
    deleteTaskByAdmin,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};
