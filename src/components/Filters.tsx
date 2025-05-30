import { filtros } from "../data/filtros";
import { useFilters } from "../context/useFilters";
import { useState, useRef, useEffect } from "react";

export const Filters = () => {
    const { filter, setFilter } = useFilters();
    // State for mobile dropdown
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleFilterSelect = (nombre: string) => {
        setFilter(nombre);
        setIsOpen(false);
    };

    // Close dropdown when clicking outside on mobile and on resize
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        const handleResize = () => {
            if (window.innerWidth < 640) { // Apply only on screens smaller than 'sm'
                document.addEventListener("mousedown", handleClickOutside);
            } else {
                document.removeEventListener("mousedown", handleClickOutside);
                setIsOpen(false); // Close dropdown if resized to desktop
            }
        };

        window.addEventListener("resize", handleResize);
        // Initial check
        handleResize();

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener("resize", handleResize);
        };
    }, [dropdownRef]);

    return (
        <div className="bg-[#140617] p-8 py-10 rounded-xl">
            <h2 className="text-xl text-red-500 mb-4 font-medium">
                Pokémon Types
            </h2>

            {/* Mobile Dropdown (visible only on small screens) */}
            <div className="relative sm:hidden" ref={dropdownRef}>
                <button
                    onClick={toggleDropdown}
                    className="w-full px-4 py-2 bg-[#260a2d] text-gray-300 rounded-md font-bold text-left flex justify-between items-center border border-[#922a92]/50 hover:bg-[#3a1c4d] transition-colors"
                >
                    {filter}
                    <svg
                        className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                        ></path>
                    </svg>
                </button>

                {isOpen && (
                    <div className="absolute z-10 mt-2 w-full rounded-md shadow-lg bg-[#1a071f] ring-1 ring-black ring-opacity-5 overflow-y-auto max-h-60 border border-[#922a92]/50 p-1">
                        <div
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="options-menu"
                        >
                            {filtros.map((item) => {
                                const isSelected = filter === item.nombre;
                                // Apply a consistent style for dropdown items, highlighting selected and hover states
                                const itemClasses = `px-4 py-2 rounded-md font-bold cursor-pointer transition duration-200 w-full text-left ${isSelected ? 'bg-[#3a1c4d] text-white' : 'text-gray-300 hover:bg-[#260a2d]'}`;

                                return (
                                    <div
                                        key={item.nombre}
                                        onClick={() => handleFilterSelect(item.nombre)}
                                        className={itemClasses}
                                        role="menuitem"
                                    >
                                        {item.nombre}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* Desktop Grid (visible on sm and larger screens) */}
            <div className="hidden sm:grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {filtros.map((item) => {
                    const isSelected = filter === item.nombre;
                    // Use original classes for desktop grid items
                    const classes = `${isSelected ? item.active : item.base} ${item.hover} text-gray-400 px-4 py-2 rounded-md font-bold cursor-pointer transition duration-200 text-center`;

                    return (
                        <div
                            key={item.nombre}
                            className={classes}
                            onClick={() => setFilter(item.nombre)}
                        >
                            {item.nombre}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
