import { Search } from "lucide-react";
import { useSearch } from "../context/useSearch";

export const NavBar = () => {
    const { search, setSearch} = useSearch()
    return (
        <div className="flex justify-between p-3 px-7 items-center fixed w-full bg-[#140617] z-10">
            <h1 className="text-3xl bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent font-bold">
                Pokédex
            </h1>
            <div className="flex flex-row justify-between px-3 items-center border  border-gray-600 rounded-2xl p-2 active:border-gray-500 ">
                <input
                    type="text"
                    placeholder="Search Pokemon..."
                    value={search}
                    className="px-2  outline-0 placeholder:text-gray-500"
                    onChange={(e)=>setSearch(e.target.value)}
                />
                <Search className="w-5 text-gray-600" />
            </div>
        </div>
    );
};
