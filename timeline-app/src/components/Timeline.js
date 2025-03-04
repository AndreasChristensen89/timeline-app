import React, { useEffect, useState } from "react";
import TimelineEvent from "./TimelineEvent";

const Timeline = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/events.json")
      .then((response) => response.json())
      .then((data) => setEvents(data));
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8">
          {events.map((event, index) => (
            <TimelineEvent key={index} event={event} />
          ))}
        </div>
        <div className="col-md-4 position-fixed end-0 timeline">
          {[...Array(24).keys()].map((i) => (
            <div key={i} style={{ height: "50px", borderLeft: "2px solid black" }}>
              {new Date(2023, i % 12, 1).toLocaleString("default", { month: "long" })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;