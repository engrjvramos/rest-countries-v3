import { AiOutlineSearch } from "react-icons/ai";

interface SearchProps {
  searchTerm: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Search({ searchTerm, handleSearch }: SearchProps) {
  return (
    <div className="relative flex items-center rounded shadow overflow-hidden w-full md:w-[500px]">
      <AiOutlineSearch className="absolute top-[50%] left-6 -translate-y-1/2 text-darkGray text-lg" />
      <input
        type="text"
        value={searchTerm}
        placeholder="Search for a country..."
        onChange={handleSearch}
        className="border-none outline-none w-full bg-white py-3 pl-14 pr-6 placeholder:text-sm text-veryDarkBlue2 placeholder:font-normal dark:bg-darkBlue dark:text-white  "
      />
    </div>
  );
}
