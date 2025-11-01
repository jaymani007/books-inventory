const asyncHandler = require("express-async-handler");
const Book = require("../models/bookModel");

const createBook = asyncHandler(async (req, res) => {
  const { title, author, price, category, inStock } = req.body;
  const book = await Book.create({ title, author, price, category, inStock });
  res.status(201).json({ success: true, data: book });
});

const getBooks = asyncHandler(async (req, res) => {
  const books = await Book.find();
  res.json({ success: true, data: books });
});

const getBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }
  res.json({ success: true, data: book });
});

const updateBook = asyncHandler(async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }
  res.json({ success: true, data: book });
});

const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }
  res.json({ success: true, message: "Book deleted" });
});

module.exports = { createBook, getBooks, getBook, updateBook, deleteBook };
