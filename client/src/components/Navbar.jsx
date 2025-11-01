export default function Navbar() {
    const userName = "Admin";
    const initials = userName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  
    return (
      <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center shadow-md">
        {/* Brand */}
        <h1 className="text-xl font-bold tracking-wide">📚 BookStore</h1>
  
        {/* Profile Circle */}
        <div className="flex items-center space-x-3">
          <div
            title={userName}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-semibold text-sm cursor-pointer hover:bg-blue-700 transition tracking-wider"
          >
            {initials}
          </div>
        </div>
      </nav>
    );
  }
  