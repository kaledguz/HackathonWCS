import db from '../db.js';

export const authenticateUser = async (email, password) => {
  try {
    const [rows] = await db.query('SELECT * FROM login_user WHERE email = ? AND mot_de_passe = ?', [email, password]);
    if (rows.length > 0) {
      return rows[0];
    } else {
      return null;
    }
  } catch (err) {
    console.error('Error authenticating user:', err);
    throw err;
  }
};
