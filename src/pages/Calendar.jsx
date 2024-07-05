import { useState } from "react"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const localizer = momentLocalizer(moment)

const MyCalendar = () => {
  const [events, setEvents] = useState([])
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: new Date(),
    end: new Date(),
  })
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSelect = ({ start, end }) => {
    setNewEvent({ title: "", start, end })
    setIsModalOpen(true)
  }

  const handleEventSave = () => {
    setEvents([...events, newEvent])
    saveEventToServer(newEvent)
    setIsModalOpen(false)
  }

  const handleEventUpdate = (event) => {
    const action = window.prompt(
      'Enter "edit" to edit the event or "delete" to delete it:',
      "edit"
    )
    if (action === "edit") {
      const newTitle = window.prompt("Update Event name", event.title)
      if (newTitle) {
        const updatedEvents = events.map((evt) =>
          evt === event ? { ...evt, title: newTitle } : evt
        )
        setEvents(updatedEvents)
        updateEventOnServer({ ...event, title: newTitle })
      }
    } else if (action === "delete") {
      const updatedEvents = events.filter((evt) => evt !== event)
      setEvents(updatedEvents)
      deleteEventFromServer(event)
    }
  }

  const saveEventToServer = async (event) => {
    try {
      const response = await fetch("http://localhost:4000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      })
      if (!response.ok) {
        throw new Error("Failed to save event")
      }
    } catch (error) {
      console.error("Error saving event:", error)
    }
  }

  const updateEventOnServer = async (event) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/events/${event.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(event),
        }
      )
      if (!response.ok) {
        throw new Error("Failed to update event")
      }
    } catch (error) {
      console.error("Error updating event:", error)
    }
  }

  const deleteEventFromServer = async (event) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/events/${event.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      if (!response.ok) {
        throw new Error("Failed to delete event")
      }
    } catch (error) {
      console.error("Error deleting event:", error)
    }
  }

  return (
    <div className="container mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Event Calendar</h2>
      <Calendar
        localizer={localizer}
        events={events}
        selectable
        onSelectEvent={handleEventUpdate}
        onSelectSlot={handleSelect}
        step={30}
        timeslots={2}
        defaultView="week"
        views={["month", "week", "day"]}
        formats={{
          eventTimeRangeFormat: ({ start, end }, culture, local) =>
            local.format(start, "hh:mm a", culture) +
            " - " +
            local.format(end, "hh:mm a", culture),
        }}
        style={{ height: 500 }}
        className="p-4 border rounded-lg"
      />
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-2">Create New Event</h3>
            <input
              type="text"
              placeholder="Event Title"
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
              className="mb-2 p-2 border rounded w-full"
            />
            <div className="mb-2">
              <label className="block mb-1">Start Date</label>
              <DatePicker
                selected={newEvent.start}
                onChange={(date) => setNewEvent({ ...newEvent, start: date })}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={30}
                dateFormat="MMMM d, yyyy h:mm aa"
                className="p-2 border rounded w-full"
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1">End Date</label>
              <DatePicker
                selected={newEvent.end}
                onChange={(date) => setNewEvent({ ...newEvent, end: date })}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={30}
                dateFormat="MMMM d, yyyy h:mm aa"
                className="p-2 border rounded w-full"
              />
            </div>
            <button
              onClick={handleEventSave}
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
              Save
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-gray-300 text-black px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyCalendar
