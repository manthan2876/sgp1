import { useParams } from "react-router-dom";
import { useNews } from "../../context/NewsContext";
import NewsCard from "./NewsCard";
import BackButton from "../../UI/BackButton";
import { useEffect } from "react";

const NewsDetailPage = () => {
  const { id } = useParams();
  const { newsData } = useNews();
  const newsItem = newsData.find((item) => item._id === id);
  console.log(newsItem);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!newsItem) {
    return <div>News item not found.</div>;
  }

  const {
    title,
    description,
    image,
    postal_circle,
  } = newsItem;

  return (
    <div className="relative p-4">
      <BackButton />
      <div className="container mx-auto py-16">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-full md:w-1/2">
            <img
              src={image}
              alt={title}
              className="rounded-lg object-cover w-full h-96"
            />
          </div>
          <div className="w-full md:w-1/2">
            <h1 className="text-3xl font-bold text-primary-dark dark:text-text-dark mb-3">
              {title}
            </h1>
            <div className="text-sm text-text-black dark:text-text-dark mb-2">
              <strong>Postal Circle: </strong>
              {postal_circle.name}
            </div>
            <p className="text-base text-text-black dark:text-text-dark mb-4">
              {description}
            </p>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-3xl font-semibold text-primary-dark dark:text-text-dark mb-4">
            Related Announcements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {newsData
              .filter((item) => item.id !== parseInt(id))
              .slice(0, 4)
              .map((relatedItem) => (
                <NewsCard key={relatedItem.id} {...relatedItem} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailPage;
