import moment from "moment";
import { GiPostOffice } from "react-icons/gi";
import { Link } from "react-router-dom";

const NewsCard = ({
  _id,
  title,
  description,
  image,
  postedTime,
}) => {
  const formattedPostedTime = moment(postedTime)
    .utcOffset("+05:30")
    .format("DD MMM YYYY, h:mm A");
    // console.log(_id)
    // console.log(name)

  return (
    <div className="flex flex-col-reverse md:flex-row items-start gap-3 dark:text-text-dark bg-background-light dark:bg-background-dark border border-border-dark rounded-lg md:p-8 p-4 transition-transform transform hover:scale-[1.01]">
      <div className="flex-1">
        <h2 className="md:text-xl text-lg font-semibold mb-2 text-text-black dark:text-text-dark">
          {title}
        </h2>
        <p className="text-sm text-text-black dark:text-text-dark mb-4">
          {description}
        </p>
        {/* <div className="inline-flex items-center bg-[#D3B000] text-black px-3 py-1 rounded mb-5 text-sm">
          <GiPostOffice className="mr-2" />
          {name}
        </div> */}
        <br />
        <Link
          to={`/all-news/${_id}`}
          className="bg-primary-dark dark:bg-primary-dark text-white px-5 py-2 rounded-full hover:opacity-90 transition-colors"
        >
          Know More
        </Link>
      </div>
      <div className="relative w-full md:w-1/3 flex-shrink-0 flex items-center justify-center md:h-full">
        <div className="absolute top-2 right-2 bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-md">
          {formattedPostedTime}
        </div>
        {image && (
          <img
            src={image}
            alt={title}
            className="rounded-lg object-cover w-full h-full"
          />
        )}
      </div>
    </div>
  );
};

export default NewsCard;
