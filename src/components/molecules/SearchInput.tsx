import { SearchIcon } from "../atoms";
import { ChangeEvent } from "react";

type SearchBarProps = {
  inputValue: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const SearchInput = ({ handleChange, inputValue }: SearchBarProps) => {
  return (
    <div className="mt-2 w-full px-2 flex flex-col justify-center items-center">
      <div className="relative w-full w-[490px]">
        <input
          value={inputValue}
          onChange={handleChange}
          className="rounded font-normal rounded-[10px] text-sm border-none py-3 px-5  bg-[#F3F3F3] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent w-full"
          type="search"
          placeholder="username, e.g. 'adamako'"
        />

        <div className="absolute inset-y-0 right-5 flex items-center">
          <SearchIcon />
        </div>
      </div>
    </div>
  );
};
