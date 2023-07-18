import formatDate from "../../utils/formatDate";
import { Repository } from "../../types";

type RepositoryItemProps = {
  repo: Repository;
};

export const RepositoryItem = ({ repo }: RepositoryItemProps) => {
  return (
    <div key={repo.id} className="bg-gray-100 mb-3 rounded rounded-[10px] p-5">
      <h1 className="text-lg font-semibold">{repo.name}</h1>
      <a
        href={repo.html_url}
        target="_blank"
        className="text-blue-500 text-base underline"
      >
        {repo.html_url}
      </a>
      <div className="flex items-center flex-wrap font-thin text-sm mt-3">
        <a href={repo.owner.html_url}>
          <div className="flex items-center mr-5">
            <img
              className="w-7 h-7 rounded-full mr-3"
              src={repo.owner.avatar_url}
              alt="Rounded avatar"
            />
            <span>{repo.owner.login}</span>
          </div>
        </a>
        <span>Created at {formatDate(repo.created_at)}</span>
        {repo.language && (
          <span className="ml-5 text-[#963600] text-xs font-thin mr-2 px-2.5 py-0.5 rounded rounded-[4px] border border-[0.5px] border-[#963600]">
            {repo.language}
          </span>
        )}
      </div>
    </div>
  );
};
