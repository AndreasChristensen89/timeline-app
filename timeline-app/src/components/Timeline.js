import React from "react";
import events from "../data/events.json";
import TimelineEvent from "./TimelineEvent";

const MONTH_SPACING = 50;
const EVENT_GROUP_THRESHOLD = 4; // Group events within 4 months

const generateTimelineMonths = () => {
  const dates = events.map((event) => new Date(event.startDate));
  const minDate = new Date(Math.min(...dates));

  let months = [];
  let currentDate = new Date();
  currentDate.setDate(1);

  while (currentDate >= minDate) {
    months.push(new Date(currentDate));
    currentDate.setMonth(currentDate.getMonth() - 1);
  }

  return months;
};

const groupEvents = (events, timelineMonths) => {
  let groupedEvents = [];
  let currentGroup = [];

  events.forEach((event, index) => {
    const eventDate = new Date(event.startDate);
    const eventMonthIndex = timelineMonths.findIndex(
      (month) =>
        month.getFullYear() === eventDate.getFullYear() &&
        month.getMonth() === eventDate.getMonth()
    );

    if (currentGroup.length === 0) {
      currentGroup.push(event);
    } else {
      const lastEventDate = new Date(currentGroup[currentGroup.length - 1].startDate);
      const lastEventMonthIndex = timelineMonths.findIndex(
        (month) =>
          month.getFullYear() === lastEventDate.getFullYear() &&
          month.getMonth() === lastEventDate.getMonth()
      );

      if (Math.abs(eventMonthIndex - lastEventMonthIndex) <= EVENT_GROUP_THRESHOLD) {
        currentGroup.push(event);
      } else {
        groupedEvents.push(currentGroup);
        currentGroup = [event];
      }
    }
  });

  if (currentGroup.length > 0) {
    groupedEvents.push(currentGroup);
  }

  return groupedEvents;
};

const Timeline = () => {
  const timelineMonths = generateTimelineMonths();
  const totalHeight = timelineMonths.length * MONTH_SPACING;
  const groupedEvents = groupEvents(events, timelineMonths);

  return (
    <div className="container py-4">
      <h1 className="mb-5 text-center">Andreas Christensen CV</h1>
      <div className="d-flex">
        {/* Timeline on the left */}
        <div className="position-relative" style={{ width: "4px", height: `${totalHeight}px`, backgroundColor: "#ccc" }}>
          {timelineMonths.map((date, index) => (
            <div key={index} className="position-absolute" style={{ top: `${index * MONTH_SPACING}px` }}>
              <span className="position-absolute text-muted small" style={{ left: "-75px" }}>
                {date.toLocaleString("en-US", { month: "short", year: "numeric" })}
              </span>
              <div className="bg-dark rounded-pill" style={{ width: "8px", height: "8px", transform: "translateX(-50%)" }}></div>
            </div>
          ))}
        </div>

        {/* Events on the right */}
        <div className="position-relative flex-grow-1" style={{ minWidth: "300px" }}>
          {groupedEvents.map((group, groupIndex) => {
            const groupSize = group.length;
            const cardWidth = groupSize > 1 ? "20rem" : "25rem"; // Reduce width for multiple events

            return (
              <div key={groupIndex} className="d-flex position-absolute" style={{ 
                top: `${
                  timelineMonths.findIndex(
                    (month) =>
                      month.getFullYear() === new Date(group[0].startDate).getFullYear() &&
                      month.getMonth() === new Date(group[0].startDate).getMonth()
                  ) * MONTH_SPACING
                }px`,
                left: "0",
                width: "100%"
              }}>
                {group.map((event, index) => (
                  <TimelineEvent key={index} event={event} cardWidth={cardWidth} />
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
