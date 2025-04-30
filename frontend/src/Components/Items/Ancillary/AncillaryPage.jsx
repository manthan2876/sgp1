// import StampCard from "../Stamps/StampCard";
// import { useStamps } from "../../../context/StampContext";
// import { useEffect } from "react";
// import BackButton from "../../../UI/BackButton";

// const AncillaryPage = () => {
//   const { stamps } = useStamps();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   return (
//     <div className="relative p-4">
//       <BackButton />
//       <div className="container mx-auto md:py-5">
//         <h1 className="md:text-3xl text-2xl text-center font-bold text-primary-dark dark:text-text-dark md:mb-3 md:mt-0 mt-1 mb-5">
//           All Ancillary Items
//         </h1>
//         <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:p-4">
//           {stamps.length > 0 ? (
//             stamps.map((stamp) => <StampCard key={stamp.id} stamp={stamp} />)
//           ) : (
//             <p className="text-center col-span-full text-lg text-gray-500">
//               No items found.
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AncillaryPage;
