const getInfo = ({ total, lastPage, page, endpoint, queryParams = "" }) => {
  return {
    count: total,
    pages: lastPage,
    currentPage: page,
    next:
      page + 1 > lastPage
        ? null
        : `${process.env.BASE_URL}/${endpoint}?page=${
            page + 1
          }${queryParams}`,
    prev:
      page - 1 <= 0
        ? null
        : `${process.env.BASE_URL}/${endpoint}?page=${
            page > lastPage ? lastPage - 1 : page - 1
          }${queryParams}`,
  };
};

module.exports = { getInfo };
