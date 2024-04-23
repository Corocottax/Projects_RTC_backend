const { dataPerPage } = require("../variables/pagination");

const getPaginationInfo = async ({ Model, query }) => {
  const total = await Model.countDocuments(query);
  const lastPage = Math.floor(total / dataPerPage) + 1;

  return {
    total,
    lastPage,
  };
};

module.exports = { getPaginationInfo };
