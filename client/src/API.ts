import Axios from "axios";

const http = Axios.create({
  // baseURL: "https://cors-anywhere.herokuapp.com/http://46.101.110.53/api/",
  baseURL: "http://46.101.110.53/api/",
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
let token = getCookie("XSRF-Token");

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
  http
    .post(url, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then(
      (response) => {
        for (let textResponse in response.data) {
          alert(
            "Успешно:  " + textResponse + "  " + response.data[textResponse]
          );
        }
      },
      (error) => {
        for (let textError in error.response.data) {
          alert("Ошибка: " + textError + "  " + error.response.data[textError]);
        }
      }
    );
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
  http.patch(url, data, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Token " + token,
    },
  });
};

const postTokenData = (url: string, data: any) => {
  http
    .post(url, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Token " + token,
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

const postDataWithReturnJSON = (url: string, data: any) => {
  return http.post(url, data, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Token " + token,
    },
  });
};

const patchDataWithReturnJSON = (url: string, data: any) => {
  return http.patch(url, data, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Token " + token,
    },
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
    .then(
      (response) => {
        alert(response);
      },
      (error) => {
        alert(error);
        console.log(error.response.data);
      }
    );
};
const patchFormData = (url: string, data: any) => {
  return http
    .patch(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Token " + token,
      },
    })
    .then(
      (response) => {
        alert(response);
      },
      (error) => {
        console.log("patchFormData -> error", error);
      }
    );
};

async function postAuthData(url: string, data: object) {
  let answer = await http.post(url, data).then(
    (response) => {
      document.cookie = `XSRF-Token = ${response.data.key}`;
      return response;
    },
    (error) => {
      for (let textError in error.response.data) {
        alert("Ошибка: " + textError + "  " + error.response.data[textError]);
      }
      return error;
    }
  );
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
  getEventInfo: (id: string | number) => getData(`events/${id}/`),
  getRoomEvents: (id: number | string, limit: number, offset: number) =>
    getData(`place/${id}/?limit=${limit}&offset=${offset}`),
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

  getRole: (token: string) => postGetRoleData("users/is_user_staff/", token),
  postStatByDepartment: (data: any) =>
    postDataWithReturnJSON("stats_by_department/", data),
  postRegistrationData: (data: object) =>
    postData("users/rest-auth/registration/", data),
  postAuthData: (data: object) => postAuthData("users/rest-auth/login/", data),
  postEventCreateData: (data: object) => postFormData("events/", data),
  postNoteCreateData: (data: object) => postTokenData("notes/", data),
  patchEventChangeData: (data: object, id: number | string) =>
    patchData(`events/${id}/`, data),
  patchNoteChangeData: (data: object, id: number | string) =>
    patchData(`notes/${id}/`, data),
  patchPoll: (data: object, id: number | string) =>
    patchDataWithReturnJSON(`poll/${id}/`, data),
  postPoll: (data: object) => postDataWithReturnJSON(`poll/`, data),
  patchMyEventPoll: (eventId: any, pollId: any, data: object) =>
    patchDataWithReturnJSON(`my_events/${eventId}/poll/${pollId}/`, data),
  patchUserInfo: (data: object) => patchFormData(`users/rest-auth/user/`, data),
};
