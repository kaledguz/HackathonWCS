import { getUserByEmailAndPassword } from "../models/authModel.js"

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await getUserByEmailAndPassword(email, password)
    if (user) {
      res.status(200).json(user)
    } else {
      res.status(401).json({ message: "Invalid email or password" })
    }
  } catch (err) {
    console.error("Failed to login user:", err)
    res
      .status(500)
      .json({ message: "Failed to login user", error: err.message })
  }
}
