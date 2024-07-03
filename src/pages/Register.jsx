import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    sexe: '',
    age: '',
    email: '',
    password: '',
    confirmPassword: '',
    mentor: false,
    lgbt: '',
    handicap: false,
    type_handicap: '',
    niveau_professionnel: '',
    categorie_socio_professionnelle: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validateForm = () => {
    let formErrors = {};
    if (formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form data', formData);
      navigate('/login');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">S'inscrire</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="prenom"
              id="prenom"
              placeholder="Entrez votre prénom"
              value={formData.prenom}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="nom"
              id="nom"
              placeholder="Entrez votre nom"
              value={formData.nom}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <select
              name="sexe"
              id="sexe"
              value={formData.sexe}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Sélectionnez votre sexe</option>
              <option value="Homme">Homme</option>
              <option value="Femme">Femme</option>
              <option value="Autre">Autre</option>
            </select>
          </div>
          <div>
            <input
              type="number"
              name="age"
              id="age"
              placeholder="Entrez votre âge"
              value={formData.age}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Entrez votre adresse mail"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Entrez votre mot de passe"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirmez votre mot de passe"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>
          
          <div>
            <select
              name="lgbt"
              id="lgbt"
              value={formData.lgbt}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Sélectionnez votre statut LGBT</option>
              <option value="Oui">Oui</option>
              <option value="Non">Non</option>
            </select>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="handicap"
              id="handicap"
              checked={formData.handicap}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="handicap" className="text-gray-700">Avez-vous un handicap ?</label>
          </div>
          <div>
            <input
              type="text"
              name="type_handicap"
              id="type_handicap"
              placeholder="Type de handicap"
              value={formData.type_handicap}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="text"
              name="niveau_professionnel"
              id="niveau_professionnel"
              placeholder="Niveau professionnel"
              value={formData.niveau_professionnel}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <select
              name="categorie_socio_professionnelle"
              id="categorie_socio_professionnelle"
              value={formData.categorie_socio_professionnelle}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Sélectionnez votre catégorie socio-professionnelle</option>
              <option value="Agriculteur">Agriculteur</option>
              <option value="Artisan">Artisan</option>
              <option value="Cadre">Cadre</option>
              <option value="Commerçant">Commerçant</option>
              <option value="Employé">Employé</option>
              <option value="Ouvrier">Ouvrier</option>
              <option value="Profession libérale">Profession libérale</option>
              <option value="Retraité">Retraité</option>
              <option value="Sans emploi">Sans emploi</option>
              <option value="Étudiant">Étudiant</option>
            </select>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="mentor"
              id="mentor"
              checked={formData.mentor}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="mentor" className="text-gray-700">Êtes-vous un mentor ?</label>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register
