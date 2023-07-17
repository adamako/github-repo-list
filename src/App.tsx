import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { API_URL } from "./config";
import {
  Footer,
  Header,
  RepositoryList,
  SearchInput,
} from "./components/molecules";
import { Repository } from "./types";
import { Spinner } from "./components/atoms/Spinner";
import { Pagination } from "flowbite-react";

const LIMIT = 5;

function App() {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showIssue, setShowIssue] = useState(false);
  const [repositories, setRepositories] = useState<Repository[] | undefined>(
    undefined,
  );
  const [page, setPage] = useState(1);

  const fetchRepositories = async (username: string) => {
    setIsLoading(true);
    try {
      if (!username) {
        return;
      }
      const response = await fetch(
        `${API_URL}/users/${username}/repos?page=${page}&per_page=${LIMIT}`,
      );
      if (!response.ok) {
        setShowIssue(true);
        throw new Error("User not found");
      }
      const data = await response.json();
      if (data.length === 0) {
        setShowIssue(true);
        setRepositories(undefined);
        return;
      }
      setRepositories(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRepositories(inputValue);
  }, [page]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const normalizedValue = event.target.value.replace(/\s/g, "");
    setInputValue(normalizedValue);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetchRepositories(inputValue);
  };

  const handleFocus = () => {
    setShowIssue(false);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="container mx-auto px-20">
      <Header />
      <div className="w-full bg-white mt-10 p-10 rounded rounded-[10px] h-full">
        <h1 className="text-2xl text-center mb-5">Welcome</h1>
        <SearchInput
          inputValue={inputValue}
          handleChange={handleChange}
          handelSubmit={handleSubmit}
          handleFocus={handleFocus}
        />
        <div className="mt-5">
          {isLoading ? (
            <div className="flex justify-center items-center">
              <Spinner />
            </div>
          ) : showIssue ? (
            <div className="text-center text-lg font-semibold mt-5">
              No public repositories found
            </div>
          ) : (
            <>
              <RepositoryList repositories={repositories} />
              {repositories && repositories.length > 0 && (
                <Pagination
                  className="mt-5 flex justify-center"
                  showIcons={true}
                  currentPage={page}
                  onPageChange={handlePageChange}
                  totalPages={repositories?.length || 0}
                />
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
