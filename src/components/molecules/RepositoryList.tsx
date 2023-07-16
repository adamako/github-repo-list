import { Repository } from "../../types";
import { RepositoryItem } from "./RepositoryItem";

type RepositoryListProps = {
  repositories: Repository[];
};

export const RepositoryList = ({ repositories }: RepositoryListProps) => {
  if (!repositories.length)
    return (
      <div className="text-center text-lg font-semibold mt-5">
        No repositories found
      </div>
    );

  return repositories.map((repo) => (
    <RepositoryItem key={repo.id} repo={repo} />
  ));
};
