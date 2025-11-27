// import React, { useState, useEffect } from "react";
// import { Link, usePage } from "@inertiajs/react";
// import {
//     Home,
//     FolderTree,
//     Users,
//     FileText,
//     Package,
//     BookOpen,
//     MessageSquareQuote,
//     Activity,
//     LogOut,
//     X,
//     Menu,
//     ChevronDown,
//     ChevronRight,
//     Layers,
//     ShoppingCart,
//     Settings,
// } from "lucide-react";

// const AdminSideBar = ({
//     isMobileOpen,
//     onMobileToggle,
//     user,
// }) => {
//     const { url, props } = usePage();
//     const [activeItem, setActiveItem] = useState("");
//     const [isContentOpen, setIsContentOpen] = useState(false);

//     useEffect(() => {
//         const path = url.split("/")[1] || "dashboard";
//         const activeMap = {
//             dashboard: "Dashboard",
//             home: "Home",
//             categories: "Category",
//             sub_category: "Sub Category",
//             "user-management": "Users",
//             content: "Content",
//             "content-posts": "Posts",
//             "content-pages": "Pages",
//             "content-media": "Media",
//             products: "Products",
//             blogs: "Blog",
//             testimonials: "Testimonials",
//             "activity-log": "Activity Logs",
//             "order-products": "Order Products",
//             "admin-setting": "Settings",
//             messages: "Messages",
//         };

//         setActiveItem(activeMap[path] || "Dashboard");

//         // Auto-expand content dropdown if on content-related pages
//         if (path.startsWith("content")) {
//             setIsContentOpen(true);
//         }
//     }, [url]);

//     return (
//         <div>
//             {/* Mobile overlay */}
//             {isMobileOpen && (
//                 <div
//                     className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
//                     onClick={onMobileToggle}
//                 />
//             )}

//             <div
//                 className={`fixed left-0 top-0 h-screen z-50 transition-all duration-300 w-[85%] md:w-[30%] lg:w-[18%] bg-white/95 backdrop-blur-md border-r border-gray-200/50 ${
//                     isMobileOpen
//                         ? "translate-x-0"
//                         : "-translate-x-full lg:translate-x-0"
//                 }`}
//             >
//                 {/* Header with logo and close button */}
//                 <div className="flex h-16 items-center justify-between p-4 border-b border-gray-200 relative">
//                     <Link
//                         href={"/"}
//                         className="flex items-center gap-2 flex-1 pr-10"
//                     >
//                         <img
//                             src="logo/logo.png"
//                             alt="Logo"
//                             className="h-12 w-[5rem] rounded-lg object-contain"
//                         />
//                     </Link>

//                     <button
//                         onClick={onMobileToggle}
//                         className="lg:hidden p-1 rounded-md hover:bg-gray-200 transition-colors text-gray-600 hover:text-gray-900"
//                         aria-label="Close sidebar"
//                     >
//                         <X className="w-5 h-5" />
//                     </button>
//                 </div>

//                 <div className="p-4 h-[calc(100%-4rem)] flex flex-col overflow-y-auto">
//                     <div className="flex-1 space-y-2">
//                         {/* Dashboard */}
//                         <div className="relative group">
//                             <Link
//                                 href="/dashboard"
//                                 className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 hover:scale-[1.02] ${
//                                     activeItem === "Dashboard"
//                                         ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 shadow-lg shadow-blue-500/25"
//                                         : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
//                                 }`}
//                             >
//                                 <Home
//                                     size={20}
//                                     className={`flex-shrink-0 ${
//                                         activeItem === "Dashboard"
//                                             ? "text-blue-400"
//                                             : ""
//                                     }`}
//                                 />
//                                 <span className="font-medium flex-1 text-left">
//                                     Dashboard
//                                 </span>
//                             </Link>
//                         </div>

//                         {/* Home */}
//                         <div className="relative group">
//                             <Link
//                                 href="/home"
//                                 className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 hover:scale-[1.02] ${
//                                     activeItem === "Home"
//                                         ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 shadow-lg shadow-blue-500/25"
//                                         : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
//                                 }`}
//                             >
//                                 <Home
//                                     size={20}
//                                     className={`flex-shrink-0 ${
//                                         activeItem === "Home"
//                                             ? "text-blue-400"
//                                             : ""
//                                     }`}
//                                 />
//                                 <span className="font-medium flex-1 text-left">
//                                     Home
//                                 </span>
//                             </Link>
//                         </div>

//                         {/* Users */}
//                         <div className="relative group">
//                             <Link
//                                 href="/user-management"
//                                 className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 hover:scale-[1.02] ${
//                                     activeItem === "Users"
//                                         ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 shadow-lg shadow-blue-500/25"
//                                         : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
//                                 }`}
//                             >
//                                 <Users
//                                     size={20}
//                                     className={`flex-shrink-0 ${
//                                         activeItem === "Users"
//                                             ? "text-blue-400"
//                                             : ""
//                                     }`}
//                                 />
//                                 <span className="font-medium flex-1 text-left">
//                                     Users
//                                 </span>
//                             </Link>
//                         </div>

//                         {/* Testimonials */}
//                         <div className="relative group">
//                             <Link
//                                 href="/testimonials"
//                                 className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 hover:scale-[1.02] ${
//                                     activeItem === "Testimonials"
//                                         ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 shadow-lg shadow-blue-500/25"
//                                         : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
//                                 }`}
//                             >
//                                 <MessageSquareQuote
//                                     size={20}
//                                     className={`flex-shrink-0 ${
//                                         activeItem === "Testimonials"
//                                             ? "text-blue-400"
//                                             : ""
//                                     }`}
//                                 />
//                                 <span className="font-medium flex-1 text-left">
//                                     Testimonials
//                                 </span>
//                             </Link>
//                         </div>

//                         {/* Order Products */}
//                         <div className="relative group">
//                             <Link
//                                 href="/order-products"
//                                 className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 hover:scale-[1.02] ${
//                                     activeItem === "Order Products"
//                                         ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 shadow-lg shadow-blue-500/25"
//                                         : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
//                                 }`}
//                             >
//                                 <ShoppingCart
//                                     size={20}
//                                     className={`flex-shrink-0 ${
//                                         activeItem === "Order Products"
//                                             ? "text-blue-400"
//                                             : ""
//                                     }`}
//                                 />
//                                 <span className="font-medium flex-1 text-left">
//                                     Orders
//                                 </span>
//                             </Link>
//                         </div>

//                         {/* Activity Logs */}
//                         <div className="relative group">
//                             <Link
//                                 href="/activity-log"
//                                 className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 hover:scale-[1.02] ${
//                                     activeItem === "Activity Logs"
//                                         ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 shadow-lg shadow-blue-500/25"
//                                         : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
//                                 }`}
//                             >
//                                 <Activity
//                                     size={20}
//                                     className={`flex-shrink-0 ${
//                                         activeItem === "Activity Logs"
//                                             ? "text-blue-400"
//                                             : ""
//                                     }`}
//                                 />
//                                 <span className="font-medium flex-1 text-left">
//                                     Activity Logs
//                                 </span>
//                             </Link>
//                         </div>

//                         {/* Messages */}
//                         <div className="relative group">
//                             <Link
//                                 href="/messages"
//                                 className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 hover:scale-[1.02] ${
//                                     activeItem === "Messages"
//                                         ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 shadow-lg shadow-blue-500/25"
//                                         : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
//                                 }`}
//                             >
//                                 <MessageSquareQuote
//                                     size={20}
//                                     className={`flex-shrink-0 ${
//                                         activeItem === "Messages"
//                                             ? "text-blue-400"
//                                             : ""
//                                     }`}
//                                 />
//                                 <span className="font-medium flex-1 text-left">
//                                     Messages
//                                 </span>
//                             </Link>
//                         </div>

//                         {/* Category */}
//                         <div className="relative group">
//                             <Link
//                                 href="/categories"
//                                 className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 hover:scale-[1.02] ${
//                                     activeItem === "Category"
//                                         ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 shadow-lg shadow-blue-500/25"
//                                         : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
//                                 }`}
//                             >
//                                 <FolderTree
//                                     size={20}
//                                     className={`flex-shrink-0 ${
//                                         activeItem === "Category"
//                                             ? "text-blue-400"
//                                             : ""
//                                     }`}
//                                 />
//                                 <span className="font-medium flex-1 text-left">
//                                     Category
//                                 </span>
//                             </Link>
//                         </div>

//                         {/* Sub Category */}
//                         <div className="relative group">
//                             <Link
//                                 href="/sub_category"
//                                 className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 hover:scale-[1.02] ${
//                                     activeItem === "Sub Category"
//                                         ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 shadow-lg shadow-blue-500/25"
//                                         : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
//                                 }`}
//                             >
//                                 <Layers
//                                     size={20}
//                                     className={`flex-shrink-0 ${
//                                         activeItem === "Sub Category"
//                                             ? "text-blue-400"
//                                             : ""
//                                     }`}
//                                 />
//                                 <span className="font-medium flex-1 text-left">
//                                     Sub Category
//                                 </span>
//                             </Link>
//                         </div>

//                         {/* Products */}
//                         <div className="relative group">
//                             <Link
//                                 href="/products"
//                                 className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 hover:scale-[1.02] ${
//                                     activeItem === "Products"
//                                         ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 shadow-lg shadow-blue-500/25"
//                                         : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
//                                 }`}
//                             >
//                                 <Package
//                                     size={20}
//                                     className={`flex-shrink-0 ${
//                                         activeItem === "Products"
//                                             ? "text-blue-400"
//                                             : ""
//                                     }`}
//                                 />
//                                 <span className="font-medium flex-1 text-left">
//                                     Rooms
//                                 </span>
//                             </Link>
//                         </div>

//                         {/* Blog */}
//                         <div className="relative group">
//                             <Link
//                                 href="/blogs"
//                                 className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 hover:scale-[1.02] ${
//                                     activeItem === "Blog"
//                                         ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 shadow-lg shadow-blue-500/25"
//                                         : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
//                                 }`}
//                             >
//                                 <BookOpen
//                                     size={20}
//                                     className={`flex-shrink-0 ${
//                                         activeItem === "Blog"
//                                             ? "text-blue-400"
//                                             : ""
//                                     }`}
//                                 />
//                                 <span className="font-medium flex-1 text-left">
//                                     Blog
//                                 </span>
//                             </Link>
//                         </div>

//                         {/* Settings */}
//                         <div className="relative group">
//                             <Link
//                                 href="/admin-setting"
//                                 className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 hover:scale-[1.02] ${
//                                     activeItem === "Settings"
//                                         ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 shadow-lg shadow-blue-500/25"
//                                         : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
//                                 }`}
//                             >
//                                 <Settings
//                                     size={20}
//                                     className={`flex-shrink-0 ${
//                                         activeItem === "Settings"
//                                             ? "text-blue-400"
//                                             : ""
//                                     }`}
//                                 />
//                                 <span className="font-medium flex-1 text-left">
//                                     Settings
//                                 </span>
//                             </Link>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AdminSideBar;

import React from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    Home,
    Users,
    FolderTree,
    Package,
    BookOpen,
    Settings,
    X,
    ChevronLeft,
    ChevronRight,
    Menu,
    Building,
} from "lucide-react";

const AdminSideBar = ({
    isMobileOpen,
    onMobileToggle,
    user,
    isCollapsed,
    onToggleCollapse,
}) => {
    const { url } = usePage();
    const currentPath = url.split("/")[1] || "dashboard";

    const isActive = (href) => {
        const path = href.replace("/", "");
        return currentPath === path;
    };

    return (
        <>
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={onMobileToggle}
                />
            )}

            <div
                className={`
                    fixed left-0 top-0 h-screen bg-white border-r border-gray-200 z-50 transition-all duration-300
                    ${isCollapsed ? "w-16" : "w-64"}
                    ${
                        isMobileOpen
                            ? "translate-x-0"
                            : "-translate-x-full lg:translate-x-0"
                    }
                `}
            >
                {/* Header */}
                <div
                    className={`flex items-center justify-between p-4 border-b h-16 ${
                        isCollapsed ? "px-3" : ""
                    }`}
                >
                    {!isCollapsed && (
                        <div className="text-lg font-bold text-gray-800 whitespace-nowrap">
                            Rental System
                        </div>
                    )}
                    <div className="flex items-center space-x-1">
                        {/* Collapse Toggle Button - Only show on desktop */}
                        <button
                            onClick={onToggleCollapse}
                            className="hidden lg:flex p-1.5 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                            title={
                                isCollapsed
                                    ? "Expand sidebar"
                                    : "Collapse sidebar"
                            }
                        >
                            {isCollapsed ? (
                                <Menu className="w-4 h-4 text-gray-600" />
                            ) : (
                                <Menu className="w-4 h-4 text-gray-600" />
                            )}
                        </button>

                        {/* Mobile Close Button */}
                        <button
                            onClick={onMobileToggle}
                            className="lg:hidden p-1.5 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Menu Items */}
                <div
                    className={`p-2 space-y-1 ${isCollapsed ? "px-2" : "px-3"}`}
                >
                    {/* Dashboard */}
                    <Link
                        href="/dashboard"
                        className={`
                            flex items-center rounded-lg transition-colors duration-200 group relative
                            ${isCollapsed ? "p-3 justify-center" : "p-3"}
                            ${
                                isActive("/dashboard")
                                    ? "bg-blue-50 text-blue-600 border border-blue-200"
                                    : "text-gray-600 hover:bg-gray-50"
                            }
                        `}
                        title={isCollapsed ? "Dashboard" : ""}
                    >
                        <Home
                            className={`
                            ${isCollapsed ? "w-5 h-5" : "w-5 h-5"}
                            ${
                                isActive("/dashboard")
                                    ? "text-blue-600"
                                    : "text-gray-500 group-hover:text-gray-700"
                            }
                        `}
                        />
                        {!isCollapsed && (
                            <span className="ml-3 font-medium whitespace-nowrap">
                                Dashboard
                            </span>
                        )}
                        {isCollapsed && (
                            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                                Dashboard
                            </div>
                        )}
                    </Link>

                    {/* Users */}
                    <Link
                        href="/user-management"
                        className={`
                            flex items-center rounded-lg transition-colors duration-200 group relative
                            ${isCollapsed ? "p-3 justify-center" : "p-3"}
                            ${
                                isActive("/user-management")
                                    ? "bg-blue-50 text-blue-600 border border-blue-200"
                                    : "text-gray-600 hover:bg-gray-50"
                            }
                        `}
                        title={isCollapsed ? "User Management" : ""}
                    >
                        <Users
                            className={`
                            ${isCollapsed ? "w-5 h-5" : "w-5 h-5"}
                            ${
                                isActive("/user-management")
                                    ? "text-blue-600"
                                    : "text-gray-500 group-hover:text-gray-700"
                            }
                        `}
                        />
                        {!isCollapsed && (
                            <span className="ml-3 font-medium whitespace-nowrap">
                                User Management
                            </span>
                        )}
                        {isCollapsed && (
                            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                                User Management
                            </div>
                        )}
                    </Link>

                    {/* Products */}
                    <Link
                        href="/property"
                        className={`
                            flex items-center rounded-lg transition-colors duration-200 group relative
                            ${isCollapsed ? "p-3 justify-center" : "p-3"}
                            ${
                                isActive("/property")
                                    ? "bg-blue-50 text-blue-600 border border-blue-200"
                                    : "text-gray-600 hover:bg-gray-50"
                            }
                        `}
                        title={isCollapsed ? "Property" : ""}
                    >
                        <Building
                            className={`
                            ${isCollapsed ? "w-5 h-5" : "w-5 h-5"}
                            ${
                                isActive("/property")
                                    ? "text-blue-600"
                                    : "text-gray-500 group-hover:text-gray-700"
                            }
                        `}
                        />
                        {!isCollapsed && (
                            <span className="ml-3 font-medium whitespace-nowrap">
                                Property
                            </span>
                        )}
                        {isCollapsed && (
                            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                                Property
                            </div>
                        )}
                    </Link>

                    {/* Blogs */}
                    <Link
                        href="/activity-log"
                        className={`
                            flex items-center rounded-lg transition-colors duration-200 group relative
                            ${isCollapsed ? "p-3 justify-center" : "p-3"}
                            ${
                                isActive("/activity-log")
                                    ? "bg-blue-50 text-blue-600 border border-blue-200"
                                    : "text-gray-600 hover:bg-gray-50"
                            }
                        `}
                        title={isCollapsed ? "Activity Logs" : ""}
                    >
                        <BookOpen
                            className={`
                            ${isCollapsed ? "w-5 h-5" : "w-5 h-5"}
                            ${
                                isActive("/activity-log")
                                    ? "text-blue-600"
                                    : "text-gray-500 group-hover:text-gray-700"
                            }
                        `}
                        />
                        {!isCollapsed && (
                            <span className="ml-3 font-medium whitespace-nowrap">
                                Activity Logs
                            </span>
                        )}
                        {isCollapsed && (
                            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                                Activity Logs
                            </div>
                        )}
                    </Link>

                    {/* Settings */}
                    <Link
                        href="/settings"
                        className={`
                            flex items-center rounded-lg transition-colors duration-200 group relative
                            ${isCollapsed ? "p-3 justify-center" : "p-3"}
                            ${
                                isActive("/settings")
                                    ? "bg-blue-50 text-blue-600 border border-blue-200"
                                    : "text-gray-600 hover:bg-gray-50"
                            }
                        `}
                        title={isCollapsed ? "Settings" : ""}
                    >
                        <Settings
                            className={`
                            ${isCollapsed ? "w-5 h-5" : "w-5 h-5"}
                            ${
                                isActive("/settings")
                                    ? "text-blue-600"
                                    : "text-gray-500 group-hover:text-gray-700"
                            }
                        `}
                        />
                        {!isCollapsed && (
                            <span className="ml-3 font-medium whitespace-nowrap">
                                Settings
                            </span>
                        )}
                        {isCollapsed && (
                            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                                Settings
                            </div>
                        )}
                    </Link>
                </div>
            </div>
        </>
    );
};

export default AdminSideBar;
