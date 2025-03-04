import React from "react";

function TimelineEvent({ event, cardWidth }) {
  return (
    <div className="d-flex" style={{ flexGrow: 1, minWidth: cardWidth, marginLeft: "20px" }}> {/* Ensure same-line layout */}
      {/* Event Card */}
      <div
        className={`card shadow bg-${event.type} position-relative`}
        style={{
          width: cardWidth,
          cursor: "pointer",
          transition: "0.3s",
        }}
      >
        <div className="card-body">
          <h5 className="card-title">{event.title}</h5>
          <p className="card-text mb-0">
            {event.startDate} {event.endDate ? (event.endDate.toLowerCase() === "current" ? "- Present" : "- "+event.endDate) : ""}
          </p>

          {/* Details - Only show when hovered */}
          <div className={`overflow-hidden mt-2`}>
            <p className="card-text">{event.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimelineEvent;
