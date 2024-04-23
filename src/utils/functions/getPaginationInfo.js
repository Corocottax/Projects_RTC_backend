const { dataPerPage } = require("../variables/pagination");

const getPaginationInfo = async (Model) => {
  const total = await Model.countDocuments();
  const lastPage = Math.floor(total / dataPerPage) + 1;

  return {
    total,
    lastPage,
  };
};

module.exports = { getPaginationInfo };
