import AdminWrapper from "@/AdminWrapper/AdminWrapper";
import React, { useMemo, useEffect, useState } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import {
    ChevronUp,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    SquarePen,
    Trash,
    Eye,
} from "lucide-react";
import axios from "axios";
import AddProperty from "@/AddFormComponents/AddProperty";
import PropertiesDetails from "./PropertiesDetails";
import EditProperty from "@/EditFormComponents/EditProperty";

const Property = () => {
    const [properties, setProperties] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [editingProperty, setEditingProperty] = useState(null);
    const [reloadTrigger, setReloadTrigger] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedProperty, setSelectedProperty] = useState(null);

    // Fetch properties on component mount and when reloadTrigger changes
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                setLoading(true);
                setError("");
                const response = await axios.get(route("ourproperty.index"));
                setProperties(response.data.data);
            } catch (error) {
                console.error("Error fetching properties:", error);
                setError("Failed to fetch properties. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, [reloadTrigger]);

    // Define table columns
    const columns = useMemo(
        () => [
            {
                Header: "S/N",
                accessor: (row, i) => i + 1,
                id: "rowIndex",
                width: 60,
            },
            {
                Header: "Title",
                accessor: "title",
                Cell: ({ value }) => (
                    <div className="max-w-xs truncate" title={value}>
                        {value}
                    </div>
                ),
            },
            {
                Header: "Location",
                accessor: "location",
            },
            {
                Header: "Bedrooms",
                accessor: "bedrooms",
            },
            {
                Header: "Bathrooms",
                accessor: "bathrooms",
            },
            {
                Header: "Area (sq ft)",
                accessor: "size",
            },
            {
                Header: "Property Type",
                accessor: "property_type",
            },
            {
                Header: "Price",
                accessor: "price",
                Cell: ({ row }) => (
                    <div>NPR {row.original.price}/month</div>
                ),
            },
            {
                Header: "Actions",
                id: "actions",
                Cell: ({ row }) => (
                    <div className="flex space-x-2">
                        <button
                            onClick={() => handleDetails(row.original)}
                            className="text-blue-600 hover:text-blue-900 transition duration-200"
                            title="View Details"
                        >
                            <Eye size={21} className="inline-block mr-1" />
                        </button>
                        <button
                            onClick={() => handleEdit(row.original)}
                            className="text-indigo-600 hover:text-indigo-900 transition duration-200"
                            title="Edit Property"
                        >
                            <SquarePen
                                size={21}
                                className="inline-block mr-1"
                            />
                        </button>
                        <button
                            onClick={() => handleDelete(row.original.id)}
                            className="text-red-600 hover:text-red-900 transition duration-200"
                            title="Delete Property"
                        >
                            <Trash size={21} className="inline-block mr-1" />
                        </button>
                    </div>
                ),
                disableSortBy: true,
            },
        ],
        []
    );

    const data = useMemo(() => properties, [properties]);

    // React Table instance
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
            data,
            initialState: { pageIndex: 0, pageSize: 10 },
        },
        useSortBy,
        usePagination
    );

    // Handler functions
    const handleDetails = (property) => {
        setSelectedProperty(property);
    };

    const handleEdit = (property) => {
        setEditingProperty(property);
        setShowEditForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this property?")) {
            try {
                await axios.delete(route("ourproperty.destroy", { id }));
                setReloadTrigger((prev) => !prev);
            } catch (error) {
                console.error("Error deleting property:", error);
                alert("Error deleting property");
            }
        }
    };

    const handleCreate = async (formData) => {
        try {
            await axios.post(route("ourproperty.store"), formData);
            setReloadTrigger((prev) => !prev);
            setShowAddForm(false);
        } catch (error) {
            console.error("Error creating property:", error);
            throw error;
        }
    };

    const handleUpdate = async (formData, id) => {
        try {
            await axios.post(route("ourproperty.update", { id }), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setReloadTrigger((prev) => !prev);
            setShowEditForm(false);
            setEditingProperty(null);
        } catch (error) {
            console.error("Error updating property:", error);
            throw error;
        }
    };

    const handleAddFormCancel = () => {
        setShowAddForm(false);
    };

    const handleEditFormCancel = () => {
        setShowEditForm(false);
        setEditingProperty(null);
    };

    const handleDetailsClose = () => {
        setSelectedProperty(null);
    };

    return (
        <div>
            <AdminWrapper>
                <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold">
                            Property Management
                        </h1>
                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
                            onClick={() => setShowAddForm(true)}
                        >
                            Add New Property
                        </button>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}

                    {/* Loading State */}
                    {loading && (
                        <div className="flex justify-center items-center py-8">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                        </div>
                    )}

                    {/* Properties Table */}
                    {!loading && (
                        <div className="bg-white shadow-md rounded-lg overflow-hidden">
                            {properties.length === 0 ? (
                                <div className="text-center py-8 text-gray-500">
                                    No properties found. Click "Add New Property" to create one.
                                </div>
                            ) : (
                                <>
                                    <div className="overflow-x-auto">
                                        <table
                                            {...getTableProps()}
                                            className="min-w-full divide-y divide-gray-200"
                                        >
                                            <thead className="bg-gray-50">
                                                {headerGroups.map(
                                                    (headerGroup) => (
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
                                                    )
                                                )}
                                            </thead>
                                            <tbody
                                                {...getTableBodyProps()}
                                                className="bg-white divide-y divide-gray-200"
                                            >
                                                {page.map((row) => {
                                                    prepareRow(row);
                                                    return (
                                                        <tr
                                                            {...row.getRowProps()}
                                                            className="hover:bg-gray-50"
                                                        >
                                                            {row.cells.map(
                                                                (cell) => (
                                                                    <td
                                                                        {...cell.getCellProps()}
                                                                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                                                    >
                                                                        {cell.render(
                                                                            "Cell"
                                                                        )}
                                                                    </td>
                                                                )
                                                            )}
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Pagination */}
                                    <div className="flex items-center justify-between flex-col md:flex-row mt-4 px-6 py-3 bg-gray-50 border-t border-gray-200">
                                        <div className="flex items-center mb-4 md:mb-0">
                                            <span className="text-sm text-gray-700 mr-2">
                                                Show
                                            </span>
                                            <select
                                                value={pageSize}
                                                onChange={(e) =>
                                                    setPageSize(
                                                        Number(e.target.value)
                                                    )
                                                }
                                                className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                                            >
                                                {[5, 10, 20, 50].map((size) => (
                                                    <option
                                                        key={size}
                                                        value={size}
                                                    >
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
                                                Page{" "}
                                                <strong>{pageIndex + 1}</strong>{" "}
                                                of{" "}
                                                <strong>
                                                    {pageOptions.length}
                                                </strong>
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
                                                onClick={() =>
                                                    gotoPage(pageCount - 1)
                                                }
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
                    )}

                    {/* Add Property Modal */}
                    {showAddForm && (
                        <AddProperty
                            onClose={handleAddFormCancel}
                            handleCreate={handleCreate}
                        />
                    )}

                    {/* Edit Property Modal */}
                    {showEditForm && editingProperty && (
                        <EditProperty
                            editingProperty={editingProperty}
                            onClose={handleEditFormCancel}
                            handleUpdate={handleUpdate}
                        />
                    )}

                    {/* Property Details Modal */}
                    {selectedProperty && (
                        <PropertiesDetails 
                            property={selectedProperty}
                            onClose={handleDetailsClose}
                        />
                    )}
                </div>
            </AdminWrapper>
        </div>
    );
};

export default Property;