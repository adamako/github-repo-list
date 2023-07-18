export const getTotalPage = (linkHeader: string) => {
  if (linkHeader) {
    const parts = linkHeader?.split(",");
    const lastPart = parts[parts.length - 1];
    const url = lastPart.split(";")[0].slice(2, -1);
    const lastPage = new URL(url).searchParams.get("page") ?? "1";

    return parseInt(lastPage);
  }
  return 1;
};
