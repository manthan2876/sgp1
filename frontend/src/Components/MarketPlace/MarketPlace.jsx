import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


const Marketplace = () => {
  return (
    <div className="font-roboto text-center bg-white dark:bg-background-dark">
      <div className="container px-4 py-5">
        <h2 className="text-4xl mb-2 text-primary-dark font-bold">Philatelic Marketplace Online</h2>
        <h2 className="text-2xl mb-10 text-gray-600 dark:text-white">Your Philatelic Collection Awaits</h2>
        <div className="flex justify-around">
          <div className="bg-white border border-gray-300 rounded-lg shadow-lg m-2 w-1/4 p-5 box-border">
            <img
              className="w-full rounded-lg"
              src="https://storage.googleapis.com/a1aa/image/5ahMm8fnMLWeS0m1eT9b8kk1TOI41IbgrQ6UPths7RfmcAoPB.jpg"
              alt="A collection of unique stamps featuring various historical figures and animals."
             />
             <h3 className="text-xl my-4">Buy Stamps</h3>
             <p className="text-gray-500 mb-5">Explore Unique Items</p>
             <Link to="/all-items">
             <button className="bg-primary-dark text-white px-6 py-2 rounded-md cursor-pointer hover:bg-primary-light hover:text-primary-dark">
              Shop Now
             </button>
             </Link>
          </div>
          <div className="bg-white border border-gray-300 rounded-lg shadow-lg m-2 w-1/4 p-5 box-border">
            <img
              className="w-full rounded-lg"
              src="https://storage.googleapis.com/a1aa/image/3YTGqPQODsp1I1uP4k2JqbeQoRJRfqDCZpF399jG2SAGHA6TA.jpg"
              alt="A collection of organized stamps in a grid layout."
            />
            <h3 className="text-xl my-4">Manage Collection</h3>
            <p className="text-gray-500 mb-5">Organize Your Stamps</p>
            <Link to="/community/profile">
            <button className="bg-primary-dark text-white px-6 py-2 rounded-md cursor-pointer hover:bg-primary-light hover:text-primary-dark">
              View Collection
            </button>
            </Link>
          </div>
          <div className="bg-white border border-gray-300 rounded-lg shadow-lg m-2 w-1/4 p-5 box-border">
            <img
              className="w-full rounded-lg"
              src="https://storage.googleapis.com/a1aa/image/YZOsX1frDiUkPCKIxNKzXaKoUcbn1aZrp3l7easJR9kIHA6TA.jpg"
              alt="A secure payment stamp with a background of financial documents."
            />
            <h3 className="text-xl my-4">Secure Payments</h3>
            <p className="text-gray-500 mb-5">Safe and Reliable</p>
            <Link to="/items/my-cart">
            <button className="bg-primary-dark text-white px-6 py-2 rounded-md cursor-pointer hover:bg-primary-light hover:text-primary-dark">
              Secure Checkout
            </button>
            </Link>
          </div>
          <div className="bg-white border border-gray-300 rounded-lg shadow-lg m-2 w-1/4 p-5 box-border">
            <img
              className="w-full rounded-lg"
              src="https://storage.googleapis.com/a1aa/image/XDvJeLIWQuyyeENkGMslGYkLUNikIRiFBQ9cbha9b9RFHA6TA.jpg"
              alt="A collection of stamps featuring various buildings and landmarks."
            />
            <h3 className="text-xl my-4">Personal Notifications</h3>
            <p className="text-gray-500 mb-5">Stay Updated Daily</p>
            <Link to="/pda">
            <button className="bg-primary-dark text-white px-6 py-2 rounded-md cursor-pointer hover:bg-primary-light hover:text-primary-dark">
              Set Alerts
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
