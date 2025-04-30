import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import {toast} from "react-hot-toast";

const EventContext = createContext();

export const useEventContext = () => useContext(EventContext);

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [approvedEvents, setApprovedEvents] = useState([]);
  const [temp, setTemp] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/events")
      .then((res) => {
        let demo = res.data;
        let pendingEvents = [];
        let approved = [];
        demo.map((event) => {
          if (event.isApproved === true) {
            approved.push(event);
            
          } else {
            pendingEvents.push(event);
          }
        });
        setApprovedEvents(approved);
        
       
        setEvents(pendingEvents);
      })
      .catch((err) => console.log(err));
  }, [temp]);


  // const addEvent = (event) => {
  //   setEvents((prevEvents) => [...prevEvents, event]);
  // };

  // const updateEvent = (updatedEvent) => {
  //   setEvents((prevEvents) =>
  //     prevEvents.map((event) =>
  //       event.id === updatedEvent.id ? updatedEvent : event
  //     )
  //   );
  // };

  // const deleteEvent = (id) => {
  //   setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  // };

  return (
    <EventContext.Provider
      value={{ events, setEvents, approvedEvents, setTemp }}
    >
      {children}
    </EventContext.Provider>
  );
};
