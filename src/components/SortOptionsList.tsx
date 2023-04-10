import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { FiChevronDown } from "react-icons/fi";
import { AiOutlineCheck } from "react-icons/ai";
import SortOptions from "../enums/SortOptions";

const items = Object.values(SortOptions);

interface Props {
  sortOption: string;
  setSortOption: React.Dispatch<React.SetStateAction<string>>;
}

export default function SortOptionsList({ sortOption, setSortOption }: Props) {
  const handleSortOption = (value: string) => {
    setSortOption(value);
  };

  return (
    <div className="w-[180px]">
      <Listbox value={sortOption} onChange={handleSortOption}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-pointer rounded bg-white dark:bg-darkBlue text-veryDarkBlue2 dark:text-white py-3 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 text-sm  ">
            <span className="block truncate">{sortOption}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <FiChevronDown
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-darkBlue text-veryDarkBlue2 dark:text-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-40">
              {items.map((item, index) => (
                <Listbox.Option
                  key={`${item}${index}`}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 dark:text-white ${
                      active
                        ? "bg-amber-100 text-amber-900 dark:bg-amber-500"
                        : "text-veryDarkBlue2"
                    }`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-semibold" : "font-normal"
                        }`}
                      >
                        {item}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <AiOutlineCheck
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
