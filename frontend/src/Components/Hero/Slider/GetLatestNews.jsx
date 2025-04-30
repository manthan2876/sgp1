import Events from "../../../assets/Events.gif"
const GetLatestNews = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={Events}
            alt="Latest News"
            className="md:w-full h-44 md:h-auto max-w-xs md:max-w-md rounded"
          />
        </div>

        <div className="text-center md:text-left">
          <h3 className="text-3xl font-bold text-primary-dark dark:text-primary-light mb-4">
            Get the Latest News & Event Updates
          </h3>
          <p className="text-text-light dark:text-text-dark text-lg mb-6">
            Stay informed with the latest news, updates, and events in our
            community. Don’t miss out on important announcements!
          </p>
          <button className="bg-accent-light dark:bg-accent-light text-white px-6 py-3 rounded-full hover:opacity-90 transition-colors">
            Explore Updates
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetLatestNews;
