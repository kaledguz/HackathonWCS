import db from '../db.js';

export const createUser = async (user) => {
  try {
    const { prenom, nom, sexe, age, mentor, lgbt, handicap, type_handicap, niveau_professionnel, categorie_socio_professionnelle, id_login_user } = user;
    const [result] = await db.query(
      'INSERT INTO user_info (prenom, nom, sexe, age, mentor, lgbt, handicap, type_handicap, niveau_professionnel, categorie_socio_professionnelle, id_login_user) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [prenom, nom, sexe, age, mentor, lgbt, handicap, type_handicap, niveau_professionnel, categorie_socio_professionnelle, id_login_user]
    );
    return { id_user_info: result.insertId, ...user };
  } catch (err) {
    console.error('Error creating user info:', err);
    throw err;
  }
};
