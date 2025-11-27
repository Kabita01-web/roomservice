import React, { useState } from "react";
import { User, X, Eye, EyeOff } from "lucide-react";

const AddUserForm = ({ onSubmit, onCancel }) => {
    const [userForm, setUserForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "user",
        image: null,
    });

    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Toggle confirm password visibility
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    // Remove image preview and clear image file
    const handleRemoveImage = () => {
        setImagePreview(null);
        setUserForm((prev) => ({
            ...prev,
            image: null,
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

        if (!userForm.name.trim()) {
            newErrors.name = "Name is required";
        } else if (userForm.name.trim().length < 2) {
            newErrors.name = "Name must be at least 2 characters";
        }

        if (!userForm.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(userForm.email)) {
            newErrors.email = "Email is invalid";
        }

        if (!userForm.password) {
            newErrors.password = "Password is required";
        } else if (userForm.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (!userForm.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (userForm.password !== userForm.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

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

            // Append all form data
            formData.append("name", userForm.name.trim());
            formData.append("email", userForm.email.trim());
            formData.append("role", userForm.role);
            formData.append("password", userForm.password);

            if (userForm.image) {
                formData.append("image", userForm.image);
            }

            await onSubmit(formData);

            // Reset form only on success
            setUserForm({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                role: "user",
                image: null,
            });
            setImagePreview(null);
            setErrors({});
            setShowPassword(false);
            setShowConfirmPassword(false);
        } catch (error) {
            console.error("Error saving data", error);
            // Handle API validation errors
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            } else {
                setErrors(prev => ({
                    ...prev,
                    submit: "Failed to add user. Please try again."
                }));
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow p-6 max-w-md mx-auto h-[650px] overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                    Add New User
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
                        <label
                            htmlFor="image"
                            className="block text-sm font-medium text-gray-700 mb-2 text-center"
                        >
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

                {/* Name Field */}
                <div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Name *
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={userForm.name}
                        onChange={handleChange}
                        disabled={submitting}
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 ${
                            errors.name ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Enter full name"
                    />
                    {errors.name && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.name}
                        </p>
                    )}
                </div>

                {/* Email Field */}
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Email *
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={userForm.email}
                        onChange={handleChange}
                        disabled={submitting}
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 ${
                            errors.email ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Enter email address"
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.email}
                        </p>
                    )}
                </div>

                {/* Password Field */}
                <div className="relative">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Password *
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={userForm.password}
                            onChange={handleChange}
                            disabled={submitting}
                            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 pr-10 ${
                                errors.password
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                            placeholder="Enter password"
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            disabled={submitting}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 disabled:opacity-50"
                            style={{ top: "50%", transform: "translateY(-50%)" }}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.password}
                        </p>
                    )}
                </div>

                {/* Confirm Password Field */}
                <div className="relative">
                    <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Confirm Password *
                    </label>
                    <div className="relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword"
                            value={userForm.confirmPassword}
                            onChange={handleChange}
                            disabled={submitting}
                            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 pr-10 ${
                                errors.confirmPassword
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                            placeholder="Confirm password"
                        />
                        <button
                            type="button"
                            onClick={toggleConfirmPasswordVisibility}
                            disabled={submitting}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 disabled:opacity-50"
                            style={{ top: "50%", transform: "translateY(-50%)" }}
                        >
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.confirmPassword}
                        </p>
                    )}
                </div>

                {/* Role Field */}
                <div>
                    <label
                        htmlFor="role"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
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
                        <p className="mt-1 text-sm text-red-600">
                            {errors.role}
                        </p>
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
                        {submitting ? "Saving..." : "Add User"}
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

export default AddUserForm;