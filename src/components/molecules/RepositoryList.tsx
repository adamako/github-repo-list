import { Repository } from "../../types";
import { RepositoryItem } from "./RepositoryItem";
import { Pagination } from "flowbite-react";

type RepositoryListProps = {
  repositories: Repository[] | undefined;
  handlePageChange: (newPage: number) => void;
  totalPage: number;
  currentPage: number;
};

export const RepositoryList = ({
  repositories,
  totalPage,
  handlePageChange,
  currentPage,
}: RepositoryListProps) => {
  if (!repositories?.length) {
    return <div className="text-center">No public repository found</div>;
  }

  return (
    <>
      {repositories.map((repo) => (
        <RepositoryItem key={repo.id} repo={repo} />
      ))}
      <div className="flex justify-center">
        {repositories && repositories.length > 0 && totalPage > 1 && (
          <Pagination
            currentPage={currentPage}
            onPageChange={handlePageChange}
            totalPages={totalPage}
          />
        )}
      </div>
    </>
  );
};
