import BookTable from "../components/BookTable";
import Navbar from "../components/Navbar";


function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-200">
      <Navbar />
      <main className="p-4 pt-2 mx-auto">
        <BookTable />
      </main>
    </div>
  );
}

export default Dashboard;
