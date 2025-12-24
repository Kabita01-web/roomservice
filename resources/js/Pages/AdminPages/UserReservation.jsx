import {
    ChevronUp,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    X,
} from "lucide-react";
import React, { useState, useMemo, useEffect } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import axios from "axios";
import { Link } from "@inertiajs/react";
import AdminWrapper from "@/AdminWrapper/AdminWrapper";


const UserReservation = () => {
    const [reservations, setReservations] = useState([]);
    const [filteredReservations, setFilteredReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [updatingId, setUpdatingId] = useState(null);
    const [filter, setFilter] = useState("all");

    // ======================================
    // FETCH RESERVATIONS
    // ======================================
    useEffect(() => {
        const fetchReservations = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await axios.get(
                    route("ouruserreservations.index")
                );
                
                // Check if the response has the expected structure
                if (response.data.success && Array.isArray(response.data.data)) {
                    setReservations(response.data.data);
                } else {
                    console.error("Unexpected response structure:", response.data);
                    setReservations([]);
                    setError("Unexpected data format received from server.");
                }
            } catch (err) {
                setError("Failed to load reservations. Please try again later.");
                console.error(err);
                setReservations([]);
            } finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, [refreshTrigger]);

    // ======================================
    // FILTER RESERVATIONS
    // ======================================
    useEffect(() => {
        if (!reservations.length) {
            setFilteredReservations([]);
            return;
        }

        if (filter === "accepted") {
            setFilteredReservations(
                reservations.filter((r) => r.status === "Accepted")
            );
        } else if (filter === "rejected") {
            setFilteredReservations(
                reservations.filter((r) => r.status === "Rejected")
            );
        } else if (filter === "pending") {
            setFilteredReservations(
                reservations.filter((r) => r.status === "Pending")
            );
        } else {
            setFilteredReservations(reservations);
        }
    }, [reservations, filter]);

    // ======================================
    // UPDATE STATUS
    // ======================================
    const updateStatus = async (id, status) => {
        try {
            setUpdatingId(id);

            const response = await axios.put(
                route("ouruserreservations.update", { id }),
                { status }
            );

            if (response.data.success) {
                setRefreshTrigger((prev) => prev + 1);
                setError(null);
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    "Failed to update reservation status"
            );
        } finally {
            setUpdatingId(null);
        }
    };

    // ======================================
    // TABLE COLUMNS
    // ======================================
    const columns = useMemo(
        () => [
            {
                Header: "ID",
                accessor: (row, i) => i + 1,
                id: "rowIndex",
                width: 60,
            },
            {
                Header: "Tenet User",
                accessor: "user_name",
            },
            {
                Header: "Tenet Email",
                accessor: "email",
            },
            {
                Header: "Tenet Phone",
                accessor: "phone",
            },
            {
                Header: "Tenet Address",
                accessor: "address",
                Cell: ({ value }) => value || "-",
            },
            {
                Header: "Property",
                accessor: (row) => row.property?.title || "-",
            },
            {
                Header: "Package",
               accessor: (row) => row.property?.property_type || "-",
            },
            {
                Header: "Date",
                accessor: "reservation_date",
                Cell: ({ value }) =>
                    value ? new Date(value).toLocaleDateString() : "-",
            },
            {
                Header: "Time",
                accessor: "reservation_time",
            },
            {
                Header: "Status",
                accessor: "status",
                Cell: ({ value }) => (
                    <span
                        className={`px-2 py-1 rounded text-xs font-semibold
                        ${
                            value === "Pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : value === "Accepted"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                        }`}
                    >
                        {value}
                    </span>
                ),
            },
            {
                Header: "Actions",
                Cell: ({ row }) => (
                    <div className="flex gap-2">
                        {row.original.status !== "Accepted" && (
                            <button
                                onClick={() =>
                                    updateStatus(row.original.id, "Accepted")
                                }
                                disabled={updatingId === row.original.id}
                                className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
                            >
                                {updatingId === row.original.id ? "Processing..." : "Accept"}
                            </button>
                        )}

                        {row.original.status !== "Rejected" && (
                            <button
                                onClick={() =>
                                    updateStatus(row.original.id, "Rejected")
                                }
                                disabled={updatingId === row.original.id}
                                className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors"
                            >
                                {updatingId === row.original.id ? "Processing..." : "Reject"}
                            </button>
                        )}

                        {(row.original.status === "Accepted" ||
                            row.original.status === "Rejected") && (
                            <button
                                onClick={() =>
                                    updateStatus(row.original.id, "Pending")
                                }
                                disabled={updatingId === row.original.id}
                                className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700 transition-colors"
                            >
                                {updatingId === row.original.id ? "Processing..." : "Reset"}
                            </button>
                        )}
                    </div>
                ),
            },
        ],
        [updatingId]
    );

    // ======================================
    // TABLE SETUP
    // ======================================
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
            data: filteredReservations,
            initialState: { pageIndex: 0, pageSize: 5 },
        },
        useSortBy,
        usePagination
    );

    return (
        <AdminWrapper>
            {/* <div className="flex items-center mb-6">
                <div>
                    <h2 className="text-xl font-semibold">
                        User Reservations
                    </h2>
                    <div className="flex items-center gap-1 text-gray-600">
                        <Link href={'/home'} className="hover:underline">
                            Home
                        </Link>
                        <span>/</span>
                        <span>Reservations</span>
                    </div>
                </div>
            </div> */}

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
                            User Reservations
                        </h1>
                    </div>
                    
                    {/* Filter Buttons */}
                    <div className="flex gap-2 mt-4 md:mt-0">
                        <button
                            onClick={() => setFilter("all")}
                            className={`px-4 py-2 rounded text-sm font-medium ${
                                filter === "all"
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilter("pending")}
                            className={`px-4 py-2 rounded text-sm font-medium ${
                                filter === "pending"
                                    ? "bg-yellow-600 text-white"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                        >
                            Pending
                        </button>
                        <button
                            onClick={() => setFilter("accepted")}
                            className={`px-4 py-2 rounded text-sm font-medium ${
                                filter === "accepted"
                                    ? "bg-green-600 text-white"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                        >
                            Accepted
                        </button>
                        <button
                            onClick={() => setFilter("rejected")}
                            className={`px-4 py-2 rounded text-sm font-medium ${
                                filter === "rejected"
                                    ? "bg-red-600 text-white"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                        >
                            Rejected
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-8">Loading reservations...</div>
                ) : (
                    <>
                        <div className="overflow-x-auto rounded-lg shadow">
                            <table
                                {...getTableProps()}
                                className="min-w-full divide-y divide-gray-200"
                            >
                                <thead className="bg-gray-50">
                                    {headerGroups.map((headerGroup) => (
                                        <tr
                                            {...headerGroup.getHeaderGroupProps()}
                                        >
                                            {headerGroup.headers.map(
                                                (column) => (
                                                    <th
                                                        {...column.getHeaderProps(
                                                            column.getSortByToggleProps()
                                                        )}
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        <div className="flex items-center">
                                                            {column.render(
                                                                "Header"
                                                            )}
                                                            {column.isSorted ? (
                                                                column.isSortedDesc ? (
                                                                    <ChevronDown
                                                                        size={
                                                                            16
                                                                        }
                                                                        className="ml-1"
                                                                    />
                                                                ) : (
                                                                    <ChevronUp
                                                                        size={
                                                                            16
                                                                        }
                                                                        className="ml-1"
                                                                    />
                                                                )
                                                            ) : (
                                                                ""
                                                            )}
                                                        </div>
                                                    </th>
                                                )
                                            )}
                                        </tr>
                                    ))}
                                </thead>
                                <tbody
                                    {...getTableBodyProps()}
                                    className="bg-white divide-y divide-gray-200"
                                >
                                    {page.length > 0 ? (
                                        page.map((row) => {
                                            prepareRow(row);
                                            return (
                                                <tr
                                                    {...row.getRowProps()}
                                                    className="hover:bg-gray-50"
                                                >
                                                    {row.cells.map((cell) => (
                                                        <td
                                                            {...cell.getCellProps()}
                                                            className="px-6 py-4 whitespace-nowrap"
                                                        >
                                                            {cell.render(
                                                                "Cell"
                                                            )}
                                                        </td>
                                                    ))}
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={columns.length}
                                                className="px-6 py-4 text-center text-gray-500"
                                            >
                                                No reservations found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        
                        {/* Pagination */}
                        <div className="flex items-center justify-between flex-col md:flex-row mt-4 space-y-4 md:space-y-0">
                            <div className="flex items-center">
                                <span className="text-sm text-gray-700 mr-2">
                                    Show
                                </span>
                                <select
                                    value={pageSize}
                                    onChange={(e) =>
                                        setPageSize(Number(e.target.value))
                                    }
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
                    </>
                )}
            </div>
        </AdminWrapper>
    );
};

export default UserReservation;