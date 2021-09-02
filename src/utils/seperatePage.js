export const SiparatePage = (items, pageSize, pageNumber) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
};

