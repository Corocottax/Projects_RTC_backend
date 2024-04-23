const getAverage = (oldProject, vote) => {
  const arrayVotes = oldProject.rating.map((rating) => rating.vote);
  if (vote) {
    arrayVotes.push(vote);
  }

  return arrayVotes.reduce((a, b) => a + b, 0) / arrayVotes.length;
};

module.exports = { getAverage }
