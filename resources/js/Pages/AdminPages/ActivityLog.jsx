import { Link } from '@inertiajs/react'
import {
    ChevronUp,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
} from "lucide-react"
import React, { useState, useMemo, useEffect, useCallback } from "react"
import { useTable, useSortBy, usePagination } from "react-table"
import axios from "axios"
import AdminWrapper from '@/AdminWrapper/AdminWrapper'

const ActivityLogs = () => {
    const [activityLogs, setActivityLogs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [pagination, setPagination] = useState({
        total: 0,
        per_page: 5,
        current_page: 1,
        last_page: 1
    })

    const fetchLogs = useCallback(async (page = 1, pageSize = 5) => {
        try {
            setLoading(true)
            setError(null)
            
            const response = await axios.get(route("ourlogs.index"), {
                params: {
                    page: page,
                    per_page: pageSize
                }
            })

            const responseData = response.data

            if (responseData.success && responseData.data) {
                setActivityLogs(responseData.data.data || [])
                setPagination({
                    total: responseData.data.total || 0,
                    per_page: responseData.data.per_page || pageSize,
                    current_page: responseData.data.current_page || page,
                    last_page: responseData.data.last_page || 1
                })
            } else {
                console.error(
                    "Unexpected response structure:",
                    responseData
                )
                setActivityLogs([])
                setError("Unexpected data format received from server.")
            }
        } catch (error) {
            console.error("Error fetching logs:", error)
            setError("Failed to fetch logs. Please try again later.")
            setActivityLogs([])
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchLogs(1, pagination.per_page)
    }, [])

    const columns = useMemo(
        () => [
            {
                Header: "ID",
                accessor: (row, i) => (pagination.current_page - 1) * pagination.per_page + i + 1,
                id: "rowIndex",
                width: 60,
            },
            {
                Header: "Name",
                accessor: "name",
            },
            {
                Header: "IP Address",
                accessor: "ip_address",
            },
            {
                Header: "Title",
                accessor: "title",
                Cell: ({ value }) => {
                    const maxLength = 50
                    if (value && value.length > maxLength) {
                        return value.slice(0, maxLength) + '...'
                    }
                    return value || '-'
                },
            },
            {
                Header: "Date",
                accessor: "created_at",
                Cell: ({ value }) => {
                    return value ? new Date(value).toLocaleString() : '-'
                },
            },
        ],
        [pagination.current_page, pagination.per_page]
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data: activityLogs,
            manualPagination: true,
            pageCount: Math.ceil(pagination.total / pagination.per_page),
        },
        useSortBy,
        usePagination
    )

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.last_page) {
            fetchLogs(newPage, pagination.per_page)
        }
    }

    const handlePageSizeChange = (newSize) => {
        fetchLogs(1, newSize)
    }

    return (
        <AdminWrapper>
            <div className="flex items-center mb-6">
                <div>
                    <h2 className="text-xl font-semibold">
                        User Logs
                    </h2>
                    <div className="flex items-center gap-1 text-gray-600">
                        <Link href={'/home'} className="hover:underline">
                            Home
                        </Link>
                        <span>/</span>
                        <span>Reports</span>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-wrap items-center justify-between mb-6 md:mb-8">
                    <div className="flex items-center">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                            Activity Logs
                        </h1>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-8">Loading...</div>
                ) : error ? (
                    <div className="text-center py-8 text-red-500">{error}</div>
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
                                    {rows.length > 0 ? (
                                        rows.map((row) => {
                                            prepareRow(row)
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
                                            )
                                        })
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={columns.length}
                                                className="px-6 py-4 text-center text-gray-500"
                                            >
                                                No activity logs found.
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
                                    value={pagination.per_page}
                                    onChange={(e) =>
                                        handlePageSizeChange(Number(e.target.value))
                                    }
                                    className="border border-gray-300 rounded-md px-2 py-1 text-sm"
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
                                <span className="text-sm text-gray-700 ml-4">
                                    Total: {pagination.total} records
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => handlePageChange(1)}
                                    disabled={pagination.current_page === 1}
                                    className={`p-1 rounded ${
                                        pagination.current_page === 1
                                            ? "opacity-50 cursor-not-allowed"
                                            : "hover:bg-gray-200"
                                    }`}
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <button
                                    onClick={() => handlePageChange(pagination.current_page - 1)}
                                    disabled={pagination.current_page === 1}
                                    className={`px-3 py-1 rounded ${
                                        pagination.current_page === 1
                                            ? "opacity-50 cursor-not-allowed"
                                            : "hover:bg-gray-200"
                                    }`}
                                >
                                    Previous
                                </button>
                                <span className="text-sm text-gray-700">
                                    Page <strong>{pagination.current_page}</strong> of{" "}
                                    <strong>{pagination.last_page}</strong>
                                </span>
                                <button
                                    onClick={() => handlePageChange(pagination.current_page + 1)}
                                    disabled={pagination.current_page === pagination.last_page}
                                    className={`px-3 py-1 rounded ${
                                        pagination.current_page === pagination.last_page
                                            ? "opacity-50 cursor-not-allowed"
                                            : "hover:bg-gray-200"
                                    }`}
                                >
                                    Next
                                </button>
                                <button
                                    onClick={() => handlePageChange(pagination.last_page)}
                                    disabled={pagination.current_page === pagination.last_page}
                                    className={`p-1 rounded ${
                                        pagination.current_page === pagination.last_page
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
    )
}

export default ActivityLogs