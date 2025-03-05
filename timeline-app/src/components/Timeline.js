import React from "react";
import TimelineEvent from "./TimelineEvent";
import events from "../data/events.json";
import "./Timeline.css";

function Timeline() {
  return (
    <div className="timeline-container">
      <div className="timeline-line"></div>
      {events.map((event, index) => (
        <TimelineEvent key={index} event={event} index={index} />
      ))}
    </div>
  );
}

export default Timeline;
