module.exports = (sequelize, Sequelize) => {
  const Video = sequelize.define("video", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN
    }
  });

  return Video;
};
