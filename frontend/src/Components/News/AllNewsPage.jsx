import { useEffect, useState } from "react";
import NewsCard from "./NewsCard";
import { useNews } from "../../context/NewsContext";
import BackButton from "../../UI/BackButton";
import { FaPlus } from "react-icons/fa6";
import NewsFormModal from "./NewsFormModal";
import { useAuth } from "../../context/AuthContext";

const AllNewsPage = ({ setTemp, temp }) => {
  const { newsData } = useNews();
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [temp]);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  // console.log(newsData)

  // let user = "postal"
  console.log(user);
  console.log(newsData)

  return (
    <div className="relative p-4">
      {user !== "admin" ? <BackButton /> : ""}
      {(user === "mediator" || user === "postalCircle") && (
        <button
          className="bg-primary-dark flex items-center text-primary-light py-2 px-4 rounded-lg hover:opacity-90 transition absolute top-5 right-5"
          onClick={openModal}
        >
          <FaPlus className="mr-2" /> Create News
        </button>
      )}
      <div className="container mx-auto md:py-5">
        <h1 className="md:text-3xl text-2xl text-center font-bold text-primary-dark dark:text-text-dark md:mb-3 md:mt-0 mt-12 mb-5">
          All News
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:p-4">
          {newsData.map((newsItem, index) => (
            <NewsCard key={index} {...newsItem} />
          ))}
        </div>
      </div>
      {(user === "mediator" || user === "postalCircle") && (
        <NewsFormModal
          showModal={showModal}
          closeModal={closeModal}
          setTemp={setTemp}
        />
      )}
    </div>
  );
};

export default AllNewsPage;
