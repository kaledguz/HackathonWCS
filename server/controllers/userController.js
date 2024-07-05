import { createUser } from '../models/userModel.js';

export const registerInfo = async (req, res) => {
  try {
    const userInfo = await createUser(req.body);
    res.status(201).json(userInfo);
  } catch (err) {
    console.error('Failed to register user info:', err);
    res.status(500).json({ message: 'Failed to register user info', error: err.message });
  }
};
