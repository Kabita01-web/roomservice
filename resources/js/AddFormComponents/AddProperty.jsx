import React, { useState } from "react";
import { X, Upload, Image as ImageIcon } from "lucide-react";

const AddProperty = ({
    onClose,
    handleCreate,
}) => {
    const initialFormState = {
        title: "",
        description: "",
        price: "",
        location: "",
        size: "",
        bedrooms: "",
        bathrooms: "",
        property_type: "",
    };

    const [propertyForm, setPropertyForm] = useState(initialFormState);
    const [submitting, setSubmitting] = useState(false);
    const [images, setImages] = useState([]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setPropertyForm((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        
        // Validate file types and sizes
        const validFiles = files.filter(file => {
            const isValidType = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type);
            const isValidSize = file.size <= 4 * 1024 * 1024; // 4MB limit
            
            if (!isValidType) {
                alert(`File ${file.name} is not a valid image type. Please use JPG, PNG, or WebP.`);
                return false;
            }
            
            if (!isValidSize) {
                alert(`File ${file.name} is too large. Please select images under 4MB.`);
                return false;
            }
            
            return true;
        });

        setImages(prev => [...prev, ...validFiles]);
        e.target.value = ''; // Reset file input
    };

    const removeImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const formData = new FormData();
            
            // Append property data
            Object.keys(propertyForm).forEach(key => {
                formData.append(key, propertyForm[key]);
            });

            // Append new images
            images.forEach(image => {
                formData.append('images[]', image);
            });

            await handleCreate(formData);

            // Reset form
            setPropertyForm(initialFormState);
            setImages([]);
        } catch (error) {
            console.error("Error creating property:", error);
            alert("Error creating property. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleCancel = () => {
        setPropertyForm(initialFormState);
        setImages([]);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">
                            Add New Property
                        </h2>
                        <button
                            onClick={handleCancel}
                            className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Title */}
                        <div>
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Title *
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={propertyForm.title}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter property title"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={propertyForm.description}
                                onChange={handleChange}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter property description"
                            />
                        </div>

                        {/* Location */}
                        <div>
                            <label
                                htmlFor="location"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Location *
                            </label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                value={propertyForm.location}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter property location"
                            />
                        </div>

                        {/* Property Type */}
                        <div>
                            <label
                                htmlFor="property_type"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Property Type *
                            </label>
                            <select
                                id="property_type"
                                name="property_type"
                                value={propertyForm.property_type}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select property type</option>
                                <option value="apartment">Apartment</option>
                                <option value="house">House</option>
                                <option value="room">Room</option>
                                <option value="commercial">Commercial</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Bedrooms */}
                            <div>
                                <label
                                    htmlFor="bedrooms"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Bedrooms
                                </label>
                                <input
                                    type="number"
                                    id="bedrooms"
                                    name="bedrooms"
                                    value={propertyForm.bedrooms}
                                    onChange={handleChange}
                                    min="0"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Number of bedrooms"
                                />
                            </div>

                            {/* Bathrooms */}
                            <div>
                                <label
                                    htmlFor="bathrooms"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Bathrooms
                                </label>
                                <input
                                    type="number"
                                    id="bathrooms"
                                    name="bathrooms"
                                    value={propertyForm.bathrooms}
                                    onChange={handleChange}
                                    min="0"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Number of bathrooms"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Size */}
                            <div>
                                <label
                                    htmlFor="size"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Size (sq ft) *
                                </label>
                                <input
                                    type="number"
                                    id="size"
                                    name="size"
                                    value={propertyForm.size}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Property size"
                                />
                            </div>

                            {/* Price */}
                            <div>
                                <label
                                    htmlFor="price"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Price *
                                </label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={propertyForm.price}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    step="0.01"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Property price"
                                />
                            </div>
                        </div>

                        {/* Image Upload Section */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Property Images
                            </label>
                            
                            {/* File Input */}
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-4">
                                <input
                                    type="file"
                                    id="images"
                                    multiple
                                    accept="image/jpeg,image/jpg,image/png,image/webp"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="images"
                                    className="cursor-pointer flex flex-col items-center justify-center"
                                >
                                    <Upload className="w-12 h-12 text-gray-400 mb-3" />
                                    <span className="text-lg font-medium text-gray-600">
                                        Click to upload images
                                    </span>
                                    <span className="text-sm text-gray-500 mt-1">
                                        JPG, PNG, WebP (Max 4MB each)
                                    </span>
                                </label>
                            </div>

                            {/* Image Preview */}
                            {images.length > 0 && (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {images.map((image, index) => (
                                        <div key={index} className="relative group">
                                            <img
                                                src={URL.createObjectURL(image)}
                                                alt={`Preview ${index + 1}`}
                                                className="w-full h-32 object-cover rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* No Images Message */}
                            {images.length === 0 && (
                                <div className="text-center py-8 border border-gray-200 rounded-lg">
                                    <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                    <p className="text-gray-500">No images uploaded yet</p>
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="flex space-x-3 pt-4 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 disabled:opacity-50"
                            >
                                {submitting ? "Adding Property..." : "Add Property"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProperty;