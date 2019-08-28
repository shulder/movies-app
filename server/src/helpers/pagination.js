const getPageData = (array, page, limit) => {
  if (!page || !limit) {
    return array;
  }
  const offset = (page - 1) * limit;
  return array.slice(offset, offset + limit);
};

const getTotalNumberOfPages = (array, limit) => {
  if (!limit) {
    return 1;
  }
  const { length } = array;
  return limit >= length ? 1 : Math.ceil(length / limit);
};

module.exports = {
  getPageData,
  getTotalNumberOfPages,
};
