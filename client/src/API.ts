import Axios from "axios";

const http = Axios.create({
  baseURL: "http://46.101.110.53/api/",
});

let token: string | null;
if (localStorage.getItem("token")) {
  token = localStorage.getItem("token");
}

const postData = (url: string, data: any) => {
  http
    .post(url, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // Authorization: "JWT " + token,
      },
    })
    .then(
      (response) => {
        if (response.status >= 200 && response.status <= 299) {
          alert("Проверьте почту");
        }
      },
      (error) => {
        // error.response.data.map((item:any) => {
        //   alert(item);
        // });
        console.log(error.response);
        
      }
    );
};
const postTokenData = (url: string, data: any) => {
  http.post(url, data, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "JWT " + token,
    },
  });
};

// async function postAuthData(url, data) {
//   let req = await http.post(url, data);
//   if (req.data.access) {
//     localStorage.setItem("token", req.data.access);
//   } else alert("перезагрузите страницу и попробуйте ввести данные заново");
//   return req
// }

export default {
  getEvents: () => http.get("events/"),
  postRegistrationData: (data: object) =>
    postData("users/rest-auth/registration/", data),
  //   getCreditsInfo: () => http.get("/api/main/creditsinfo/"),
  //   getNews: (currentPage, perPage) =>
  //     http.get(`/api/main/news/?limit=${perPage}&offset=${currentPage}`),
  //   getSelectedNews: (id) => http.get(`/api/main/news/${id}`),
  //   postCredit: (data) => {
  //     postTokenData("/api/main/credit/", data);
  //   },
  //   postRegistrData: (data) => postData("/api/auth/users/", data),
  //   autorization: (data) => {
  //     let res = postAuthData("/api/auth/jwt/create/", data);
  //     return res;
  //   },
  //   feedback: (data) => {
  //     postData("/api/main/feedback/", data);
  //   },
};

// async function getData(url) {
//   let response = await fetch(`${url}`, {
//     method: "GET",
//     headers: {
//       Accept: "application/json",
//       Authorization: "Bearer " + token,
//       "Content-Type": "application/json"
//     }
//   });
//   let body = await response.json();
//   return body;
// }

// async function postData(url, data) {
//   let req = await fetch(`${url}`, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       Authorization: "Bearer " + token,
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(data)
//   });
//   const res = await req.json();
//   return res;
// }

// async function putData(url, data) {
//   console.log(JSON.stringify(data));
//   let req = await fetch(`${url}`, {
//     method: "PUT",
//     headers: {
//       Accept: "application/json",
//       Authorization: "Bearer " + token,
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(data)
//   });
//   const res = await req.json();
//   return res;
// }

// async function deleteData(url) {
//   await fetch(`${API}${url}`, {
//     method: "DELETE",
//     headers: {
//       Accept: "application/json",
//       Authorization: "Bearer " + token,
//       "Content-Type": "application/json"
//     }
//   })
//     .then(res => {
//       console.log("removed");
//       console.log(res);
//     })
//     .catch(err => {
//       console.error(err);
//     });
// }
