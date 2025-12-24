import AdminWrapper from "@/AdminWrapper/AdminWrapper";
import { Link } from "@inertiajs/react";
import axios from "axios";
import {
    ChevronUp,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    X,
    Clock,
    Calendar,
    Edit,
} from "lucide-react";
import React, { useState, useMemo, useEffect } from "react";
import { useTable, useSortBy, usePagination } from "react-table";

const BlockReservation = () => {
    const [blockedSlots, setBlockedSlots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showBlockSlotForm, setShowBlockSlotForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [editingSlotId, setEditingSlotId] = useState(null);
    const [formData, setFormData] = useState({
        date: "",
        startTime: "09:00",
        endTime: "10:00",
        reason: "",
    });
    const [formError, setFormError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [reloadTrigger, setReloadTrigger] = useState(false);

    useEffect(() => {
        const fetchBlockReservations = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await axios.get(
                    route("ourblockreservations.index")
                );
                
                if (response.data.success && Array.isArray(response.data.data)) {
                    setBlockedSlots(response.data.data);
                } else {
                    console.error("Unexpected response structure:", response.data);
                    setBlockedSlots([]);
                    setError("Unexpected data format received from server.");
                }
            } catch (err) {
                setError("Failed to load blocked time slots. Please try again later.");
                console.error("Error fetching reservations:", err);
                setBlockedSlots([]);
            } finally {
                setLoading(false);
            }
        };
        fetchBlockReservations();
    }, [reloadTrigger]);

    const calculateDuration = (startTime, endTime) => {
        const [startHours, startMinutes] = startTime.split(':').map(Number);
        const [endHours, endMinutes] = endTime.split(':').map(Number);
        const startTotalMinutes = startHours * 60 + startMinutes;
        const endTotalMinutes = endHours * 60 + endMinutes;
        const durationMinutes = endTotalMinutes - startTotalMinutes;
        return (durationMinutes / 60).toFixed(2);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(route("ourblockreservations.destroy", { id }));
            setReloadTrigger((prev) => !prev);
            setError(null);
        } catch (error) {
            console.log("Error deleting block reservation:", error);
            setError("Failed to delete time slot. Please try again.");
        }
    };

    // Time Slot Management
    const openBlockSlotForm = () => {
        setShowBlockSlotForm(true);
        setShowEditForm(false);
        setEditingSlotId(null);
        setFormData({ date: "", startTime: "09:00", endTime: "10:00", reason: "" });
        setFormError("");
    };

    const openEditForm = (slot) => {
        setShowEditForm(true);
        setShowBlockSlotForm(false);
        setEditingSlotId(slot.id);
        setFormData({
            date: slot.date,
            startTime: slot.start_time,
            endTime: slot.end_time,
            reason: slot.reason || "",
        });
        setFormError("");
    };

    const closeBlockSlotForm = () => {
        setShowBlockSlotForm(false);
        setFormData({ date: "", startTime: "09:00", endTime: "10:00", reason: "" });
        setFormError("");
    };

    const closeEditForm = () => {
        setShowEditForm(false);
        setEditingSlotId(null);
        setFormData({ date: "", startTime: "09:00", endTime: "10:00", reason: "" });
        setFormError("");
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setFormError("");
    };

    const validateTimeSlot = (date, startTime, endTime, excludeId = null) => {
        if (!date) return "Please select a date";
        if (!startTime || !endTime) return "Please select both start and end time";
        if (startTime >= endTime) return "End time must be after start time";

        const hasOverlap = blockedSlots.some(
            (slot) => {
                // Skip the slot being edited
                if (excludeId && slot.id === excludeId) return false;
                
                return slot.date === date &&
                    ((startTime >= slot.start_time && startTime < slot.end_time) ||
                     (endTime > slot.start_time && endTime <= slot.end_time) ||
                     (startTime <= slot.start_time && endTime >= slot.end_time));
            }
        );

        if (hasOverlap) return "This time slot overlaps with an existing blocked slot";
        return "";
    };

    const handleBlockSlotSubmit = async (e) => {
        e.preventDefault();
        const validationError = validateTimeSlot(formData.date, formData.startTime, formData.endTime);
        if (validationError) {
            setFormError(validationError);
            return;
        }

        try {
            setSubmitting(true);
            const duration = calculateDuration(formData.startTime, formData.endTime);
            const requestData = {
                date: formData.date,
                start_time: formData.startTime,
                end_time: formData.endTime,
                duration: duration,
                reason: formData.reason || "No reason provided",
            };

            await axios.post(route("ourblockreservations.store"), requestData);

            setReloadTrigger((prev) => !prev);
            closeBlockSlotForm();
        } catch (err) {
            console.error("Error blocking time slot:", err);
            setFormError("Failed to block time slot. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleEditSlotSubmit = async (e) => {
        e.preventDefault();
        const validationError = validateTimeSlot(formData.date, formData.startTime, formData.endTime, editingSlotId);
        if (validationError) {
            setFormError(validationError);
            return;
        }

        try {
            setSubmitting(true);
            const duration = calculateDuration(formData.startTime, formData.endTime);
            const requestData = {
                date: formData.date,
                start_time: formData.startTime,
                end_time: formData.endTime,
                duration: duration,
                reason: formData.reason || "No reason provided",
            };

            await axios.put(route("ourblockreservations.update", { id: editingSlotId }), requestData);

            setReloadTrigger((prev) => !prev);
            closeEditForm();
        } catch (err) {
            console.error("Error updating time slot:", err);
            setFormError("Failed to update time slot. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleUnblockSlot = async (slotId) => {
        try {
            await handleDelete(slotId);
        } catch (error) {
            console.error("Error unblocking slot:", error);
        }
    };

    // Table Columns
    const columns = useMemo(
        () => [
            {
                Header: "ID",
                accessor: (row, i) => i + 1,
                id: "rowIndex",
                width: 60,
            },
            {
                Header: "Date",
                accessor: "date",
                Cell: ({ value }) => (
                    <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-gray-400 flex-shrink-0" />
                        <span className="truncate">{value}</span>
                    </div>
                ),
            },
            {
                Header: "Time Slot",
                accessor: (row) => `${row.start_time} - ${row.end_time}`,
                id: "timeSlot",
                Cell: ({ row }) => (
                    <div className="flex items-center gap-2">
                        <Clock size={16} className="text-gray-400 flex-shrink-0" />
                        <span className="font-medium truncate">
                            {row.original.start_time} - {row.original.end_time}
                        </span>
                    </div>
                ),
            },
            {
                Header: "Duration",
                accessor: (row) => {
                    const duration = calculateDuration(row.start_time, row.end_time);
                    const hours = Math.floor(duration);
                    const minutes = Math.round((duration - hours) * 60);
                    if (hours === 0) return `${minutes} min${minutes !== 1 ? 's' : ''}`;
                    if (minutes === 0) return `${hours} hr${hours !== 1 ? 's' : ''}`;
                    return `${hours} hr${hours !== 1 ? 's' : ''} ${minutes} min${minutes !== 1 ? 's' : ''}`;
                },
                id: "duration",
            },
            {
                Header: "Reason",
                accessor: "reason",
                Cell: ({ value }) => (
                    <span className="truncate" title={value}>
                        {value || "—"}
                    </span>
                ),
            },
            {
                Header: "Actions",
                Cell: ({ row }) => (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => openEditForm(row.original)}
                            className="px-4 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors whitespace-nowrap flex items-center gap-1"
                        >
                            <Edit size={14} />
                            Edit
                        </button>
                        <button
                            onClick={() => handleUnblockSlot(row.original.id)}
                            className="px-4 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700 transition-colors whitespace-nowrap"
                        >
                            Delete
                        </button>
                    </div>
                ),
            },
        ],
        []
    );

    // Table Hooks
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data: blockedSlots,
            initialState: { pageIndex: 0, pageSize: 5 },
        },
        useSortBy,
        usePagination
    );

    return (
        <AdminWrapper>

            <div className="bg-white rounded-lg shadow-md p-6">
                {error && (
                    <div className="mb-6 p-4 bg-red-100 text-red-700 rounded flex justify-between items-center">
                        <span>{error}</span>
                        <button 
                            onClick={() => setError(null)}
                            className="text-red-700 hover:text-red-900"
                        >
                            <X size={16} />
                        </button>
                    </div>
                )}

                <div className="flex flex-wrap items-center justify-between mb-6 md:mb-8">
                    <div className="flex items-center">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                            Blocked Time Slots
                        </h1>
                    </div>
                    
                    <button
                        onClick={openBlockSlotForm}
                        className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors text-sm font-medium"
                    >
                        <Clock size={18} />
                        <span>Block Time Slot</span>
                    </button>
                </div>

                {loading ? (
                    <div className="text-center py-8">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                        <p className="mt-2 text-gray-600">Loading blocked time slots...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-8 text-red-500">{error}</div>
                ) : (
                    <>
                        <div className="overflow-x-auto rounded-lg shadow">
                            <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    {headerGroups.map((headerGroup) => (
                                        <tr {...headerGroup.getHeaderGroupProps()}>
                                            {headerGroup.headers.map((column) => (
                                                <th
                                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    <div className="flex items-center">
                                                        {column.render("Header")}
                                                        {column.isSorted ? (
                                                            column.isSortedDesc ? (
                                                                <ChevronDown size={16} className="ml-1" />
                                                            ) : (
                                                                <ChevronUp size={16} className="ml-1" />
                                                            )
                                                        ) : (
                                                            ""
                                                        )}
                                                    </div>
                                                </th>
                                            ))}
                                        </tr>
                                    ))}
                                </thead>
                                <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
                                    {page.length > 0 ? (
                                        page.map((row) => {
                                            prepareRow(row);
                                            return (
                                                <tr {...row.getRowProps()} className="hover:bg-gray-50">
                                                    {row.cells.map((cell) => (
                                                        <td
                                                            {...cell.getCellProps()}
                                                            className="px-6 py-4 whitespace-nowrap"
                                                        >
                                                            {cell.render("Cell")}
                                                        </td>
                                                    ))}
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan={columns.length} className="px-6 py-12 text-center text-gray-500">
                                                <div className="flex flex-col items-center">
                                                    <Calendar size={40} className="text-gray-300 mb-2" />
                                                    <p className="text-base font-medium mb-1">No blocked time slots</p>
                                                    <p className="text-sm text-gray-400 mb-3">Block time slots to manage reservations</p>
                                                    <button
                                                        onClick={openBlockSlotForm}
                                                        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 text-sm font-medium"
                                                    >
                                                        Block Your First Time Slot
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        
                        {/* Pagination */}
                        {blockedSlots.length > 0 && (
                            <div className="flex items-center justify-between flex-col md:flex-row mt-4 space-y-4 md:space-y-0">
                                <div className="flex items-center">
                                    <span className="text-sm text-gray-700 mr-2">
                                        Show
                                    </span>
                                    <select
                                        value={pageSize}
                                        onChange={(e) => setPageSize(Number(e.target.value))}
                                        className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        {[5, 10, 20].map((size) => (
                                            <option key={size} value={size}>
                                                {size}
                                            </option>
                                        ))}
                                    </select>
                                    <span className="text-sm text-gray-700 ml-2">
                                        entries
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => gotoPage(0)}
                                        disabled={!canPreviousPage}
                                        className={`p-1 rounded ${
                                            !canPreviousPage
                                                ? "opacity-50 cursor-not-allowed"
                                                : "hover:bg-gray-200"
                                        }`}
                                    >
                                        <ChevronLeft size={20} />
                                    </button>
                                    <button
                                        onClick={() => previousPage()}
                                        disabled={!canPreviousPage}
                                        className={`px-3 py-1 rounded ${
                                            !canPreviousPage
                                                ? "opacity-50 cursor-not-allowed"
                                                : "hover:bg-gray-200"
                                        }`}
                                    >
                                        Previous
                                    </button>
                                    <span className="text-sm text-gray-700">
                                        Page <strong>{pageIndex + 1}</strong> of{" "}
                                        <strong>{pageOptions.length}</strong>
                                    </span>
                                    <button
                                        onClick={() => nextPage()}
                                        disabled={!canNextPage}
                                        className={`px-3 py-1 rounded ${
                                            !canNextPage
                                                ? "opacity-50 cursor-not-allowed"
                                                : "hover:bg-gray-200"
                                        }`}
                                    >
                                        Next
                                    </button>
                                    <button
                                        onClick={() => gotoPage(pageCount - 1)}
                                        disabled={!canNextPage}
                                        className={`p-1 rounded ${
                                            !canNextPage
                                                ? "opacity-50 cursor-not-allowed"
                                                : "hover:bg-gray-200"
                                        }`}
                                    >
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Block Slot Modal */}
            {showBlockSlotForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                        <div className="flex items-center justify-between p-6 border-b">
                            <h2 className="text-xl font-semibold text-gray-800">Block Time Slot</h2>
                            <button
                                onClick={closeBlockSlotForm}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleBlockSlotSubmit} className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                                        Date *
                                    </label>
                                    <input
                                        type="date"
                                        id="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        min={new Date().toISOString().split("T")[0]}
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
                                            Start Time *
                                        </label>
                                        <input
                                            type="time"
                                            id="startTime"
                                            name="startTime"
                                            value={formData.startTime}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                            min="00:00"
                                            max="23:59"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
                                            End Time *
                                        </label>
                                        <input
                                            type="time"
                                            id="endTime"
                                            name="endTime"
                                            value={formData.endTime}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                            min="00:01"
                                            max="23:59"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
                                        Reason (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        id="reason"
                                        name="reason"
                                        value={formData.reason}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Staff meeting"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {formError && (
                                    <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                                        <p className="text-sm text-red-600">{formError}</p>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-end gap-2 mt-6">
                                <button
                                    type="button"
                                    onClick={closeBlockSlotForm}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50"
                                >
                                    {submitting ? "Blocking..." : "Block Time Slot"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Slot Modal */}
            {showEditForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                        <div className="flex items-center justify-between p-6 border-b">
                            <h2 className="text-xl font-semibold text-gray-800">Edit Time Slot</h2>
                            <button
                                onClick={closeEditForm}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleEditSlotSubmit} className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="edit-date" className="block text-sm font-medium text-gray-700 mb-1">
                                        Date *
                                    </label>
                                    <input
                                        type="date"
                                        id="edit-date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        min={new Date().toISOString().split("T")[0]}
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="edit-startTime" className="block text-sm font-medium text-gray-700 mb-1">
                                            Start Time *
                                        </label>
                                        <input
                                            type="time"
                                            id="edit-startTime"
                                            name="startTime"
                                            value={formData.startTime}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                            min="00:00"
                                            max="23:59"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="edit-endTime" className="block text-sm font-medium text-gray-700 mb-1">
                                            End Time *
                                        </label>
                                        <input
                                            type="time"
                                            id="edit-endTime"
                                            name="endTime"
                                            value={formData.endTime}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                            min="00:01"
                                            max="23:59"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="edit-reason" className="block text-sm font-medium text-gray-700 mb-1">
                                        Reason (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        id="edit-reason"
                                        name="reason"
                                        value={formData.reason}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Staff meeting"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {formError && (
                                    <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                                        <p className="text-sm text-red-600">{formError}</p>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-end gap-2 mt-6">
                                <button
                                    type="button"
                                    onClick={closeEditForm}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                                >
                                    {submitting ? "Updating..." : "Update Time Slot"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminWrapper>
    );
};

export default BlockReservation;