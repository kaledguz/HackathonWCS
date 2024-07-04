import db from '../db.js';

export const getAllUsers = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM user_info');
    return rows;
  } catch (err) {
    console.error('Error fetching users:', err);
    throw err;
  }
};

export const getUserById = async (id) => {
  try {
    const [rows] = await db.query('SELECT * FROM user_info WHERE id_user_info = ?', [id]);
    return rows[0];
  } catch (err) {
    console.error('Error fetching user by ID:', err);
    throw err;
  }
};

export const createUser = async (user) => {
  try {
    const { prenom, nom, sexe, age, mentor, lgbt, handicap, type_handicap, niveau_professionnel, categorie_socio_professionel, nombre_de_participation, id_login_user } = user;
    const [result] = await db.query('INSERT INTO user_info (prenom, nom, sexe, age, mentor, lgbt, handicap, type_handicap, niveau_professionnel, categorie_socio_professionel, nombre_de_participation, id_login_user) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
    [prenom, nom, sexe, age, mentor, lgbt, handicap, type_handicap, niveau_professionnel, categorie_socio_professionel, nombre_de_participation, id_login_user]);
    return { id_user_info: result.insertId, ...user };
  } catch (err) {
    console.error('Error creating user:', err);
    throw err;
  }
};

export const updateUser = async (id, user) => {
  try {
    const { prenom, nom, sexe, age, mentor, lgbt, handicap, type_handicap, niveau_professionnel, categorie_socio_professionel, nombre_de_participation, id_login_user } = user;
    await db.query('UPDATE user_info SET prenom = ?, nom = ?, sexe = ?, age = ?, mentor = ?, lgbt = ?, handicap = ?, type_handicap = ?, niveau_professionnel = ?, categorie_socio_professionel = ?, nombre_de_participation = ?, id_login_user = ? WHERE id_user_info = ?', 
    [prenom, nom, sexe, age, mentor, lgbt, handicap, type_handicap, niveau_professionnel, categorie_socio_professionel, nombre_de_participation, id_login_user, id]);
    return { id_user_info: id, ...user };
  } catch (err) {
    console.error('Error updating user:', err);
    throw err;
  }
};

export const deleteUser = async (id) => {
  try {
    await db.query('DELETE FROM user_info WHERE id_user_info = ?', [id]);
  } catch (err) {
    console.error('Error deleting user:', err);
    throw err;
  }
};
