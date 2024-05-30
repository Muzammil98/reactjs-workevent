import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { getWorkEventsInRange } from "../services";
import { useCallback, useEffect, useState } from "react";

const localizer = momentLocalizer(moment);

export default function CalendarComponent() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getWorkEventsInRange(
        new moment().startOf("month").format("YYYY-MM-DDTHH:mm:ss"),
        new moment().endOf("month").format("YYYY-MM-DDTHH:mm:ss")
      );

      setEvents(
        res.map((item) => ({
          start: moment(item.startsOn).toDate(),
          end: moment(item.endsOn).toDate(),
          title: item.user.firstname + " " + item.user.lastname,
          data: item,
        }))
      );
    };

    fetchData();
  }, []);

  const handleSelectEvent = useCallback((event) => {
    console.log("EVENT", event);
    const message =
      event.title +
      "  " +
      moment(event.start).format("hh:mm a") +
      "--" +
      moment(event.end).format("hh:mm a");

    window.alert(message);
  }, []);

  return (
    <Calendar
      localizer={localizer}
      events={events}
      defaultDate={new Date()}
      defaultView="month"
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      onSelectEvent={handleSelectEvent}
    />
  );
}
