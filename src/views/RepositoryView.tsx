import { RepositoryList, SearchInput } from "../components/molecules";
import { Spinner } from "../components/atoms/Spinner";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Repository } from "../types";
import { API_URL } from "../config";
import { getTotalPage } from "../utils/getTotalPage";

const ITEMS_PER_PAGE = 5;

export const RepositoryView = () => {
  const inputRef = useRef<HTMLInputElement | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [repositories, setRepositories] = useState<Repository[] | undefined>(
    undefined,
  );
  const [linkHeader, setLinkHeader] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    if (currentPage === 1) setTotalPage(getTotalPage(linkHeader));
  }, [linkHeader]);

  useEffect(() => {
    fetchRepositories(inputRef?.current?.value!);
  }, [currentPage]);

  const fetchRepositories = async (username: string) => {
    setError("");
    setIsLoading(true);
    try {
      if (!username) {
        return;
      }
      const response = await fetch(
        `${API_URL}/users/${username}/repos?page=${currentPage}&per_page=${ITEMS_PER_PAGE}&sort=created&direction=desc`,
      );
      if (!response.ok) {
        setError("User not found");
        throw new Error("User not found");
      }
      const data = await response.json();
      const linkHeader = response.headers.get("Link");
      setLinkHeader(linkHeader ?? "");
      setRepositories(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetchRepositories(inputRef?.current?.value!);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="w-full bg-white mt-10 p-10 rounded rounded-[10px] h-full">
      <h1 className="text-2xl text-center mb-5">Welcome</h1>
      <SearchInput inputRef={inputRef} handelSubmit={handleSubmit} />
      <div className="mt-5">
        {isLoading ? (
          <Spinner className="flex justify-center items-center" />
        ) : error ? (
          <div className="text-center">User not found</div>
        ) : (
          inputRef.current?.value && (
            <RepositoryList
              repositories={repositories}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
              totalPage={totalPage}
            />
          )
        )}
      </div>
    </div>
  );
};
