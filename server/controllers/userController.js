import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../models/userModel.js';

export const fetchAllUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).send('Failed to fetch users');
  }
};

export const fetchUserById = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.json(user);
  } catch (err) {
    res.status(500).send('Failed to fetch user');
  }
};

export const addUser = async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).send('Failed to create user');
  }
};

export const modifyUser = async (req, res) => {
  try {
    const user = await updateUser(req.params.id, req.body);
    res.json(user);
  } catch (err) {
    res.status(500).send('Failed to update user');
  }
};

export const removeUser = async (req, res) => {
  try {
    await deleteUser(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).send('Failed to delete user');
  }
};
