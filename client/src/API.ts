import Axios from "axios";

const http = Axios.create({
  // baseURL: "https://cors-anywhere.herokuapp.com/http://46.101.110.53/api/",
  baseURL: "https://calendar.neobis.kg/api/",
  // baseURL: "http://46.101.110.53/api/",
  // baseURL: "http://www.220-accentuation.co/api/",
});

export function getCookie(name: string) {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
// let token = getCookie("XSRF-Token") || localStorage.getItem("token");
let token = localStorage.getItem("neoTimeToken");

const getData = (url: string) => {
  return http.get(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Token " + token,
    },
  });
};

const postData = (url: string, data: any) => {
  return http
    .post(url, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response;
    });
};

const postGetRoleData = (url: string, data: any) => {
  return http
    .post(url, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then(
      (response) => {
        console.log("%c " + response, "color: lightgreen");
        return response;
      },
      (error) => {
        console.log("%c " + error.response.statusText, "color: red");
        return error;
      }
    );
};

const patchData = (url: string, data: any) => {
  return http
    .patch(url, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Token " + token,
      },
    })
    .then((response) => {
      return response;
    });
};

const postTokenData = (url: string, data: any) => {
  return http
    .post(url, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Token " + token,
      },
    })
    .then((response) => {
      return response;
    });
};

const postDataWithReturnJSON = (url: string, data: any) => {
  return http.post(url, data, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Token " + token,
    },
  });
};

const deleteEvent = (url: string) => {
  return http.delete(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Token " + token,
    },
  });
};

const patchDataWithReturnJSON = (url: string, data: any) => {
  return http
    .patch(url, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Token " + token,
      },
    })
    .then((response) => {
      return response;
    });
};

const postFormData = (url: string, data: any) => {
  return http
    .post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Token " + token,
      },
    })
    .then((response) => {
      return response;
    });
};
const patchFormData = (url: string, data: any) => {
  return http
    .patch(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Token " + token,
      },
    })
    .then((response) => {
      return response;
    });
};

async function postAuthData(url: string, data: object) {
  let answer = await http.post(url, data).then((response) => {
    document.cookie = `XSRF-Token=${response.data.key}`;
    localStorage.setItem("neoTimeToken", response.data.key);
    return response;
  });
  return answer;
}

export default {
  getEvents: (
    limit: number = 10,
    offset: number = 0,
    search: string = "",
    period: string = ""
  ) =>
    getData(
      `events/?limit=${limit}&offset=${offset}&search=${search}&period=${period}`
    ),
  getNotifications: (
    limit: number = 10,
    offset: number = 0,
    search: string = "",
    period: string = ""
  ) =>
    getData(
      `notification/?limit=${limit}&offset=${offset}&search=${search}&period=${period}`
    ),
  getEventInfo: (id: string | number) => getData(`events/${id}/`),
  getRoomEvents: (
    id: number | string,
    limit: number,
    offset: number,
    period: string
  ) => getData(`place/${id}/?limit=${limit}&offset=${offset}&period=${period}`),
  getTodaySchedule: () => getData("today_events/"),
  getUsers: () => getData("users/"),
  getGeneralStat: () => getData("general_stats/"),
  getStatForAllDepartments: () => getData("stats_for_all_departments/"),
  getEndEvents: () => getData("my_events/"),
  getUserInfo: () => getData("users/rest-auth/user/"),
  getMyPoll: () => getData("my_poll/"),
  getEventPoll: (id: number | string, limit: number, offset: number) =>
    getData(`my_events/${id}/?limit=${limit}&offset=${offset}`),
  getNotes: () => getData("notes/"),
  getPersonalStats: (period: string) =>
    getData(`self-statistic/?period=${period}`),
  getStatByDepartment: (department: number, month: number, year: boolean) =>
    getData(
      `stats_by_department/?department_id=${department}&month=${month}&year=${year}`
    ),
  getRooms: () => getData("place/"),

  getRole: (token: string) => postGetRoleData("users/is_user_staff/", token),
  postRegistrationData: (data: object) =>
    postData("users/rest-auth/registration/", data),
  postAuthData: (data: object) => postAuthData("users/rest-auth/login/", data),
  postResetPasswordConfirm: (data: object) =>
    postData("users/rest-auth/password/reset/confirm/", data),
  postEventCreateData: (data: object) => postFormData("events/", data),
  postNoteCreateData: (data: object) => postTokenData("notes/", data),
  patchEventChangeData: (data: object, id: number | string) =>
    patchData(`events/${id}/`, data),
  patchNoteChangeData: (data: object, id: number | string) =>
    patchData(`notes/${id}/`, data),
  patchPoll: (data: object, id: number | string) =>
    patchDataWithReturnJSON(`poll/${id}/`, data),
  postPoll: (data: object) => postDataWithReturnJSON(`poll/`, data),
  postRecoveryPasswordData: (data: object) =>
    postData(`users/rest-auth/password/reset/`, data),
  patchMyEventPoll: (eventId: any, pollId: any, data: object) =>
    patchDataWithReturnJSON(`my_events/${eventId}/poll/${pollId}/`, data),
  patchUserInfo: (data: object) => patchFormData(`users/rest-auth/user/`, data),

  deleteEvent: (id: number | string) => deleteEvent(`events/${id}/`),
  deleteNote: (id: number | string) => deleteEvent(`notes/${id}/`),
};
