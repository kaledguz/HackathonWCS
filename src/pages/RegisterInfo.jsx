import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RegisterInfo() {
  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    sexe: "",
    age: "",
    mentor: false,
    lgbt: "",
    handicap: false,
    type_handicap: "",
    niveau_professionnel: "",
    categorie_socio_professionnel: "" 
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const id_login_user = localStorage.getItem('id_login_user');
    if (!id_login_user) {
      setErrors({ submit: "User ID is missing. Please register first." });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id_login_user = localStorage.getItem('id_login_user');
    if (!id_login_user) {
      setErrors({ submit: "User ID is missing. Please register first." });
      return;
    }
    try {
      const response = await fetch('http://localhost:4000/api/register-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          id_login_user
        })
      });

      if (response.ok) {
        console.log("User info created successfully");
        navigate("/chatInterface");
      } else {
        const errorData = await response.json();
        console.error("Error creating user info:", errorData);
        setErrors({ submit: errorData.message || "Failed to create user info. Please try again." });
      }
    } catch (error) {
      console.error("Error:", error);
      setErrors({ submit: "Failed to create user info. Please try again." });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-900 via-purple-800 to-purple-700">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-3xl font-bold text-center">Register Info</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              name="prenom"
              id="prenom"
              placeholder="Enter your first name"
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
              placeholder="Enter your last name"
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
              <option value="">Select your gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <input
              type="date"
              name="age"
              id="age"
              placeholder="Enter your age"
              value={formData.age}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
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
              <option value="">Select your LGBT status</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
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
            <label htmlFor="handicap" className="text-gray-700">Do you have a disability?</label>
          </div>
          <div>
            <input
              type="text"
              name="type_handicap"
              id="type_handicap"
              placeholder="Type of disability"
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
              placeholder="Professional level"
              value={formData.niveau_professionnel}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <select
              name="categorie_socio_professionnel" 
              id="categorie_socio_professionnel"
              value={formData.categorie_socio_professionnel}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select your socio-professional category</option>
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
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Register Info
            </button>
          </div>
          {errors.submit && (
            <p className="mt-2 text-sm text-center text-red-500">{errors.submit}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default RegisterInfo;
