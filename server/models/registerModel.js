import db from '../db.js';

export const createLoginUser = async (loginUser) => {
  try {
    const { email, password } = loginUser;
    const [result] = await db.query('INSERT INTO login_user (email, mot_de_passe, created_at, last_connection_at) VALUES (?, ?, NOW(), NOW())', [email, password]);
    return { id_login_user: result.insertId, email };
  } catch (err) {
    console.error('Error creating login user:', err);
    throw err;
  }
};
