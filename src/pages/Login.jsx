import { useNavigate } from 'react-router-dom';

function Login() {
  const redirectInscription = useNavigate();

  const handleClick = () => {
    redirectInscription('/register');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Se connecter</h2>
        <div className="space-y-4">
          <div>
            <input
              type="text"
              name="mail"
              id="mail"
              placeholder="Entrez votre adresse mail"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Entrez votre mot de passe"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <button
              type="button"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Se connecter
            </button>
          </div>
          <p className="text-center text-gray-700">Ou</p>
          <div>
            <button
              type="button"
              onClick={handleClick}
              className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              S&apos;inscrire
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
