import { Repository } from "../../types";
import { RepositoryItem } from "./RepositoryItem";

type RepositoryListProps = {
  repositories: Repository[] | undefined;
};

export const RepositoryList = ({ repositories }: RepositoryListProps) => {
  return repositories?.map((repo) => (
    <RepositoryItem key={repo.id} repo={repo} />
  ));
};
