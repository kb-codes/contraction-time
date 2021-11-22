import axios from "axios";

const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNmRhYWRmMjFhNGU3OTVhM2FhYTE3NDI4NmJkYmQxMTI0MmY0OTMxYWRiZGRjODkxOWQ1ZTE1ZGQ5MmFiYjNkOTBmYmQ4MmYwYTkyNDVlN2YiLCJpYXQiOjE2MzY2OTk3NjIuMTUyMzM2LCJuYmYiOjE2MzY2OTk3NjIuMTUyMzQsImV4cCI6MTY2ODIzNTc2Mi4xNDg4NDQsInN1YiI6IjIxIiwic2NvcGVzIjpbXX0.ImYheo0XHMJeabUDvjGWmiEhRqWu1Ka2G-J3ybN3hMeN-nCL65CZPUXJcbXD6CCZPW13pP12FBoAg-BK-jjBnp8I-LkUEoeoINF63pCtExUYiqn2KL2sVGBaqoS53HZwxXEU7A_-qCotOtVhI6m3Z3vb3OJqgINBUFzED1UJ04LQ9QnvxELsd131hytlY3ij9LH7wL_BPkWTfKBTAtq_rn8dHsfN4PzLgrlCBJLrgvwvi38R5XoTagGrAS0pQn7uqjd6dxwK7VpRmx5DO_KlWicAk8-gxmuq2HMP6bOO7HCdxpcUs-aI1uN7FMQW54lcqv66mB87KVTe2etTU6u_rgvYs8OhupfeqjEfZT1G5ZdMcdx2Minn59hP2GTJf5lBr4eOFmt-8cYtmFIKm8lhxBrdBTS4Sf8EG7ecEHMpiFfnQRCSeJEZkjmPdnYz_3iXwj12VrZYJZkNW2-w011lOxi6ie2SYw53g2mDhLto-j2XC9130nbzZ65xhqls6AtE5IOll-ETjE_Hq9bJM1CnTOqebF69SU7Sea1XUtZHjHQk1WNi8ncqy5scQCVWZudjv-6WdGGyWcaTGnQlQKeYD0DT3Fvp4-h1cuSkokZhc7CWoXr-hj_gnzKCk8XUlgWIaB66ZNhJkUUbINDGuWH5D8YA4C_zkgWU2nKktWjG8PE";

class Api {
  static _axios = null;
  static instance() {
    if (this._axios == null) {
      this._axios = axios.create({
        baseURL: "http://3.137.169.212/Admin/public/api/",
        timeout: 2000,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
    }
    return this._axios;
  }
}
export class DataApi {
  static getData() {
    return Api.instance().get("contraction_timer");
  }
  static addData(time, date, duration, note) {
    return Api.instance().post("contraction_timer", {
      time: time,
      date: date,
      duration: duration,
      intensity: "Slight",
      note: note,
    });
  }
}
