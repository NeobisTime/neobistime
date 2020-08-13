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

const postFormData = (url: string, data: any) => {
  http.post(url, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Token " + token,
    },
  });
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
  getEvents: (limit?: number, offset?: number, search?: string) =>
    getData(`events/?limit=${limit}&offset=${offset}&search=${search}`),
  getEventInfo: (id: string | number) => http.get(`events/${id}/`),
  getRoomEvents: () => http.get("place/"),
  getTodaySchedule: () => getData("today_events/"),
  getUsers: () => getData("users/"),
  getGeneralStat: () => getData("general_stats/"),
  getStatForAllDepartments: () => getData("stats_for_all_departments/"),
  postStatByDepartment: (data: any) =>
    postTokenData("stats_by_department/", data),
  postRegistrationData: (data: object) =>
    postData("users/rest-auth/registration/", data),
  postAuthData: (data: object) => postAuthData("users/rest-auth/login/", data),
  postEventCreateData: (data: object) => postFormData("events/", data),
  postPoll: (data: object) => postTokenData("poll", data),
  //   getNews: (currentPage, perPage) =>
  //     http.get(`/api/main/news/?limit=${perPage}&offset=${currentPage}`),
};
