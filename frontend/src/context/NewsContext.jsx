import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import {toast} from "react-hot-toast";

const NewsContext = createContext();

export const useNews = () => useContext(NewsContext);

export const NewsProvider = ({ children }) => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/news")
    .then((res) => {
      // console.log("News fetched");
      let demo = res.data;
      let pendingNews = [];
      demo.map((news) => {
        if (news.isApproved === true) {
          pendingNews.push(news);
        }
      });
      setNewsData(pendingNews);
    })
  }, []);

  return (
    <NewsContext.Provider value={{ newsData, setNewsData }}>
      {children}
    </NewsContext.Provider>
  );
};
