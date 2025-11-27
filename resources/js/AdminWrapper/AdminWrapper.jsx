// import React, { useState, useEffect } from "react";
// import AdminNavBar from "./AdminNavBar";
// import AdminSideBar from "./AdminSideBar";
// import { usePage } from "@inertiajs/react";

// const AdminWrapper = ({ children }) => {
//     const [isMobileOpen, setIsMobileOpen] = useState(false);
//     const [isCollapsed, setIsCollapsed] = useState(false);
//     const { props } = usePage();
//     const user = props?.auth?.user || null;

//     const toggleMobile = () => setIsMobileOpen(!isMobileOpen);
//     const toggleCollapse = () => setIsCollapsed(!isCollapsed);

//     // Close mobile sidebar on resize
//     useEffect(() => {
//         const handleResize = () => {
//             if (window.innerWidth >= 1024) {
//                 setIsMobileOpen(false);
//             }
//         };

//         window.addEventListener("resize", handleResize);
//         return () => window.removeEventListener("resize", handleResize);
//     }, []);

//     return (
//         <div className="min-h-screen bg-gray-50">
//             <AdminNavBar onMenuToggle={toggleMobile} />
            
//             <AdminSideBar
//                 isCollapsed={isCollapsed}
//                 isMobileOpen={isMobileOpen}
//                 onMobileToggle={toggleMobile}
//                 user={user}
//             />

//             <main className={`
//                 pt-16 min-h-screen transition-all duration-300
//                 ${isCollapsed ? "lg:ml-16" : "lg:ml-64"}
//             `}>
//                 <div className="p-6">
//                     {children}
//                 </div>
//             </main>

//             {/* Toggle sidebar button for desktop */}
//             <button
//                 onClick={toggleCollapse}
//                 className="fixed bottom-4 left-4 z-40 p-2 bg-white border rounded-lg shadow-lg hidden lg:block"
//                 aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
//             >
//                 <div className={`w-4 h-4 border-t-2 border-l-2 border-gray-600 transform ${isCollapsed ? 'rotate-45' : '-rotate-135'}`} />
//             </button>
//         </div>
//     );
// };

// export default AdminWrapper;




import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import AdminSideBar from "./AdminSideBar";
import { usePage } from "@inertiajs/react";

const AdminWrapper = ({ children }) => {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { props } = usePage();
    const user = props?.auth?.user || null;

    const toggleMobile = () => setIsMobileOpen(!isMobileOpen);
    const toggleCollapse = () => setIsCollapsed(!isCollapsed);

    // Close mobile sidebar on resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsMobileOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <AdminNavBar onMenuToggle={toggleMobile} />

            <AdminSideBar
                isMobileOpen={isMobileOpen}
                onMobileToggle={toggleMobile}
                user={user}
                isCollapsed={isCollapsed}
                onToggleCollapse={toggleCollapse}
            />

            <main className={`pt-16 min-h-screen transition-all duration-300 ${
                isCollapsed ? 'lg:ml-16' : 'lg:ml-64'
            }`}>
                <div className="p-6">{children}</div>
            </main>
        </div>
    );
};

export default AdminWrapper;