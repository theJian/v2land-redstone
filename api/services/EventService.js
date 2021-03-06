module.exports = {

  findEvent: async (eventName) => {
    const event = await Event.findOne({
      or: [
        { id: parseInt(eventName) > -1 ? parseInt(eventName) : -1 },
        { name: eventName },
      ],
    })
      .populate('news', {
        where: { status: 'admitted' },
        sort: 'time DESC',
        limit: 15,
      })
      .populate('headerImage');

    if (event) {
      await NewsService.getContributionByList(event.news);
      event.newsCount = await News.count({
        where: {
          event: event.id,
          status: 'admitted',
        },
      });
    }

    return event;
  },

};
