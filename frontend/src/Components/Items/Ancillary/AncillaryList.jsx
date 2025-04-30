// import StampCard from "../Stamps/StampCard";
// import { useStamps } from "../../../context/StampContext";
// import { useNavigate } from "react-router-dom";

// const AncillaryList = () => {
//   const navigate = useNavigate();
//   const { stamps } = useStamps();

//   const handleViewAll = () => {
//     navigate("/all-ancillaryitems");
//   };

//   return (
//     <div className="container mx-auto py-10">
//       <h2 className="text-3xl font-bold text-center text-primary-dark dark:text-text-dark mb-10">
//         Featured Ancillary Items
//       </h2>
//       <div key={stamps._id} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {stamps.slice(0, 4).map((stamp) => (
//           <StampCard key={stamp._id} stamp={stamp} />
//         ))}
//       </div>
//       {stamps.length > 4 && (
//         <div className="mt-6 text-center">
//           <button
//             onClick={handleViewAll}
//             className="bg-primary-dark text-white px-5 py-2 rounded-full hover:opacity-90 transition-colors"
//           >
//             View All
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AncillaryList;
