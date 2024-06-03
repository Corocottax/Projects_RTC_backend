const getInfo = ({ total, lastPage, page, endpoint, queryParams = "" }) => {
  return {
    count: total,
    pages: lastPage,
    currentPage: page,
    next:
      page + 1 > lastPage
        ? null
        : `https://projects-rtc-backend.vercel.app/api/v1/${endpoint}?page=${
            page + 1
          }${queryParams}`,
    prev:
      page - 1 <= 0
        ? null
        : `https://projects-rtc-backend.vercel.app/api/v1/${endpoint}?page=${
            page > lastPage ? lastPage - 1 : page - 1
          }${queryParams}`,
  };
};

module.exports = { getInfo };
