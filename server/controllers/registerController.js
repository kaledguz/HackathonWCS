import { createLoginUser } from '../models/registerModel.js';

export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const loginUser = await createLoginUser({ email, password });
    res.status(201).json(loginUser);
  } catch (err) {
    console.error('Failed to register user:', err);
    res.status(500).json({ message: 'Failed to register user', error: err.message });
  }
};
