import { useNavigate } from "react-router-dom";
import NewsCard from "./NewsCard";
import { useNews } from "../../context/NewsContext";

const NewsList = () => {
  const navigate = useNavigate();
  const { newsData } = useNews();

  const handleViewAll = () => {
    navigate("/all-news");
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl text-center font-bold text-primary-dark dark:text-text-dark mb-10">
        News & Announcements
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {newsData.slice(0, 3).map((newsItem, index) => (
          <NewsCard key={index} {...newsItem} />
        ))}
      </div>
      {newsData.length > 3 && (
        <div className="mt-6 text-center">
          <button
            onClick={handleViewAll}
            className="bg-primary-dark text-white px-5 py-2 rounded-full hover:opacity-90 transition-colors"
          >
            View All
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsList;
