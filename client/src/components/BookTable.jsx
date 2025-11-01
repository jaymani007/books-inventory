import { useState, useMemo, useEffect } from "react";
import { ChevronLeft, ChevronRight, Edit2, Trash2, Search } from "lucide-react";
import BookModal from "./BookModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import { axiosInstance } from "../services/axiosInstance";
import toast, { Toaster } from "react-hot-toast";

export default function BookTable() {
  const [books, setBooks] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const itemsPerPage = 10;

  useEffect(() => {
    fetchBooks();
  }, []);

  // Fetch books from API
  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get("/books");
      setBooks(response.data.data);
    } catch (err) {
      console.error("Error fetching books:", err);
      setError("Failed to fetch books. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Extract all unique categories for dropdown
  const categories = ["All", ...new Set(books.map((b) => b.category))];

  // ✅ Filter books
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || book.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [books, searchTerm, selectedCategory]);

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleAddBook = () => {
    setSelectedBook(null);
    setModalOpen(true);
  };

  const handleEditBook = (book) => {
    setSelectedBook(book);
    setModalOpen(true);
  };

  const handleDeleteBook = (book) => {
    setSelectedBook(book);
    setDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedBook) return;

    try {
      // delete API
      const response = await axiosInstance.delete(`/books/${selectedBook._id}`);

      if (response.status === 200) {
        toast.success("Deleted Successfully", {
          position: "top-right",
          toasterId: "dashboard",
        });
      }
      fetchBooks();

      // Close modal and reset state
      setDeleteOpen(false);
      setSelectedBook(null);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete book. Try again.",
        { position: "top-right", toasterId: "dashboard" }
      );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">Loading books...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-full mx-auto p-4">
      {/* Header Row */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <h2 className="text-2xl font-semibold">Book Inventory</h2>

        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          {/* 🔍 Search Box */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title, author, or category..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 pr-4 py-2 rounded-md bg-white border border-gray-300 focus:outline-none focus:ring-0 w-full sm:w-72"
            />
          </div>

          {/* 🏷️ Category Filter */}
          <div className="relative w-48">
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 w-full py-2 rounded-md bg-white border border-gray-300 focus:outline-none  appearance-none focus:ring-0 text-sm"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>

          {/* ➕ Add Button */}
          <button
            onClick={handleAddBook}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Book
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="max-h-[600px] overflow-y-auto">
          <table className="w-full text-sm table-fixed">
            <thead className="bg-gray-900 text-white sticky top-0">
              <tr>
                <th className="w-[25%] px-6 py-3 text-left font-semibold">
                  Title
                </th>
                <th className="w-[20%] px-6 py-3 text-left font-semibold">
                  Author
                </th>
                <th className="w-[10%] px-6 py-3 text-left font-semibold">
                  Price
                </th>
                <th className="w-[15%] px-6 py-3 text-left font-semibold">
                  Category
                </th>
                <th className="w-[10%] px-6 py-3 text-left font-semibold">
                  In Stock
                </th>
                <th className="w-[10%] px-6 py-3 text-center font-semibold">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="bg-gray-200">
              {currentBooks.length > 0 ? (
                currentBooks.map((book) => (
                  <tr
                    key={book.id}
                    className="border-b border-gray-300 bg-white hover:bg-blue-100/50 transition-colors"
                  >
                    <td className="px-6 py-3 truncate">{book.title}</td>
                    <td className="px-6 py-3 truncate">{book.author}</td>
                    <td className="px-6 py-3 font-medium">
                      ${book.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-3">
                      <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                        {book.category}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          book.inStock
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {book.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>
                    <td className="px-6 py-3 flex justify-center gap-3">
                      <button
                        onClick={() => handleEditBook(book)}
                        title="Edit Book"
                        className="text-blue-600 hover:text-blue-800 transition"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteBook(book)}
                        title="Delete Book"
                        className="text-red-600 hover:text-red-800 transition"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="bg-white">
                  <td
                    colSpan="6"
                    className="text-center text-gray-600 py-6 font-medium"
                  >
                    No books found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {books && books.length > 0 && (
          <div className="flex items-center justify-end px-4 py-2 bg-white">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-3 py-1 text-sm font-medium text-gray-700 hover:text-gray-900 disabled:opacity-50"
              >
                <ChevronLeft className="w-4 h-4" /> Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      currentPage === page
                        ? "bg-gray-900 text-white"
                        : "text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 px-3 py-1 text-sm font-medium text-gray-700 hover:text-gray-900 disabled:opacity-50"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Book Modal */}
      <BookModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        bookData={selectedBook}
        refreshBooks={() => {
          fetchBooks();
        }}
      />
      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Book"
        message={`Are you sure you want to delete "${selectedBook?.title}"?`}
      />
      <Toaster toasterId="dashboard" />
    </div>
  );
}
