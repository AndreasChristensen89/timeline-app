import React from "react";
import "./TimelineEvent.css";

const typeColors = {
  event: "#FF6B6B",
  work: "#4ECDC4",
  internship: "#FFD166",
  education: "#FF9F1C"
};

function TimelineEvent({ event, index }) {
  const isLeft = index % 2 === 0;

  return (
    <div
      className={`timeline-event ${isLeft ? "left" : "right"}`}
    >
      <div className="event-dot"></div>
      <div
        className="event-card"
        data-type={event.type}
        style={{ backgroundColor: typeColors[event.type] || "#ffffff" }}
      >
        <h3>{event.title}</h3>
        <p className="date">
          {event.startDate} - {event.endDate || "Present"}
        </p>
        <p className={"description"}>{event.description}</p>
      </div>
    </div>
  );
}

export default TimelineEvent;
