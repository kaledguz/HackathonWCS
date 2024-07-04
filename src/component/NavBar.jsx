function NavBar() {
  return (
    <nav className="fixed top-0 left-0 w-full p-10 bg-gradient-to-r from-purple-900 via-purple-800 to-purple-700 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <a href="/">HackathonWCS</a>
        </div>
        <div className="space-x-6">
          <a href="/" className="text-white hover:text-purple">
            Home
          </a>
          <a href="/chatInterface" className="text-white hover:text-purple">
            Chat
          </a>
          <a href="/login" className="text-white hover:text-purple">
            Login
          </a>
          <a href="/register" className="text-white hover:text-purple">
            Register
          </a>
          <a href="/contact" className="text-white hover:text-purple">
            Contact
          </a>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
