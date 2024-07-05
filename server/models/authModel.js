import db from "../db.js"

export const getUserByEmailAndPassword = async (email, password) => {
  const query = "SELECT * FROM login_user WHERE email = ? AND mot_de_passe = ?"
  const values = [email, password]

  try {
    const [rows] = await db.query(query, values)
    if (rows.length > 0) {
      return rows[0]
    } else {
      return null
    }
  } catch (err) {
    console.error("Error fetching user:", err)
    throw err
  }
}
