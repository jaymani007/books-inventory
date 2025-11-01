/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { X } from "lucide-react";
import { axiosInstance } from "../services/axiosInstance";
import toast from "react-hot-toast";

export default function BookModal({ isOpen, onClose, bookData, refreshBooks }) {
  if (!isOpen) return null;

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    author: Yup.string().required("Author is required"),
    price: Yup.number()
      .typeError("Price must be a number")
      .positive("Price must be positive")
      .required("Price is required"),
    category: Yup.string().required("Category is required"),
    inStock: Yup.boolean(),
  });

  const formik = useFormik({
    initialValues: {
      title: bookData?.title || "",
      author: bookData?.author || "",
      price: bookData?.price || "",
      category: bookData?.category || "",
      inStock: bookData?.inStock || false,
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        const endpoint = bookData ? `/books/${bookData._id}` : "/books";
        const method = bookData ? "put" : "post";
        await axiosInstance[method](endpoint, values);
        toast.success("Saved successfully!", {
          position: "top-right",
          toasterId: "dashboard",
        });

        refreshBooks?.();
        onClose();
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            error.message ||
            "An unexpected error occurred",
          { position: "top-right", toasterId: "dashboard" }
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg relative">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-400 p-4">
          <h2 className="text-lg font-semibold">
            {bookData ? "Edit Book" : "Add New Book"}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-gray-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={formik.handleSubmit} className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              className="mt-1 block w-full h-10 rounded-md border border-gray-300 shadow-sm px-3 focus:ring-blue-500 focus:border-blue-500"
            />
            {formik.touched.title && formik.errors.title && (
              <p className="text-red-500 text-sm">{formik.errors.title}</p>
            )}
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Author <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="author"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.author}
              className="mt-1 block w-full h-10 rounded-md border border-gray-300 shadow-sm px-3 focus:ring-blue-500 focus:border-blue-500"
            />
            {formik.touched.author && formik.errors.author && (
              <p className="text-red-500 text-sm">{formik.errors.author}</p>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price ($) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="price"
              step="0.01"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.price}
              className="mt-1 block w-full h-10 rounded-md border border-gray-300 shadow-sm px-3 focus:ring-blue-500 focus:border-blue-500"
            />
            {formik.touched.price && formik.errors.price && (
              <p className="text-red-500 text-sm">{formik.errors.price}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="category"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.category}
              className="mt-1 block w-full h-10 rounded-md border border-gray-300 shadow-sm px-3 focus:ring-blue-500 focus:border-blue-500"
            />
            {formik.touched.category && formik.errors.category && (
              <p className="text-red-500 text-sm">{formik.errors.category}</p>
            )}
          </div>

          {/* In Stock */}
          <div className="flex items-center space-x-3">
            <label className="text-sm font-medium text-gray-700">
              In Stock
            </label>
            <input
              type="checkbox"
              name="inStock"
              checked={formik.values.inStock}
              onChange={formik.handleChange}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>

          {/* Error message */}
          {formik.status && (
            <div className="text-red-600 text-sm">{formik.status}</div>
          )}

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-400">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {formik.isSubmitting
                ? "Saving..."
                : bookData
                ? "Update"
                : "Add Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
