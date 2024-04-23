const getInfo = ({ total, lastPage, page, endpoint, queryParams = "" }) => {
  return {
    count: total,
    pages: lastPage,
    next:
      page + 1 > lastPage
        ? null
        : `http://localhost:3000/api/v1/${endpoint}?page=${
            page + 1
          }${queryParams}`,
    prev:
      page - 1 <= 0
        ? null
        : `http://localhost:3000/api/v1/${endpoint}?page=${
            page > lastPage ? lastPage - 1 : page - 1
          }${queryParams}`,
  };
};

module.exports = { getInfo };
