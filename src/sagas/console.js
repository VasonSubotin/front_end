import { takeEvery, put } from "redux-saga/effects";
import {
  eventsRequest,
  eventsFailure,
  eventsSuccess,
  setResult
} from "../modules/console";

const loadClientLibrary = () =>
  new Promise((resolve, reject) => {
    window.gapi.load("client", {
      callback: () => resolve(window.gapi),
      onerror: () => reject(),
      timeout: 5000,
      ontimeout: () => reject(new Error("Timeout"))
    });
  });

const loadCalendar = () =>
  new Promise(resolve => {
    window.gapi.client.load("calendar", "v3", () => resolve());
  });

// function* fetchEvents() {
//   const eventsList = {};
//   try {
//     yield loadClientLibrary();
//     yield loadCalendar();

//     const response = yield window.gapi.client.calendar.events.list({
//       calendarId: "primary",
//       timeMin: new Date("November 7, 2019 00:00:00").toISOString(),
//       showDeleted: false,
//       singleEvents: true,
//       maxResults: 10,
//       orderBy: "startTime"
//     });

//     yield put(setLastRequest(response));

//     const events = response.result.items;

//     if (events.length > 0) {
//       for (let i = 0; i < events.length; i++) {
//         const event = events[i];
//         let when = event.start.dateTime;
//         if (!when) {
//           when = event.start.date;
//         }
//         eventsList[event.id] = {
//           id: event.id,
//           dateTime: when,
//           summary: event.summary,
//           location: event.location || ""
//         };
//       }
//     } else {
//       console.log("✅ No upcoming events found.");
//     }

//     yield put(eventsSuccess(eventsList));
//   } catch (e) {
//     console.log("error", e);
//     yield put(eventsFailure(JSON.stringify(e)));
//   }
// }

// function* fetchNodesWorker({ payload }) {
//   const { msoc = 60 } = payload;

//   const eventsRequest = yield select(
//     state => console.log("state", state) || state.console.lastRequest
//   );

//   console.log("eventsRequest", eventsRequest);
//   console.log("msoc", msoc);
// }

function* eventsWorker({ payload }) {
  const eventsList = {};
  const { msoc = 60 } = payload;

  const tempDate = new Date();
  const timeMin = new Date(
    tempDate.getUTCFullYear(),
    tempDate.getUTCMonth(),
    tempDate.getUTCDate()
  ).toISOString();

  console.log("payload", payload);
  try {
    yield loadClientLibrary();
    yield loadCalendar();
    const response = yield window.gapi.client.calendar.events.list({
      calendarId: "primary",
      timeMin,
      showDeleted: false,
      singleEvents: true,
      maxResults: 10,
      orderBy: "startTime"
    });

    console.log("Events response data: ", response);

    const events = response.result.items;

    console.log("events", events);

    if (events.length > 0) {
      for (let i = 0; i < events.length; i++) {
        const event = events[i];
        let when = event.start.dateTime;
        if (!when) {
          when = event.start.date;
        }
        eventsList[event.id] = {
          id: event.id,
          dateTime: when,
          summary: event.summary,
          location: event.location || ""
        };
      }
    } else {
      return console.log("✅ No upcoming events found.");
    }
// Calling to back end to get json payload with coresponding intervals
    const resultResponse = yield fetch("http://localhost:8080/get_post", {
      method: "POST",
      body: JSON.stringify({ payload: response.result, params: { msoc } })
    });
// parsed data from payload
    console.log("Backend response: ", resultResponse);
    const data = yield resultResponse.json();

    console.log("Backend response data: ", data);

    yield put(eventsSuccess(eventsList));
    yield put(setResult({ msoc, ...data }));
  } catch (e) {
    console.log("Error: ", e);
    alert("Something went wrong. Try to increase msoc number or relogin");
    yield put(eventsFailure(JSON.stringify(e)));
  }
}

export default function* consoleWatcher() {
  yield takeEvery(eventsRequest, eventsWorker);
}
