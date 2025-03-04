import React from "react";
import PropTypes from "prop-types";

const TimelineEvent = ({ event }) => {
  const { startDate, endDate, title, description, type } = event;
  const bgColor = type === "work" ? "bg-primary" : "bg-success";

  return (
    <div className={`card text-white ${bgColor} mb-3`} style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <p className="card-text">
          <small>
            {startDate} - {endDate === "current" ? "Present" : endDate || ""}
          </small>
        </p>
      </div>
    </div>
  );
};

TimelineEvent.propTypes = {
  event: PropTypes.object.isRequired,
};

export default TimelineEvent;