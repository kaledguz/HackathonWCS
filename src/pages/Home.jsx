import { Link } from "react-router-dom"
import Image from "../assets/img/logohome.png"

const Home = () => {
  return (
    <div>
      <main>
        <section className="hero min-h-screen flex flex-col justify-center py-12 bg-gradient-to-r from-purple-900 via-purple-800 to-purple-700">
          <div className="container mx-auto flex flex-col md:flex-row items-center h-full">
            <div className="w-full md:w-1/3 flex flex-col justify-center h-full text-center md:text-left mb-10 md:mb-0">
              <h1 className="text-4xl font-bold mb-8 text-white leading-tight">
                Bienvenue sur la Plateforme de Mentorat Inclusif
              </h1>
              <p className="text-lg mb-12 text-white leading-relaxed">
                Connectez-vous avec des mentors et mentorés de divers horizons
                pour promouvoir l égalité des opportunités et bénéficier de
                conseils pour votre développement professionnel.
              </p>
              <div className="buttons space-x-4 mt-10">
                <Link
                  to="/login"
                  className="btn bg-violet-500 text-white py-4 px-6 rounded hover:bg-violet-700"
                >
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className="btn bg-violet-500 text-white py-4 px-6 rounded hover:bg-violet-700"
                >
                  Inscription
                </Link>
              </div>
            </div>
            <div className="w-full md:w-2/3 mt-10 md:mt-0 text-center">
              <img
                src={Image}
                alt="Mentoring illustration"
                className="w-full max-w-5xl mx-auto"
              />
            </div>
          </div>
        </section>
        <section className="features py-12 bg-white">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Fonctionnalités Proposées
            </h2>
            <ul className="list-disc list-inside space-y-2 text-lg">
              <li>Profils détaillés des mentors et mentorés</li>
              <li>Algorithme de matching avancé</li>
              <li>Messagerie intégrée pour une communication facile</li>
              <li>Planification de rendez-vous avec notifications de rappel</li>
              <li>Partage de documents et ressources</li>
              <li>Suivi des progrès et évaluation</li>
            </ul>
          </div>
        </section>
      </main>
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>
            &copy; 2024 Plateforme de Mentorat Inclusif. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Home
