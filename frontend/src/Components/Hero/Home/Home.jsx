import { useEffect } from "react";
import NewsList from "../../News/NewsList";
import SwiperSlider from "../Slider/SwiperSlider";
import Marketplace from "../../MarketPlace/MarketPlace";
import ItemsList from "../../Items/Stamps/ItemsList";


function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="p-4">
      <SwiperSlider />
      <Marketplace/>
      <NewsList />
      <ItemsList />
    </div>
  );
}

export default Home;
