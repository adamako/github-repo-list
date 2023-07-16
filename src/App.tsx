import { ChangeEvent, useState } from "react";
import { API_URL } from "./config";
import { Header, RepositoryList, SearchInput } from "./components/molecules";
import debounce from "./utils/debounce";
import { Repository } from "./types";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [repositories, setRepositories] = useState<Repository[]>([]);

  const fetchRepositories = async (username: string) => {
    try {
      if (!username) {
        setRepositories([]);
        return;
      }
      const response = await fetch(`${API_URL}/users/${username}/repos`);
      const data = await response.json();
      setRepositories(data);
    } catch (error) {
      console.log(error);
    }
  };

  const debouncedSearch = debounce(fetchRepositories, 1000);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    debouncedSearch(event.target.value);
  };

  return (
    <div className="container mx-auto px-20">
      <Header />
      <div className="w-full bg-white mt-10 p-10 rounded rounded-[10px] h-full">
        <h1 className="text-2xl">Welcome</h1>
        <SearchInput inputValue={inputValue} handleChange={handleChange} />
        <div className="mt-5">
          {repositories.length > 0 && (
            <h1 className="text-xl text-left">Repositories</h1>
          )}
          <div className="text-left mt-5 ">
            <RepositoryList repositories={repositories} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
