import React, { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
    Clock,
    ChevronLeft,
    Calendar as CalendarIcon,
    Loader2,
    MapPin,
} from "lucide-react";
import { format } from "date-fns";
import axios from "axios";
import { Link } from "@inertiajs/react";

const CalendarIntegration = ({ property }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
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

    const fetchCalendarData = async () => {
        if (!property?.id) return;

        try {
            const response = await axios.get(
                route("ourreservations.timeslots")
            );
            if (response.data.success) {
                setCalendarData(response.data.data);

                // Find next available dates
                const today = new Date();
                const nextDates = [];

                for (let i = 1; i <= 30; i++) {
                    const nextDate = new Date(today);
                    nextDate.setDate(today.getDate() + i);
                    const dateKey = format(nextDate, "yyyy-MM-dd");

                    if (
                        response.data.data[dateKey] &&
                        response.data.data[dateKey].length > 0
                    ) {
                        nextDates.push(new Date(nextDate));

                        if (nextDates.length >= 3) {
                            break;
                        }
                    }
                }

                setNextAvailableDates(nextDates);
            }
        } catch (error) {
            console.error("Error fetching calendar data:", error);
            setCalendarData({});
        }
    };

    const fetchAvailableSlots = async (date) => {
        if (!property?.id || !date) return;

        setLoadingSlots(true);
        try {
            const response = await axios.get(
                route("ourreservations.availability"),
                {
                    params: {
                        date: format(date, "yyyy-MM-dd"),
                    },
                }
            );

            if (
                response.data.message &&
                response.data.message.includes("Saturday")
            ) {
                setAvailableSlots([]);
                return;
            }

            // Convert 24-hour format to 12-hour format for display
            const formattedSlots = response.data.available_slots.map((time) => {
                const [hours, minutes] = time.split(":");
                const hour = parseInt(hours);
                const ampm = hour >= 12 ? "PM" : "AM";
                const displayHour = hour % 12 || 12;
                return `${displayHour}:${minutes} ${ampm}`;
            });

            setAvailableSlots(formattedSlots);
        } catch (error) {
            console.error("Error fetching slots:", error);
            setAvailableSlots([]);
        } finally {
            setLoadingSlots(false);
        }
    };

    const convertTo24Hour = (time12h) => {
        const [time, modifier] = time12h.split(" ");
        let [hours, minutes] = time.split(":");

        if (hours === "12") {
            hours = "00";
        }

        if (modifier === "PM") {
            hours = parseInt(hours, 10) + 12;
        }

        return `${hours.toString().padStart(2, "0")}:${minutes}`;
    };

    const hasTimeSlots = (date) => {
        if (!date) return false;
        const dateKey = format(date, "yyyy-MM-dd");
        return calendarData[dateKey] && calendarData[dateKey].length > 0;
    };

    const isPastDate = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
    };

    const isSaturday = (date) => {
        return date.getDay() === 6;
    };

    const handleNextAvailabilityClick = () => {
        setShowNextAvailability(true);
    };

    const handleSelectNextAvailableDate = (date) => {
        setSelectedDate(date);
        setSelectedTime("");
        setShowNextAvailability(false);
    };

    const handleNext = () => {
        if (currentStep < 2) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTenantDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!property || !property.id) {
            alert("Property information is missing. Please try again.");
            return;
        }

        setIsLoading(true);

        try {
            const bookingData = {
                user_name: tenantDetails.name,
                email: tenantDetails.email,
                phone: tenantDetails.phone,
                address: tenantDetails.address,
                package_type: "Physical Tour",
                reservation_date: format(selectedDate, "yyyy-MM-dd"),
                reservation_time: convertTo24Hour(selectedTime),
                property_id: property.id,
                agent_id: null, // No agent selection
            };

            const response = await axios.post(
                route("ourreservations.store"),
                bookingData
            );

            if (response.data.message) {
                alert(
                    "Booking request submitted successfully! Our team will contact you soon."
                );

                // Reset form
                setCurrentStep(1);
                setTenantDetails({
                    name: "",
                    phone: "",
                    email: "",
                    address: "",
                });
                setSelectedTime("");
                setSelectedDate(new Date());

                // Refresh data
                fetchCalendarData();
                fetchAvailableSlots(new Date());
            } else {
                throw new Error(response.data.error || "Booking failed");
            }
        } catch (error) {
            console.error("Error submitting booking:", error);

            if (error.response?.data?.error) {
                alert(`Booking failed: ${error.response.data.error}`);
            } else {
                alert("Booking submission failed. Please try again.");
            }
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
                    !tenantDetails.name ||
                    !tenantDetails.phone ||
                    !tenantDetails.email ||
                    !tenantDetails.address
                );
            default:
                return false;
        }
    };

    // Custom day cell content
    const renderDayContent = (date) => {
        const hasSlots = hasTimeSlots(date);
        const isSelected =
            selectedDate && date.toDateString() === selectedDate.toDateString();
        const isPast = isPastDate(date);
        const isSat = isSaturday(date);

        return (
            <div className="relative">
                <span className={`${isPast || isSat ? "text-gray-400" : ""}`}>
                    {date.getDate()}
                </span>
                {hasSlots && !isSelected && !isPast && !isSat && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full"></div>
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
                                    }
                                }}
                                disabled={(date) =>
                                    isPastDate(date) || isSaturday(date)
                                }
                                className="rounded-md border [&_.rdp-day_selected]:bg-emerald-600 [&_.rdp-day_selected]:text-white [&_.rdp-day_selected:hover]:bg-emerald-700 [&_.rdp-button:hover]:bg-emerald-50 [&_.rdp-day_today]:bg-gray-100"
                                components={{
                                    DayContent: ({ date }) =>
                                        renderDayContent(date),
                                }}
                            />
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
                                <div className="flex items-center justify-center py-8">
                                    <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
                                    <span className="ml-2 text-gray-600">
                                        Loading slots...
                                    </span>
                                </div>
                            ) : availableSlots.length > 0 ? (
                                <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-3">
                                    {availableSlots.map((time) => (
                                        <button
                                            key={time}
                                            onClick={() =>
                                                setSelectedTime(time)
                                            }
                                            className={`py-2 sm:py-3 px-3 sm:px-4 rounded-lg border-2 transition-all duration-200 font-medium text-sm sm:text-base ${
                                                selectedTime === time
                                                    ? "border-emerald-600 bg-emerald-600 text-white shadow-md"
                                                    : "border-gray-200 hover:border-emerald-300 text-gray-700 hover:bg-emerald-50"
                                            }`}
                                        >
                                            {time}
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
                                            onClick={
                                                handleNextAvailabilityClick
                                            }
                                            className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors duration-200 text-sm"
                                        >
                                            Check Next Availability
                                        </button>
                                    ) : (
                                        <div className="mt-4">
                                            <h3 className="text-sm font-semibold text-gray-900 mb-3 text-left">
                                                Next available dates:
                                            </h3>
                                            <div className="space-y-2">
                                                {nextAvailableDates.map(
                                                    (date, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() =>
                                                                handleSelectNextAvailableDate(
                                                                    date
                                                                )
                                                            }
                                                            className="w-full py-2 px-3 text-left bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors duration-200"
                                                        >
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {format(
                                                                    date,
                                                                    "EEE, MMM d"
                                                                )}
                                                            </div>
                                                            <div className="text-xs text-gray-600">
                                                                {calendarData[
                                                                    format(
                                                                        date,
                                                                        "yyyy-MM-dd"
                                                                    )
                                                                ]?.length ||
                                                                    0}{" "}
                                                                time slots
                                                                available
                                                            </div>
                                                        </button>
                                                    )
                                                )}
                                            </div>
                                            {nextAvailableDates.length ===
                                                0 && (
                                                <p className="text-gray-500 text-sm py-2">
                                                    No available dates found in
                                                    the next 30 days.
                                                </p>
                                            )}
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
                                                src={
                                                    property.images?.[0]
                                                        ?.image_path ||
                                                    "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg"
                                                }
                                                alt={property.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex items-start justify-between mb-3 uppercase">
                                            <div>
                                                <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base line-clamp-2">
                                                    {property.title}
                                                </h3>
                                                <div className="flex items-center text-xs sm:text-sm text-gray-600">
                                                    <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                                                    <span className="line-clamp-1 uppercase">
                                                        {property.location}
                                                    </span>
                                                </div>
                                            </div>
                                           <h2 className="uppercase">{property.property_type}</h2>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="text-lg font-bold text-rose-600">
                                                Rs.{" "}
                                                {property.price?.toLocaleString() ||
                                                    "0"}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {property.bedrooms} Beds •{" "}
                                                {property.bathrooms} Baths
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="border-t pt-4">
                                    <div className="flex justify-between text-xs sm:text-sm mb-2">
                                        <span className="text-gray-600">
                                            Agent Fee:
                                        </span>
                                        <span className="font-medium text-gray-900">
                                            FREE
                                        </span>
                                    </div>
                                    {selectedDate && selectedTime && (
                                        <div className="flex justify-between text-xs sm:text-sm">
                                            <span className="text-gray-600">
                                                Selected:
                                            </span>
                                            <span className="font-medium text-gray-900 text-right">
                                                {format(selectedDate, "MMM d")}{" "}
                                                at {selectedTime}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <button
                                onClick={handleNext}
                                disabled={!selectedTime}
                                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 text-sm sm:text-base ${
                                    selectedTime
                                        ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg"
                                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                }`}
                            >
                                {selectedTime
                                    ? "Continue to Details"
                                    : "Select a Time"}
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
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
                                Your Details
                            </h2>
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
                                            placeholder="Enter your full name"
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
                                            placeholder="Enter your phone number"
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
                                            placeholder="Enter your email address"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Address *
                                    </label>
                                    <textarea
                                        name="address"
                                        value={tenantDetails.address}
                                        onChange={handleInputChange}
                                        rows="3"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                        placeholder="Your complete address..."
                                        required
                                    />
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
                                            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                                <img
                                                    src={
                                                        property.images?.[0]
                                                            ?.image_path ||
                                                        "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg"
                                                    }
                                                    alt={property.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-900 text-sm">
                                                    {property.title}
                                                </h4>
                                                <p className="text-xs text-gray-600">
                                                    {property.location}
                                                </p>
                                                <div className="text-sm font-bold text-rose-600 mt-1">
                                                    Rs.{" "}
                                                    {property.price?.toLocaleString() ||
                                                        "0"}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">
                                            Date
                                        </span>
                                        <span className="font-medium text-gray-900">
                                            {format(
                                                selectedDate,
                                                "MMM d, yyyy"
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">
                                            Time
                                        </span>
                                        <span className="font-medium text-emerald-600">
                                            {selectedTime}
                                        </span>
                                    </div>

                                    {/* <div className="pt-4 border-t">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <div className="font-semibold text-gray-900">
                                                    Total Cost
                                                </div>
                                                <div className="text-xs text-gray-600">
                                                    No charges for viewing
                                                </div>
                                            </div>
                                            <div className="text-2xl font-bold text-green-600">
                                                FREE
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={isNextDisabled() || isLoading}
                                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 text-sm sm:text-base ${
                                    !isNextDisabled() && !isLoading
                                        ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg"
                                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                }`}
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                        Processing...
                                    </div>
                                ) : !isNextDisabled() ? (
                                    "Confirm & Book Appointment"
                                ) : (
                                    "Complete All Fields"
                                )}
                            </button>

                            {!isNextDisabled() && !isLoading && (
                                <p className="text-xs text-center text-gray-500 mt-3">
                                    You'll receive a confirmation email after
                                    booking
                                </p>
                            )}
                        </div>
                    </>
                );
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">
                        Loading booking information...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                {/* Back Button */}
                <Link
                    href={"/pro"}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
                >
                    <ChevronLeft size={20} />
                    <span className="font-medium">Back to Properties</span>
                </Link>

                {/* Steps Header */}
                <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 mb-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                        <div>
                            {property && (
                                <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                                    Booking for:{" "}
                                    <span className="font-semibold">
                                        {property.title}
                                    </span>
                                </p>
                            )}
                        </div>
                    </div>
                    <p className="text-gray-600 text-sm sm:text-base">
                        {currentStep === 1 &&
                            "Check out our availability and book the date and time that works for you"}
                        {currentStep === 2 &&
                            "Fill in your details to confirm the booking"}
                    </p>
                </div>

                {/* Step Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                    {renderStepContent()}
                </div>

                {/* Navigation Buttons */}
                <div className="mt-6 flex justify-between items-center">
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
                </div>
            </div>
        </div>
    );
};

export default CalendarIntegration;