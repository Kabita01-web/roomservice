import React, { useState, useEffect } from "react";
import { User, X } from "lucide-react";

const EditUserForm = ({ editingUser, onSubmit, onCancel }) => {
    const [userForm, setUserForm] = useState({
        role: "user",
        image: null,
    });

    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const imgurl = import.meta.env.VITE_IMAGE_PATH;

    // Use Effect for editing
    useEffect(() => {
        if (editingUser) {
            setUserForm({
                role: editingUser.role || "user",
                image: null,
            });
            
            // Set image preview for existing user
            if (editingUser.image) {
                setImagePreview(`/${editingUser.image}`);
            } else {
                setImagePreview(null);
            }
        }
        setErrors({});
    }, [editingUser]);

    // Handle change for inputs
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === "file" && files[0]) {
            const file = files[0];
            
            // Validate file type and size
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
            const maxSize = 2 * 1024 * 1024; // 2MB

            if (!validTypes.includes(file.type)) {
                setErrors(prev => ({
                    ...prev,
                    image: "Please select a valid image (JPG, PNG, WEBP)"
                }));
                return;
            }

            if (file.size > maxSize) {
                setErrors(prev => ({
                    ...prev,
                    image: "Image size must be less than 2MB"
                }));
                return;
            }

            setUserForm((prev) => ({
                ...prev,
                [name]: file,
            }));

            // Clear any previous image errors
            if (errors.image) {
                setErrors(prev => ({
                    ...prev,
                    image: ""
                }));
            }

            // Create image preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setUserForm((prev) => ({
                ...prev,
                [name]: value,
            }));

            // Clear error when user starts typing
            if (errors[name]) {
                setErrors((prev) => ({
                    ...prev,
                    [name]: "",
                }));
            }
        }
    };

    // Remove image preview and clear image file
    const handleRemoveImage = () => {
        setImagePreview(null);
        setUserForm(prev => ({
            ...prev,
            image: null
        }));

        // Clear any image errors
        if (errors.image) {
            setErrors(prev => ({
                ...prev,
                image: ""
            }));
        }
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {};

        if (!userForm.role) {
            newErrors.role = "Role is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        try {
            setSubmitting(true);
            const formData = new FormData();
            
            // Only append role and image (name and email cannot be changed)
            formData.append('role', userForm.role);
            
            if (userForm.image) {
                formData.append('image', userForm.image);
            }

            await onSubmit(formData, editingUser.id);
        } catch (error) {
            console.error("Error updating user", error);
            // Handle API validation errors
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            } else {
                setErrors(prev => ({
                    ...prev,
                    submit: "Failed to update user. Please try again."
                }));
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow p-6 max-w-md mx-auto h-[550px] overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                    Edit User
                </h2>
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={submitting}
                    className="text-gray-500 hover:text-gray-700 transition duration-200 disabled:opacity-50"
                >
                    <X size={24} />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Image Preview and Upload */}
                <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                        {imagePreview ? (
                            <div className="relative">
                                <img
                                    src={imagePreview}
                                    alt="Profile preview"
                                    className="h-32 w-32 rounded-full object-cover border-4 border-gray-200 shadow-md"
                                />
                                <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    disabled={submitting}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition duration-200 disabled:opacity-50"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ) : (
                            <div className="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-gray-300">
                                <User size={48} className="text-gray-400" />
                            </div>
                        )}
                    </div>

                    <div className="w-full">
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2 text-center">
                            Profile Image
                        </label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            onChange={handleChange}
                            accept="image/jpeg,image/jpg,image/png,image/webp"
                            disabled={submitting}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
                        />
                        {errors.image && (
                            <p className="mt-1 text-sm text-red-600 text-center">
                                {errors.image}
                            </p>
                        )}
                        <p className="text-xs text-gray-500 mt-1 text-center">
                            Upload a profile picture (JPG, PNG, WEBP, max 2MB)
                        </p>
                    </div>
                </div>

                {/* Name Field (Read-only) */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={editingUser?.name || ""}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-500 cursor-not-allowed"
                        placeholder="User name"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                        Name cannot be changed
                    </p>
                </div>

                {/* Email Field (Read-only) */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={editingUser?.email || ""}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-500 cursor-not-allowed"
                        placeholder="User email"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                        Email cannot be changed
                    </p>
                </div>

                {/* Role Field */}
                <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                        Role *
                    </label>
                    <select
                        id="role"
                        name="role"
                        value={userForm.role}
                        onChange={handleChange}
                        disabled={submitting}
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 ${
                            errors.role ? "border-red-500" : "border-gray-300"
                        }`}
                    >
                        <option value="super admin">Super Admin</option>
                        <option value="admin">Admin</option>
                        <option value="customer">Customer</option>
                    </select>
                    {errors.role && (
                        <p className="mt-1 text-sm text-red-600">{errors.role}</p>
                    )}
                </div>

                {/* Submit Error */}
                {errors.submit && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-sm text-red-600">{errors.submit}</p>
                    </div>
                )}

                {/* Buttons */}
                <div className="flex space-x-4 pt-4">
                    <button
                        type="submit"
                        disabled={submitting}
                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {submitting ? 'Updating...' : 'Update User'}
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={submitting}
                        className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200 disabled:opacity-50"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditUserForm;