import React, { useState, useEffect, useCallback } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
    Clock,
    ChevronLeft,
    Calendar as CalendarIcon,
    Loader2,
    MapPin,
    AlertCircle,
    CheckCircle,
} from "lucide-react";
import { format, addDays, isSameDay } from "date-fns";
import axios from "axios";
import { Link } from "@inertiajs/react";
import emailjs from "@emailjs/browser";
import NavBar from "@/HomeComponents/NavBar";
import Footer from "@/HomeComponents/Footer";

// Helper functions defined outside component to avoid initialization order issues
const isPastDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
};

const isSaturday = (date) => {
    return date.getDay() === 6;
};

const CalendarIntegration = ({ property }) => {
    const [selectedDate, setSelectedDate] = useState(() => {
        // Start with today or next available day if today is Saturday
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return isSaturday(today) ? addDays(today, 2) : today;
    });
    const [selectedTime, setSelectedTime] = useState("");
    const [showNextAvailability, setShowNextAvailability] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [tenantDetails, setTenantDetails] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [loadingSlots, setLoadingSlots] = useState(false);
    const [nextAvailableDates, setNextAvailableDates] = useState([]);
    const [calendarData, setCalendarData] = useState({});
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // EmailJS configuration
    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Utility functions
    const getImageUrl = useCallback((image_path) => {
        return image_path
            ? `/storage/${image_path}`
            : "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg";
    }, []);

    const convertTo24Hour = useCallback((time12h) => {
        if (!time12h) return "";
        const [time, modifier] = time12h.split(" ");
        let [hours, minutes] = time.split(":");

        if (hours === "12") {
            hours = "00";
        }

        if (modifier === "PM") {
            hours = parseInt(hours, 10) + 12;
        }

        return `${hours.toString().padStart(2, "0")}:${minutes}`;
    }, []);

    // Fetch calendar data for next 30 days
    useEffect(() => {
        if (property?.id) {
            fetchCalendarData();
        }
    }, [property?.id]);

    // Fetch available slots for selected date
    useEffect(() => {
        if (property?.id && selectedDate) {
            fetchAvailableSlots(selectedDate);
        }
    }, [property?.id, selectedDate]);

    const fetchCalendarData = useCallback(async () => {
        if (!property?.id) return;

        try {
            const response = await axios.get(
                route("ourreservations.timeslots")
            );
            
            if (response.data.success) {
                setCalendarData(response.data.data);

                // Find next available dates (skip Saturdays and past dates)
                const today = new Date();
                const nextDates = [];
                const maxDaysToCheck = 60; // Increased to find more dates

                for (let i = 1; i <= maxDaysToCheck; i++) {
                    const nextDate = new Date(today);
                    nextDate.setDate(today.getDate() + i);
                    
                    // Skip Saturdays
                    if (isSaturday(nextDate)) continue;
                    
                    const dateKey = format(nextDate, "yyyy-MM-dd");

                    if (
                        response.data.data[dateKey] &&
                        response.data.data[dateKey].length > 0
                    ) {
                        nextDates.push(new Date(nextDate));

                        if (nextDates.length >= 5) { // Increased to show more options
                            break;
                        }
                    }
                }

                setNextAvailableDates(nextDates);
            } else {
                throw new Error("Failed to fetch calendar data");
            }
        } catch (error) {
            console.error("Error fetching calendar data:", error);
            setCalendarData({});
            setError("Unable to load available dates. Please try again later.");
        }
    }, [property?.id]);

    const fetchAvailableSlots = useCallback(async (date) => {
        if (!property?.id || !date) return;

        setLoadingSlots(true);
        setSelectedTime("");
        
        try {
            const response = await axios.get(
                route("ourreservations.availability"),
                {
                    params: {
                        date: format(date, "yyyy-MM-dd"),
                    },
                }
            );

            // Handle Saturday message
            if (
                response.data.message &&
                response.data.message.includes("Saturday")
            ) {
                setAvailableSlots([]);
                setError("Saturday is closed. Please select another day.");
                return;
            }

            // Check if we have available slots
            if (!response.data.available_slots || response.data.available_slots.length === 0) {
                setAvailableSlots([]);
                setError("No time slots available for this date. Please select another date.");
                return;
            }

            // Convert 24-hour format to 12-hour format for display
            const formattedSlots = response.data.available_slots.map((time) => {
                const [hours, minutes] = time.split(":");
                const hour = parseInt(hours);
                const ampm = hour >= 12 ? "PM" : "AM";
                const displayHour = hour % 12 || 12;
                return {
                    display: `${displayHour}:${minutes} ${ampm}`,
                    value: time
                };
            });

            setAvailableSlots(formattedSlots);
            setError(""); // Clear any previous errors
        } catch (error) {
            console.error("Error fetching slots:", error);
            setAvailableSlots([]);
            setError("Unable to load time slots. Please try again.");
        } finally {
            setLoadingSlots(false);
        }
    }, [property?.id]);

    const hasTimeSlots = useCallback((date) => {
        if (!date) return false;
        const dateKey = format(date, "yyyy-MM-dd");
        return calendarData[dateKey] && calendarData[dateKey].length > 0;
    }, [calendarData]);

    const handleNextAvailabilityClick = () => {
        setShowNextAvailability(true);
    };

    const handleSelectNextAvailableDate = (date) => {
        setSelectedDate(date);
        setSelectedTime("");
        setShowNextAvailability(false);
        setError("");
    };

    const handleNext = () => {
        if (currentStep < 2 && !isNextDisabled()) {
            setCurrentStep(currentStep + 1);
            setError("");
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
            setError("");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTenantDetails((prev) => ({
            ...prev,
            [name]: value.trim(),
        }));
    };

    const validateForm = () => {
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(tenantDetails.email)) {
            return "Please enter a valid email address";
        }

        // Phone validation (basic)
        const phoneRegex = /^[+]?[\d\s\-()]{10,}$/;
        if (!phoneRegex.test(tenantDetails.phone.replace(/\s/g, ''))) {
            return "Please enter a valid phone number";
        }

        // Required fields
        if (!tenantDetails.name.trim()) {
            return "Name is required";
        }

        if (!tenantDetails.address.trim()) {
            return "Address is required";
        }

        return null;
    };

    const sendBookingEmail = async () => {
        if (!serviceID || !templateID || !publicKey) {
            console.warn("EmailJS configuration missing");
            return; // Don't fail the booking if email fails
        }

        const emailParams = {
            to_name: "Property Manager",
            from_name: tenantDetails.name,
            name: tenantDetails.name,
            phone: tenantDetails.phone,
            email: tenantDetails.email,
            address: tenantDetails.address,
            property_title: property.title,
            booking_date: format(selectedDate, "EEEE, MMMM d, yyyy"),
            booking_time: selectedTime,
            property_location: property.location,
            property_price: `Rs. ${property.price?.toLocaleString() || "0"}`,
        };

        try {
            await emailjs.send(serviceID, templateID, emailParams, publicKey);
            console.log("Email sent successfully");
        } catch (emailError) {
            console.error("Email sending failed:", emailError);
            // Don't throw error - booking should still succeed
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!property || !property.id) {
            setError("Property information is missing. Please try again.");
            return;
        }

        // Validate form
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        setIsLoading(true);
        setError("");
        setSuccess("");

        try {
            // 1️⃣ Save booking in backend
            const bookingData = {
                user_name: tenantDetails.name,
                email: tenantDetails.email,
                phone: tenantDetails.phone,
                address: tenantDetails.address,
                package_type: property.property_type,
                reservation_date: format(selectedDate, "yyyy-MM-dd"),
                reservation_time: convertTo24Hour(selectedTime),
                property_id: property.id,
                property_title: property.title,
                property_location: property.location,
            };

            const response = await axios.post(
                route("ourreservations.store"),
                bookingData
            );

            if (response.data.message) {
                // 2️⃣ Send Email (don't block on failure)
                await sendBookingEmail();

                // 3️⃣ Show success message
                setSuccess("Booking successful! You will receive a confirmation email shortly.");

                // 4️⃣ Reset state after delay
                setTimeout(() => {
                    setCurrentStep(1);
                    setTenantDetails({
                        name: "",
                        phone: "",
                        email: "",
                        address: "",
                    });
                    setSelectedTime("");
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    setSelectedDate(isSaturday(today) ? addDays(today, 2) : today);
                    setSuccess("");
                    
                    // Refresh calendar data
                    fetchCalendarData();
                }, 3000);

            } else {
                throw new Error(response.data.error || "Booking failed");
            }
        } catch (error) {
            console.error("Booking failed:", error);
            
            let errorMessage = "Booking submission failed. Please try again.";
            if (error.response?.data?.error) {
                errorMessage = error.response.data.error;
            } else if (error.response?.data?.errors) {
                // Handle Laravel validation errors
                const errors = Object.values(error.response.data.errors).flat();
                errorMessage = errors.join(", ");
            }
            
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const isNextDisabled = () => {
        switch (currentStep) {
            case 1:
                return !selectedDate || !selectedTime;
            case 2:
                return (
                    !tenantDetails.name.trim() ||
                    !tenantDetails.phone.trim() ||
                    !tenantDetails.email.trim() ||
                    !tenantDetails.address.trim()
                );
            default:
                return true;
        }
    };

    // Custom day cell content
    const renderDayContent = (date) => {
        const hasSlots = hasTimeSlots(date);
        const isSelected = selectedDate && isSameDay(date, selectedDate);
        const isPast = isPastDate(date);
        const isSat = isSaturday(date);

        return (
            <div className="relative flex items-center justify-center w-full h-full">
                <span className={`relative z-10 ${isSelected ? "text-white" : 
                    isPast || isSat ? "text-gray-300" : "text-gray-700"}`}>
                    {date.getDate()}
                </span>
                {hasSlots && !isSelected && !isPast && !isSat && (
                    <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full"></div>
                )}
            </div>
        );
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <>
                        {/* Calendar Section */}
                        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:col-span-1">
                            <div className="mb-4">
                                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
                                    Select a Date
                                </h2>
                                {property && (
                                    <p className="text-sm text-gray-500">
                                        Booking for:{" "}
                                        <span className="font-medium">
                                            {property.title}
                                        </span>
                                    </p>
                                )}
                            </div>
                            
                            <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={(date) => {
                                    if (
                                        date &&
                                        !isPastDate(date) &&
                                        !isSaturday(date)
                                    ) {
                                        setSelectedDate(date);
                                        setSelectedTime("");
                                        setShowNextAvailability(false);
                                        setError("");
                                    }
                                }}
                                disabled={(date) =>
                                    isPastDate(date) || isSaturday(date)
                                }
                                className="rounded-md border [&_.rdp-day_selected]:bg-emerald-600 [&_.rdp-day_selected]:text-white [&_.rdp-day_selected:hover]:bg-emerald-700 [&_.rdp-button:hover]:bg-emerald-50 [&_.rdp-day_today]:bg-gray-100 [&_.rdp-day_today]:border [&_.rdp-day_today]:border-emerald-200"
                                components={{
                                    DayContent: ({ date }) =>
                                        renderDayContent(date),
                                }}
                            />
                            
                            {isSaturday(selectedDate) && (
                                <p className="mt-3 text-sm text-amber-600 flex items-center gap-1">
                                    <AlertCircle className="w-4 h-4" />
                                    Saturday is closed. Please select another day.
                                </p>
                            )}
                        </div>

                        {/* Time Slots Section */}
                        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:col-span-1">
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
                                Available Times
                            </h2>
                            <p className="text-xs sm:text-sm text-gray-500 mb-4">
                                {format(selectedDate, "EEEE, MMMM d, yyyy")}
                            </p>

                            {isSaturday(selectedDate) ? (
                                <div className="text-center py-8">
                                    <div className="text-gray-400 mb-3">
                                        <CalendarIcon className="w-12 h-12 mx-auto" />
                                    </div>
                                    <p className="text-gray-500 font-medium mb-2">
                                        Saturday is Closed
                                    </p>
                                    <p className="text-gray-400 text-sm mb-4">
                                        Please select another day
                                    </p>
                                </div>
                            ) : loadingSlots ? (
                                <div className="flex flex-col items-center justify-center py-8">
                                    <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mb-2" />
                                    <span className="text-gray-600">
                                        Loading available slots...
                                    </span>
                                </div>
                            ) : availableSlots.length > 0 ? (
                                <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-3">
                                    {availableSlots.map((slot) => (
                                        <button
                                            key={slot.value}
                                            onClick={() => {
                                                setSelectedTime(slot.display);
                                                setError("");
                                            }}
                                            className={`py-2 sm:py-3 px-3 sm:px-4 rounded-lg border-2 transition-all duration-200 font-medium text-sm sm:text-base ${
                                                selectedTime === slot.display
                                                    ? "border-emerald-600 bg-emerald-600 text-white shadow-md transform scale-[1.02]"
                                                    : "border-gray-200 hover:border-emerald-300 text-gray-700 hover:bg-emerald-50"
                                            }`}
                                        >
                                            {slot.display}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-4">
                                    <div className="text-gray-400 mb-3">
                                        <Clock className="w-12 h-12 mx-auto" />
                                    </div>
                                    <p className="text-gray-500 font-medium mb-2">
                                        No available time slots
                                    </p>
                                    <p className="text-gray-400 text-sm mb-4">
                                        Please select another date
                                    </p>

                                    {!showNextAvailability ? (
                                        <button
                                            onClick={handleNextAvailabilityClick}
                                            className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors duration-200 text-sm"
                                        >
                                            Check Next Availability
                                        </button>
                                    ) : (
                                        <div className="mt-4">
                                            <h3 className="text-sm font-semibold text-gray-900 mb-3 text-left">
                                                Next available dates:
                                            </h3>
                                            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                                                {nextAvailableDates.length > 0 ? (
                                                    nextAvailableDates.map((date, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() =>
                                                                handleSelectNextAvailableDate(date)
                                                            }
                                                            className="w-full py-2 px-3 text-left bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors duration-200 hover:border-emerald-300"
                                                        >
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {format(date, "EEEE, MMMM d")}
                                                            </div>
                                                            <div className="text-xs text-gray-600">
                                                                {calendarData[format(date, "yyyy-MM-dd")]?.length || 0} time slots available
                                                            </div>
                                                        </button>
                                                    ))
                                                ) : (
                                                    <p className="text-gray-500 text-sm py-2">
                                                        No available dates found in the next 60 days.
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Property Details Section */}
                        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:col-span-1">
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
                                Property Details
                            </h2>

                            <div className="space-y-4 mb-6">
                                {property && (
                                    <div>
                                        <div className="w-full h-48 rounded-lg overflow-hidden mb-4">
                                            <img
                                                src={getImageUrl(property?.image_path?.[0])}
                                                alt={property?.title}
                                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                                onError={(e) => {
                                                    e.target.src = "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg";
                                                }}
                                            />
                                        </div>
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex-1 mr-4">
                                                <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base line-clamp-2">
                                                    {property.title}
                                                </h3>
                                                <div className="flex items-center text-xs sm:text-sm text-gray-600">
                                                    <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                                                    <span className="line-clamp-1">
                                                        {property.location}
                                                    </span>
                                                </div>
                                            </div>
                                            <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-1 rounded whitespace-nowrap">
                                                {property.property_type}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="text-lg font-bold text-rose-600">
                                                Rs. {property.price?.toLocaleString() || "0"}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {property.bedrooms} Beds • {property.bathrooms} Baths
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {selectedDate && selectedTime && (
                                    <div className="border-t pt-4 mt-4">
                                        <h4 className="text-sm font-semibold text-gray-900 mb-2">
                                            Selected Appointment
                                        </h4>
                                        <div className="flex justify-between items-center">
                                            <div className="text-sm text-gray-600">
                                                <div className="flex items-center gap-1">
                                                    <CalendarIcon className="w-4 h-4" />
                                                    <span>{format(selectedDate, "MMM d, yyyy")}</span>
                                                </div>
                                                <div className="flex items-center gap-1 mt-1">
                                                    <Clock className="w-4 h-4" />
                                                    <span>{selectedTime}</span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    setSelectedTime("");
                                                    setError("");
                                                }}
                                                className="text-xs text-red-600 hover:text-red-800"
                                            >
                                                Clear
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={handleNext}
                                disabled={!selectedTime}
                                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 text-sm sm:text-base ${
                                    selectedTime
                                        ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                }`}
                            >
                                {selectedTime ? "Continue to Details →" : "Select a Time"}
                            </button>

                            {selectedTime && (
                                <p className="text-xs text-center text-gray-500 mt-3">
                                    Next: Enter your contact information
                                </p>
                            )}
                        </div>
                    </>
                );

            case 2:
                return (
                    <>
                        {/* Tenant Details Form */}
                        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:col-span-2">
                            <div className="flex items-center gap-2 mb-1">
                                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                                    Your Details
                                </h2>
                            </div>
                            <p className="text-xs sm:text-sm text-gray-500 mb-6">
                                Fill in your details to complete the booking
                            </p>

                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={tenantDetails.name}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={tenantDetails.phone}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                            placeholder="+1234567890"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={tenantDetails.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Complete Address *
                                    </label>
                                    <textarea
                                        name="address"
                                        value={tenantDetails.address}
                                        onChange={handleInputChange}
                                        rows="3"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                        placeholder="Street, City, State, ZIP Code"
                                        required
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Please provide your complete address for confirmation purposes
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Booking Summary Section */}
                        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:col-span-1">
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
                                Booking Summary
                            </h2>

                            <div className="space-y-4 mb-6">
                                {property && (
                                    <div className="border-b pb-4">
                                        <div className="flex items-start gap-3 mb-3">
                                            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                                <img
                                                    src={getImageUrl(property?.image_path?.[0])}
                                                    alt={property?.title}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        e.target.src = "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg";
                                                    }}
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-medium text-gray-900 text-sm mb-1">
                                                    {property.title}
                                                </h4>
                                                <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                                                    {property.location}
                                                </p>
                                                <div className="text-sm font-bold text-rose-600">
                                                    Rs. {property.price?.toLocaleString() || "0"}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-3">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600">Date</span>
                                        <span className="font-medium text-gray-900">
                                            {format(selectedDate, "MMM d, yyyy")}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600">Time</span>
                                        <span className="font-medium  text-emerald-700 px-2 py-1 rounded">
                                            {selectedTime}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Error and Success Messages */}
                            {error && (
                                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="text-sm text-red-700 flex items-center gap-1">
                                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                        <span>{error}</span>
                                    </p>
                                </div>
                            )}

                            {success && (
                                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                                    <p className="text-sm text-green-700 flex items-center gap-1">
                                        <CheckCircle className="w-4 h-4 flex-shrink-0" />
                                        <span>{success}</span>
                                    </p>
                                </div>
                            )}

                            <div className="space-y-3">
                                <button
                                    onClick={handleSubmit}
                                    disabled={isNextDisabled() || isLoading}
                                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 text-sm sm:text-base ${
                                        !isNextDisabled() && !isLoading
                                            ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                    }`}
                                >
                                    {isLoading ? (
                                        <div className="flex items-center justify-center">
                                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                            Processing...
                                        </div>
                                    ) : (
                                        "Confirm & Book Appointment"
                                    )}
                                </button>

                                {!isNextDisabled() && !isLoading && (
                                    <p className="text-xs text-center text-gray-500">
                                        You'll receive a confirmation email after booking
                                    </p>
                                )}
                            </div>
                        </div>
                    </>
                );
        }
    };

    return (
        <>
        <NavBar/>
        <div className="min-h-screen bg-gray-50 mt-24">
            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                {/* Back Button */}
                {/* <Link
                    href={"/rooms"}
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors group"
                >
                    <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
                    <span className="font-medium">Back to Properties</span>
                </Link> */}

                {/* Steps Header */}
                <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 mb-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                        <div>
                            {/* <div className="flex items-center gap-3 mb-2">
                                <div className="flex items-center">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                                        1
                                    </div>
                                    <div className="w-12 h-0.5 mx-2 bg-gray-300"></div>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                                        2
                                    </div>
                                </div>
                                <span className="text-sm font-medium text-gray-600">
                                    {currentStep === 1 ? "Select Date & Time" : "Enter Details"}
                                </span>
                            </div> */}
                            {property && (
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                    Book a Viewing: <span className="text-emerald-700">{property.title}</span>
                                </h1>
                            )}
                        </div>
                        
                        {currentStep === 2 && selectedTime && (
                            <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-2">
                                <p className="text-sm text-emerald-800">
                                    <span className="font-semibold">{format(selectedDate, "MMM d")}</span> at{" "}
                                    <span className="font-semibold">{selectedTime}</span>
                                </p>
                            </div>
                        )}
                    </div>
                    
                    <p className="text-gray-600 text-sm sm:text-base">
                        {currentStep === 1
                            ? "Check our availability and select a convenient date and time for your property viewing"
                            : "Almost there! Please provide your contact details to confirm the appointment"}
                    </p>
                </div>

                {/* Error Message Display */}
                {error && !success && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-700 flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            {error}
                        </p>
                    </div>
                )}

                {/* Step Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
                    {renderStepContent()}
                </div>

                {/* Navigation Buttons */}
                <div className="mt-8 flex justify-between items-center">
                    <button
                        onClick={handleBack}
                        disabled={currentStep === 1}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                            currentStep === 1
                                ? "text-gray-400 cursor-not-allowed"
                                : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                        }`}
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Back
                    </button>
                    
                    <div className="text-sm text-gray-500">
                        Need help? Contact us at{" "}
                        <a href="mailto:support@property.com" className="text-emerald-600 hover:text-emerald-800">
                            support@property.com
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
        </>
    );
};

export default CalendarIntegration;