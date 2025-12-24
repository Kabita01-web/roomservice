import { usePage } from "@inertiajs/react";
import {
    Home,
    Menu,
    X,
    ChevronDown,
    LogIn,
    UserPlus,
    LogOut,
    Settings,
    HelpCircle,
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { Link, router } from "@inertiajs/react";

function NavBar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const userDropdownRef = useRef(null);

    const { auth } = usePage().props;
    const user = auth?.user;
    const isLoggedIn = !!user;

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsDropdownOpen(false);
            }
            if (
                userDropdownRef.current &&
                !userDropdownRef.current.contains(event.target)
            ) {
                setIsUserDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const toggleUserDropdown = () => setIsUserDropdownOpen(!isUserDropdownOpen);

    const handleLogout = async () => {
        try {
            await router.post(route('logout'));
            // Inertia will handle the redirect automatically
        } catch (error) {
            console.error("Logout error:", error);
            router.visit('/login');
        }
    };

    const handleUserAction = (action, href) => {
        setIsUserDropdownOpen(false);
        setIsMobileMenuOpen(false);

        if (action === "logout") {
            handleLogout();
            return;
        }

        if (href) {
            router.visit(href);
        }
    };

    // Get dashboard route based on user role
    const getDashboardRoute = () => {
        if (!user) return "/dashboard";
        
        switch (user.role) {
            case "super_admin":
                return "/dashboard";
            case "admin":
                return "/admin-dashboard";
            case "customer":
                return "/customer-dashboard";
            default:
                return "/dashboard";
        }
    };

    // Get settings route based on user role
    const getSettingsRoute = () => {
        if (!user) return "/settings";
        
        switch (user.role) {
            case "super_admin":
            case "admin":
                return "/admin-setting";
            case "customer":
                return "/customer-setting";
            default:
                return "/settings";
        }
    };

    const userDropdownItems = [
        {
            name: "Dashboard",
            icon: Home,
            href: getDashboardRoute(),
            action: "dashboard",
        },
        {
            name: "Settings",
            icon: Settings,
            href: getSettingsRoute(),
            action: "settings",
        },
        {
            name: "Help & Support",
            icon: HelpCircle,
            href: "/help-support",
            action: "help",
        },
        {
            name: "Logout",
            icon: LogOut,
            action: "logout",
            danger: true,
        },
    ];

    const navLinkClass = (base = "") =>
        `${base} flex items-center gap-2 hover:opacity-80 transition-all duration-300 text-base xl:text-lg font-medium ${
            isScrolled ? "text-gray-900" : "text-white"
        }`;

    return (
        <header className="fixed top-0 left-0 w-full z-50">
            {/* Navbar container */}
            <div
                className={`flex items-center justify-between backdrop-blur-md px-4 sm:px-6 lg:px-8 py-3 sm:py-4 shadow-2xl transition-all duration-300 ${
                    isScrolled
                        ? "py-3 bg-white/60 backdrop-blur-2xl shadow-2xl shadow-gray-900/10 border-b border-gray-200/50"
                        : "py-6 bg-black/40 backdrop-blur-md"
                }`}
            >
                {/* Logo / Brand */}
                <div className="flex items-center gap-2">
                    <Link href="/">
                        <img
                            src="/logo1.jpeg"
                            alt="GharBhada Logo"
                            className={` w-full h-14 transition-all duration-300 ${
                                isScrolled
                                    ? "brightness-100"
                                    : "brightness-0 invert"
                            }`}
                        />
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
                    <Link href="/" className={navLinkClass()}>
                        Home
                    </Link>

                    {/* Dropdown Menu */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className={navLinkClass()}
                        >
                            Listing
                            <ChevronDown
                                className={`w-4 h-4 transition-transform duration-200 ${
                                    isDropdownOpen ? "rotate-180" : ""
                                }`}
                            />
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50">
                                <Link
                                    href="/listings/apartments"
                                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                    onClick={() => setIsDropdownOpen(false)}
                                >
                                    Apartments
                                </Link>
                                <Link
                                    href="/listings/houses"
                                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                    onClick={() => setIsDropdownOpen(false)}
                                >
                                    Houses
                                </Link>
                                <Link
                                    href="/listings/rooms"
                                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                    onClick={() => setIsDropdownOpen(false)}
                                >
                                    Rooms
                                </Link>
                                <Link
                                    href="/listings/commercial"
                                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                    onClick={() => setIsDropdownOpen(false)}
                                >
                                    Commercial
                                </Link>
                            </div>
                        )}
                    </div>

                    <Link href="/rooms" className={navLinkClass()}>
                        Room
                    </Link>

                    <Link href="/contact" className={navLinkClass()}>
                        Contact
                    </Link>
                    <Link href="/about" className={navLinkClass()}>
                        About
                    </Link>
                </nav>

                {/* Desktop Buttons - Updated with Auth Logic */}
                <div className="hidden md:flex items-center gap-3">
                    {isLoggedIn ? (
                        /* User Dropdown - Logged In */
                        <div className="relative" ref={userDropdownRef}>
                            <button
                                onClick={toggleUserDropdown}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                                    isScrolled
                                        ? "text-gray-900 hover:bg-gray-100"
                                        : "text-white hover:bg-white/10"
                                }`}
                            >
                                <img
                                    src={user?.image}
                                    alt={user?.name || "User"}
                                    className="w-8 h-8 rounded-full object-cover border-2 border-white/50"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "/user/user01.png";
                                    }}
                                />
                                <span className="font-medium">
                                    {user?.name || "User"}
                                </span>
                                <ChevronDown
                                    className={`w-4 h-4 transition-transform duration-200 ${
                                        isUserDropdownOpen ? "rotate-180" : ""
                                    }`}
                                />
                            </button>

                            {/* User Dropdown Menu */}
                            {isUserDropdownOpen && (
                                <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50">
                                    {/* User Info */}
                                    <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                                        <p className="font-semibold text-gray-900 truncate">
                                            {user?.name}
                                        </p>
                                        <p className="text-sm text-gray-600 truncate">
                                            {user?.email}
                                        </p>
                                        <p className="text-xs text-gray-500 capitalize mt-1">
                                            {user?.role?.replace("_", " ") ||
                                                "User"}
                                        </p>
                                    </div>

                                    {/* Dropdown Items */}
                                    <div className="py-1">
                                        {userDropdownItems.map(
                                            (item, index) => {
                                                const Icon = item.icon;
                                                return item.href ? (
                                                    <Link
                                                        key={index}
                                                        href={item.href}
                                                        onClick={() =>
                                                            setIsUserDropdownOpen(false)
                                                        }
                                                        className={`flex items-center gap-3 w-full px-4 py-3 text-left transition-colors ${
                                                            item.danger
                                                                ? "text-red-600 hover:bg-red-50"
                                                                : "text-gray-700 hover:bg-gray-50"
                                                        }`}
                                                    >
                                                        <Icon className="w-4 h-4" />
                                                        <span className="text-sm font-medium">
                                                            {item.name}
                                                        </span>
                                                    </Link>
                                                ) : (
                                                    <button
                                                        key={index}
                                                        onClick={() =>
                                                            handleUserAction(
                                                                item.action,
                                                                item.href
                                                            )
                                                        }
                                                        className={`flex items-center gap-3 w-full px-4 py-3 text-left transition-colors ${
                                                            item.danger
                                                                ? "text-red-600 hover:bg-red-50"
                                                                : "text-gray-700 hover:bg-gray-50"
                                                        }`}
                                                    >
                                                        <Icon className="w-4 h-4" />
                                                        <span className="text-sm font-medium">
                                                            {item.name}
                                                        </span>
                                                    </button>
                                                );
                                            }
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        /* Sign In / Sign Up Buttons - Logged Out */
                        <>
                            <Link
                                href={route("login")}
                                className={`flex items-center gap-2 px-5 py-2 hover:opacity-70 transition-all duration-300 text-sm font-medium ${
                                    isScrolled ? "text-gray-900" : "text-white"
                                }`}
                            >
                                <LogIn className="w-4 h-4" />
                                Login
                            </Link>
                            <Link
                                href={route("register")}
                                className={`flex items-center gap-2 px-5 py-2 rounded-md hover:opacity-90 transition-all duration-300 text-sm font-medium ${
                                    isScrolled
                                        ? "bg-gray-900 text-white"
                                        : "bg-white text-gray-900"
                                }`}
                            >
                                <UserPlus className="w-4 h-4" />
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMobileMenu}
                    className={`md:hidden p-2 transition-colors duration-300 ${
                        isScrolled ? "text-gray-900" : "text-white"
                    }`}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? (
                        <X className="w-6 h-6" />
                    ) : (
                        <Menu className="w-6 h-6" />
                    )}
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            <div
                className={`md:hidden backdrop-blur-md border-x border-b transition-all duration-500 ease-in-out overflow-hidden ${
                    isMobileMenuOpen
                        ? "max-h-[500px] opacity-100"
                        : "max-h-0 opacity-0"
                } ${
                    isScrolled
                        ? "bg-white border-gray-200"
                        : "bg-white/10 border-white/20"
                }`}
            >
                <nav className="flex flex-col px-4 py-4 space-y-4">
                    <Link
                        href="/"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`py-2 hover:opacity-80 transition-all duration-300 text-base font-medium ${
                            isScrolled ? "text-gray-900" : "text-white"
                        }`}
                    >
                        Home
                    </Link>

                    <div className="flex flex-col space-y-2">
                        <span className={`py-2 text-base font-medium ${
                            isScrolled ? "text-gray-900" : "text-white"
                        }`}>
                            Listings
                        </span>
                        <Link
                            href="/listings/apartments"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`py-2 pl-4 hover:opacity-80 transition-all duration-300 text-base font-medium ${
                                isScrolled ? "text-gray-600" : "text-gray-300"
                            }`}
                        >
                            Apartments
                        </Link>
                        <Link
                            href="/listings/houses"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`py-2 pl-4 hover:opacity-80 transition-all duration-300 text-base font-medium ${
                                isScrolled ? "text-gray-600" : "text-gray-300"
                            }`}
                        >
                            Houses
                        </Link>
                        <Link
                            href="/listings/rooms"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`py-2 pl-4 hover:opacity-80 transition-all duration-300 text-base font-medium ${
                                isScrolled ? "text-gray-600" : "text-gray-300"
                            }`}
                        >
                            Rooms
                        </Link>
                        <Link
                            href="/listings/commercial"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`py-2 pl-4 hover:opacity-80 transition-all duration-300 text-base font-medium ${
                                isScrolled ? "text-gray-600" : "text-gray-300"
                            }`}
                        >
                            Commercial
                        </Link>
                    </div>

                    <Link
                        href="/rooms"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`py-2 hover:opacity-80 transition-all duration-300 text-base font-medium ${
                            isScrolled ? "text-gray-900" : "text-white"
                        }`}
                    >
                        Room
                    </Link>

                    <Link
                        href="/contact"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`py-2 hover:opacity-80 transition-all duration-300 text-base font-medium ${
                            isScrolled ? "text-gray-900" : "text-white"
                        }`}
                    >
                        Contact
                    </Link>

                    <Link
                        href="/about"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`py-2 hover:opacity-80 transition-all duration-300 text-base font-medium ${
                            isScrolled ? "text-gray-900" : "text-white"
                        }`}
                    >
                        About
                    </Link>

                    {/* Mobile Auth Section */}
                    <div className="flex flex-col gap-3 pt-4 border-t border-gray-300/20">
                        {isLoggedIn ? (
                            /* Mobile User Menu - Logged In */
                            <>
                                <div className="px-4 py-2 border-b border-gray-300/20">
                                    <p
                                        className={`font-semibold ${
                                            isScrolled
                                                ? "text-gray-900"
                                                : "text-white"
                                        }`}
                                    >
                                        {user?.name}
                                    </p>
                                    <p
                                        className={`text-sm ${
                                            isScrolled
                                                ? "text-gray-600"
                                                : "text-gray-300"
                                        }`}
                                    >
                                        {user?.email}
                                    </p>
                                </div>

                                {userDropdownItems.map((item, index) => {
                                    const Icon = item.icon;
                                    return item.href ? (
                                        <Link
                                            key={index}
                                            href={item.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={`flex items-center gap-3 w-full px-4 py-2 text-left transition-all duration-300 text-base font-medium ${
                                                isScrolled
                                                    ? "text-gray-900 hover:opacity-80"
                                                    : "text-white hover:opacity-80"
                                            }`}
                                        >
                                            <Icon className="w-4 h-4" />
                                            {item.name}
                                        </Link>
                                    ) : (
                                        <button
                                            key={index}
                                            onClick={() =>
                                                handleUserAction(
                                                    item.action,
                                                    item.href
                                                )
                                            }
                                            className={`flex items-center gap-3 w-full px-4 py-2 text-left transition-all duration-300 text-base font-medium ${
                                                item.danger
                                                    ? "text-red-600 hover:opacity-80"
                                                    : isScrolled
                                                    ? "text-gray-900 hover:opacity-80"
                                                    : "text-white hover:opacity-80"
                                            }`}
                                        >
                                            <Icon className="w-4 h-4" />
                                            {item.name}
                                        </button>
                                    );
                                })}
                            </>
                        ) : (
                            /* Mobile Sign In / Sign Up - Logged Out */
                            <>
                                <Link
                                    href={route("login")}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`flex items-center gap-2 w-full px-4 py-2 hover:opacity-80 transition-all duration-300 text-base font-medium text-left ${
                                        isScrolled
                                            ? "text-gray-900"
                                            : "text-white"
                                    }`}
                                >
                                    <LogIn className="w-4 h-4" />
                                    Login
                                </Link>
                                <Link
                                    href={route("register")}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`flex items-center gap-2 w-full px-4 py-2 rounded-lg hover:opacity-90 transition-all duration-300 text-base font-medium shadow-lg ${
                                        isScrolled
                                            ? "bg-gray-900 text-white"
                                            : "bg-white text-gray-900"
                                    }`}
                                >
                                    <UserPlus className="w-4 h-4" />
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default NavBar;