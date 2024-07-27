/*
TODO:
[ ] setting -> adaptive UI

FIXME:
*/

var rawData;
var data = [];

// #region : login

var loginBg = 0;

const page_spin = document.querySelector("#page_spin");

const btn_login_showpass = document.querySelector("#btn_login_showpass");
const btn_login = document.querySelector("#btn_login");
const login_username = document.querySelector("#login_username");
const login_password = document.querySelector("#login_password");

const btn_login_bg = document.querySelector("#btn_login_bg");

btn_login_showpass.addEventListener("click", () => {
  btn_login_showpass.querySelector("span").textContent =
    login_password.type == "password" ? "visibility_off" : "visibility";
  login_password.type = login_password.type == "password" ? "text" : "password";
});

var sheetid = "";
const doLogin = () => {
  const userName = login_username.value;
  const passWord = login_password.value;
  if (userName.trim() == "") return;

  page_spin.style.display = "flex";
  const loginurl =
    "https://script.google.com/macros/s/AKfycbyo3qSwM_KFjpCFjo0gKz4AIGMu9rbFilijN-_NzYpgML-V0or4sB_LZVgkZmaLcpSb/exec";
  fetch(loginurl, {
    redirect: "follow",
    method: "POST",
    body: JSON.stringify({
      username: userName,
      password: passWord,
    }),
    headers: {
      "Content-type": "text/plain;charset=utf-8",
    },
  })
    .then((response) => response.text())
    .then((json) => {
      const output = JSON.parse(json);
      if (output.status == "success") {
        // fetch data from server
        sheetid = output.output;
        const dataurl =
          "https://script.google.com/macros/s/AKfycbyB3IFdP8LxILK2rVh3u_p-H-DwRPnRPUe9eIyVe95X-Nsdy56122kJhsXhyqu8ESOY/exec";
        fetch(dataurl, {
          redirect: "follow",
          method: "POST",
          body: JSON.stringify({ command: "get", sheetid: output.output }),
          headers: {
            "Content-type": "text/plain;charset=utf-8",
          },
        })
          .then((response) => response.text())
          .then((json) => {
            const getdata = JSON.parse(json);
            if (getdata.status == "success") {
              // saved username, password
              localStorage.setItem("todolist_emanresu", userName);
              localStorage.setItem("todolist_drowssap", passWord);

              rawData = JSON.parse(getdata.output);
              data = rawData;
              generateFilter();
              generateCalendar(now.getMonth(), now.getFullYear());
              document.querySelector("#page_login").style.display = "none";
              document.querySelector("#page_calendar").style.display = "block";
            }
            page_spin.style.display = "none";
          });
      } else {
        page_spin.style.display = "none";
      }
    });
};
btn_login.addEventListener("click", () => {
  doLogin();
});

const updateLoginBg = () => {
  const bg_lists = [
    {
      width: "100%",
      height: "100%",
      position: "fixed",
      top: "0",
      left: "0",
      display: "flex",
      "align-items": "center",
      "justify-content": "center",

      "--s": "100px",
      "--c1": "#383838",
      "--c2": "#222222",

      "--_g":
        "var(--c2) 6% 14%, var(--c1) 16% 24%, var(--c2) 26% 34%, var(--c1) 36% 44%, var(--c2) 46% 54%, var(--c1) 56% 64%, var(--c2) 66% 74%, var(--c1) 76% 84%, var(--c2) 86% 94%",
      background:
        "radial-gradient(100% 100% at 100% 0, var(--c1) 4%, var(--_g), #0008 96%, #0000), radial-gradient(100% 100% at 0 100%, #0000, #0008 4%, var(--_g), var(--c1) 96%) var(--c1)",
      "background-size": "var(--s) var(--s)",
    },
    {
      width: "100%",
      height: "100%",
      position: "fixed",
      top: "0",
      left: "0",
      display: "flex",
      "align-items": "center",
      "justify-content": "center",

      "--s": "120px",

      "--_g": "radial-gradient(#0000 70%, #1f1f1f 71%)",
      background:
        "var(--_g),var(--_g) calc(var(--s)/2) calc(var(--s)/2), conic-gradient(#383838 25%,#282828 0 50%,#222222 0 75%,#1b1b1b 0);",
      "background-size": "var(--s) var(--s)",
    },
    {
      width: "100%",
      height: "100%",
      position: "fixed",
      top: "0",
      left: "0",
      display: "flex",
      "align-items": "center",
      "justify-content": "center",

      "--sz": "10px",
      "--c0": "#181818",
      "--c1": "#262626",
      "--c2": "#323232",
      "--c3": "#222222",
      "--ts": "50%/ calc(var(--sz) * 12.8) calc(var(--sz) * 22)",
      background:
        "conic-gradient(from 120deg at 50% 86.5%, var(--c1) 0 120deg, #fff0 0 360deg) var(--ts), conic-gradient(from 120deg at 50% 86.5%, var(--c1) 0 120deg, #fff0 0 360deg) var(--ts), conic-gradient(from 120deg at 50% 74%, var(--c0) 0 120deg, #fff0 0 360deg) var(--ts), conic-gradient(from 60deg at 60% 50%, var(--c1) 0 60deg, var(--c2) 0 120deg, #fff0 0 360deg) var(--ts), conic-gradient(from 180deg at 40% 50%, var(--c3) 0 60deg, var(--c1) 0 120deg, #fff0 0 360deg) var(--ts), conic-gradient(from 0deg at 90% 35%, var(--c0) 0 90deg, #fff0 0 360deg) var(--ts), conic-gradient(from -90deg at 10% 35%, var(--c0) 0 90deg, #fff0 0 360deg) var(--ts), conic-gradient(from 0deg at 90% 35%, var(--c0) 0 90deg, #fff0 0 360deg) var(--ts), conic-gradient(from -90deg at 10% 35%, var(--c0) 0 90deg, #fff0 0 360deg) var(--ts), conic-gradient(from -60deg at 50% 13.5%, var(--c1) 0 120deg, #fff0 0 360deg) var(--ts), conic-gradient(from -60deg at 50% 13.5%, var(--c1) 0 120deg, #fff0 0 360deg) var(--ts), conic-gradient(from -60deg at 50% 41%, var(--c2) 0 60deg, var(--c3) 0 120deg, #fff0 0 360deg) var(--ts), var(--c0)",
    },
    {
      width: "100%",
      height: "100%",
      position: "fixed",
      top: "0",
      left: "0",
      display: "flex",
      "align-items": "center",
      "justify-content": "center",

      "--r": "56px",
      "--c1": "#323232 99%,#0000 101%",
      "--c2": "#222222 99%,#0000 101%",

      "--s": "calc(var(--r)*.866)",
      "--g0": "radial-gradient(var(--r),var(--c1))",
      "--g1": "radial-gradient(var(--r),var(--c2))",
      "--f": "radial-gradient(var(--r) at calc(100% + var(--s)) 50%,var(--c1))",
      "--p": "radial-gradient(var(--r) at 100% 50%,var(--c2))",
      background:
        "var(--f) 0 calc(-5*var(--r)/2), var(--f) calc(-2*var(--s)) calc(var(--r)/2), var(--p) 0 calc(-2*var(--r)), var(--g0) var(--s) calc(-5*var(--r)/2), var(--g1) var(--s) calc( 5*var(--r)/2), radial-gradient(var(--r) at 100% 100%,var(--c1)) 0 calc(-1*var(--r)),    radial-gradient(var(--r) at 0%   50% ,var(--c1)) 0 calc(-4*var(--r)), var(--g1) calc(-1*var(--s)) calc(-7*var(--r)/2), var(--g0) calc(-1*var(--s)) calc(-5*var(--r)/2), var(--p) calc(-2*var(--s)) var(--r), var(--g0) calc(-1*var(--s)) calc(var(--r)/ 2), var(--g1) calc(-1*var(--s)) calc(var(--r)/-2), var(--g0) 0 calc(-1*var(--r)), var(--g1) var(--s) calc(var(--r)/-2), var(--g0) var(--s) calc(var(--r)/ 2)  #222222",
      "background-size": "calc(4*var(--s)) calc(6*var(--r))",
    },
    {
      width: "100%",
      height: "100%",
      position: "fixed",
      top: "0",
      left: "0",
      display: "flex",
      "align-items": "center",
      "justify-content": "center",

      "--s": "70px",
      "--c": "#323232",

      "--_l": "#0000 46%,var(--c) 47% 53%,#0000 54%",
      background:
        "radial-gradient(100% 100% at 100% 100%,var(--_l)) var(--s) var(--s), radial-gradient(100% 100% at 0    0   ,var(--_l)) var(--s) var(--s), radial-gradient(100% 100%,#0000 22%,var(--c) 23% 29%, #0000 30% 34%,var(--c) 35% 41%,#0000 42%) #222222",
      "background-size": "calc(var(--s)*2) calc(var(--s)*2)",
    },
  ];
  updateCSS("#page_login {", bg_lists[loginBg]);
};
btn_login_bg.addEventListener("click", () => {
  loginBg = loginBg < 4 ? loginBg + 1 : 0;
  localStorage.setItem("todolist_loginbg", loginBg);
  updateLoginBg();
});

// #endregion

var theme = 0;
const now = new Date();

// auto dark mode
const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
theme = isSystemDark ? 1 : 0;

updateColorTheme(theme);
// load data from local saved
const auto_login = () => {
  const saved_username = localStorage.getItem("todolist_emanresu");
  const saved_password = localStorage.getItem("todolist_drowssap");
  const saved_loginBG = localStorage.getItem("todolist_loginbg");

  if (saved_loginBG != null) loginBg = saved_loginBG;

  if (saved_username != null) {
    login_username.value = saved_username;
    login_password.value = saved_password;
    doLogin();
  }
};
auto_login();
updateLoginBg();

// #region : main

var colorLists = [];
function updateFilter() {
  data = JSON.parse(JSON.stringify(rawData));
  var colorCheck = [];
  document.querySelectorAll("#page_filter input").forEach((el) => {
    colorCheck.push(el.checked);
  });

  data.data.forEach((day, i) => {
    const newData = [];
    day.lists.forEach((el) => {
      if (colorCheck[colorLists.indexOf(el.color)]) newData.push(el);
    });
    data.data[i].lists = newData;
  });
}
function generateFilter() {
  colorLists = [];
  rawData.data.forEach((day) => {
    day.lists.forEach((el) => {
      if (!colorLists.includes(el.color)) colorLists.push(el.color);
    });
  });

  document.querySelector("#page_filter").innerHTML = "";
  colorLists.forEach((color) => {
    document.querySelector(
      "#page_filter"
    ).innerHTML += `<div class="row gap" onclick="generateCalendar(${now.getMonth()}, ${now.getFullYear()})"><input type="checkbox" checked><div class="box" style="background-color: ${color}"></div></div>`;
  });
}
document.querySelector("#btn_filter").addEventListener("click", () => {
  generateFilter();
  const page_filter = document.querySelector("#page_filter");
  page_filter.style.display = page_filter.style.display == "block" ? "none" : "block";
});

const monthsOfYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function generateCalendar(month, year) {
  // update filter
  updateFilter();

  const calendar_area = document.querySelector("#calendar_area");
  const header_label = document.querySelector("#header_label");

  // Update label bar
  header_label.textContent = `${monthsOfYear[month]} ${year}`;

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const calendar = document.createElement("table");
  const headerRow = document.createElement("tr");

  // Create header row for days of the week
  daysOfWeek.forEach((day) => {
    const th = document.createElement("th");
    th.textContent = day;
    headerRow.appendChild(th);
  });
  calendar.appendChild(headerRow);

  // Get the first day of the month and the number of days in the month
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  let row = document.createElement("tr");
  let cellCount = 0;

  // Fill in the days before the first day of the month with dates from the previous month
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  for (let i = firstDay - 1; i >= 0; i--) {
    const cell = document.createElement("td");
    cell.textContent = daysInPrevMonth - i;
    cell.classList.add("transparent");
    cell.addEventListener("click", () => {
      prevMonth();
    });
    row.appendChild(cell);
    cellCount++;
  }

  // Fill in the days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    var cell_txt = `<div class="bold">${day}</div>`;

    // Get data of that day
    var dayData = undefined;
    for (let i = 0; i < data.data.length; i++) {
      const getDate = data.data[i].date;
      if (getDate[0] == year && getDate[1] == month && getDate[2] == day) {
        dayData = data.data[i];
        break;
      }
    }
    var lists_txt = "";
    if (dayData != undefined) {
      if (dayData.lists.length > 0) {
        const shapeReturn = (shape) => {
          switch (shape) {
            case "box":
              return "box";
            case "circle":
              return "box circle";
          }
        };
        dayData.lists.forEach((el, i) => {
          if (i == 0)
            lists_txt += `<div class="row gap top"><div class="bold">${day}</div><div class="${shapeReturn(
              el.shape
            )}" style="background-color: ${el.color}"></div><div class="left">${el.header}</div></div>`;
          else
            lists_txt += `<div class="row gap top"><div class="${shapeReturn(
              el.shape
            )}" style="background-color: ${el.color}"></div><div class="left">${el.header}</div></div>`;
        });
        cell_txt = `<div class="row"><div class="col">${lists_txt}</div>${
          dayData.ot ? '<div class="ot">OT</div>' : ""
        }</div>`;
      } else {
        cell_txt = dayData.ot
          ? `<div class="row"><div class="col"><div class="bold">${day}</div></div><div class="ot">OT</div></div>`
          : `<div class="bold">${day}</div>`;
      }
    } else cell_txt = `<div class="bold">${day}</div>`;
    const cell = document.createElement("td");
    cell.innerHTML = `${cell_txt}`;
    const today = new Date();
    if (day == today.getDate() && month == today.getMonth() && year == today.getFullYear())
      cell.className = "now";

    // highlight weekend
    const cellDay = new Date(year, month, day).getDay();
    if (cellDay % 7 == 6 || cellDay % 7 == 0) cell.classList.add("weekend");

    // add cell color
    if (dayData != undefined) cell.style.backgroundColor = `${dayData.color}`;

    // add event to click to that day
    cell.addEventListener("click", () => {
      generateDay(day, month, year);
      document.querySelector("#page_calendar").style.display = "none";
      now.setDate(day);
      document.querySelector("#page_day").style.display = "block";
    });

    row.appendChild(cell);
    cellCount++;

    // If the row is complete, append it to the calendar and start a new row
    if (cellCount % 7 === 0) {
      calendar.appendChild(row);
      row = document.createElement("tr");
    }
  }

  // Fill in the remaining cells of the last row with dates from the next month
  let nextMonthDay = 1;
  while (cellCount % 7 !== 0) {
    const cell = document.createElement("td");
    cell.textContent = nextMonthDay++;
    cell.classList.add("transparent");
    cell.addEventListener("click", () => {
      nextMonth();
    });
    row.appendChild(cell);
    cellCount++;
  }
  calendar.appendChild(row);

  calendar_area.innerHTML = "";
  calendar_area.appendChild(calendar);

  // update cell width and height
  var maxHeight = 0;
  document.querySelectorAll("#calendar_area td").forEach((el) => {
    maxHeight = el.offsetHeight > maxHeight ? el.offsetHeight : maxHeight;
  });
  document.querySelectorAll("#calendar_area td").forEach((el) => {
    el.style.height = `${maxHeight}px`;
  });

  // update cell color
  document.querySelectorAll("#calendar_area td").forEach((el) => {
    const computedEl = window.getComputedStyle(el);
    const bg =
      el.style.backgroundColor == ""
        ? theme == 1
          ? [22, 22, 22]
          : [239, 239, 239]
        : computedEl.backgroundColor.match(/\d+/g).slice(0, 3).map(Number);

    const brightness = Math.round(
      (parseInt(bg[0]) * 299 + parseInt(bg[1]) * 587 + parseInt(bg[2]) * 114) / 1000
    );
    const style = getComputedStyle(document.body);
    const get_black = style.getPropertyValue("--black");
    const get_white = style.getPropertyValue("--white");

    var textColor;
    if (theme == 1) textColor = brightness <= 125 ? get_black : get_white;
    else textColor = brightness > 125 ? get_black : get_white;
    if (!el.className.includes(["transparent"])) el.style.color = textColor;
  });
}
// generateCalendar(now.getMonth(), now.getFullYear());

function isInHour(time, roundHourTime) {
  // Parse the given time and round hour time
  let [givenHour, givenMinute] = time.split(":").map(Number);
  let [roundHour] = roundHourTime.split(":").map(Number);

  // Create Date objects for comparison
  let givenTime = new Date(0, 0, 0, givenHour, givenMinute);
  let startRoundHour = new Date(0, 0, 0, roundHour, 0);
  let endRoundHour = new Date(0, 0, 0, roundHour + 1, 0);

  // Check if the given time is between the round hour and the next round hour
  return givenTime >= startRoundHour && givenTime < endRoundHour;
}
function generateDay(day, month, year) {
  const day_area = document.querySelector("#day_area");
  const day_label = document.querySelector("#day_label");

  // Update label bar
  day_label.textContent = `${day} ${monthsOfYear[month]} ${year}`;

  // Get day data
  var dayData = undefined;
  for (let i = 0; i < data.data.length; i++) {
    const getDate = data.data[i].date;
    if (getDate[0] == year && getDate[1] == month && getDate[2] == day) {
      dayData = data.data[i];
      break;
    }
  }

  const table = document.createElement("table");
  const thead = document.createElement("tr");

  // Create header row
  ["Time", "Detail"].forEach((list) => {
    const th = document.createElement("th");
    th.textContent = list;
    thead.appendChild(th);
  });
  table.appendChild(thead);

  // Create lists
  const timeLists = [
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
  ];
  timeLists.forEach((el) => {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    const detail = document.createElement("td");
    td.textContent = el;
    td.addEventListener("click", (e) => {
      editData(e);
    });
    detail.addEventListener("click", (e) => {
      editData(e);
    });

    const label_ot = document.querySelector("#label_ot");
    if (dayData != undefined) {
      label_ot.textContent = dayData.ot ? "OT" : "";
      label_ot.className = dayData.ot ? "ot" : "";
      for (let i = 0; i < dayData.lists.length; i++) {
        const listData = dayData.lists[i];
        if (isInHour(listData.time, el)) {
          if (theme == 1) {
            td.style.backgroundColor = `${changeColor(listData.color, -30)}`;
            detail.style.backgroundColor = `${changeColor(listData.color, -30)}`;
          } else {
            td.style.backgroundColor = `${changeColor(listData.color, 30)}`;
            detail.style.backgroundColor = `${changeColor(listData.color, 30)}`;
          }
          detail.textContent = listData.text;
          break;
        }
      }
    } else {
      label_ot.textContent = "";
      label_ot.className = "";
    }
    tr.appendChild(td);
    tr.appendChild(detail);
    table.appendChild(tr);
  });

  day_area.innerHTML = "";
  day_area.appendChild(table);
}

document.querySelector("#btn_darkmode").addEventListener("click", () => {
  theme = theme == 1 ? 0 : 1;
  updateColorTheme(theme);
  generateCalendar(now.getMonth(), now.getFullYear());
});

const prevMonth = () => {
  now.setMonth(now.getMonth() - 1);
  generateCalendar(now.getMonth(), now.getFullYear());
};
const nextMonth = () => {
  now.setMonth(now.getMonth() + 1);
  generateCalendar(now.getMonth(), now.getFullYear());
};

document.querySelector("#btn_prevMonth").addEventListener("click", prevMonth);
document.querySelector("#btn_nextMonth").addEventListener("click", nextMonth);

const prevDay = () => {
  now.setDate(now.getDate() - 1);
  generateDay(now.getDate(), now.getMonth(), now.getFullYear());
};
const nextDay = () => {
  now.setDate(now.getDate() + 1);
  generateDay(now.getDate(), now.getMonth(), now.getFullYear());
};

document.querySelector("#btn_prevDay").addEventListener("click", prevDay);
document.querySelector("#btn_nextDay").addEventListener("click", nextDay);

document.querySelector("#btn_backCalendar").addEventListener("click", () => {
  document.querySelector("#page_calendar").style.display = "block";
  document.querySelector("#page_day").style.display = "none";
  generateCalendar(now.getMonth(), now.getFullYear());
});

function sortByTime(data, i) {
  if (data[i] && data[i].lists && data[i].lists.length > 1) {
    // Separate the first item
    const firstItem = data[i].lists[0];
    // Sort the rest by time
    const sortedList = data[i].lists.slice(1).sort((a, b) => {
      const timeA = new Date(`1970-01-01T${a.time}Z`);
      const timeB = new Date(`1970-01-01T${b.time}Z`);
      return timeA - timeB;
    });
    // Combine the first item with the sorted list
    data[i].lists = [firstItem, ...sortedList];
  }
  return data;
}
function editData(e) {
  document.querySelector("#page_day").style.display = "none";
  document.querySelector("#page_add").style.display = "block";

  const page_add_label = document.querySelector("#page_add_label");
  page_add_label.textContent = `${now.getDate()} ${monthsOfYear[now.getMonth()]} ${now.getFullYear()}`;

  const input_ot = document.querySelector("#input_ot");
  const input_cell_color = document.querySelector("#input_cell_color");

  const input_top_group = document.querySelector("#input_top_group");
  const input_top_header = document.querySelector("#input_top_header");
  const input_top_text = document.querySelector("#input_top_text");
  const input_top_time = document.querySelector("#input_top_time");
  const input_top_color = document.querySelector("#input_top_color");
  const input_top_shape = document.querySelector("#input_top_shape");

  const input_txt_header = document.querySelector("#input_txt_header");
  const input_txt_text = document.querySelector("#input_txt_text");
  const input_txt_time = document.querySelector("#input_txt_time");
  const input_txt_color = document.querySelector("#input_txt_color");
  const input_txt_shape = document.querySelector("#input_txt_shape");

  // load data
  const loadTime = e.target.parentNode.children[0].textContent.trim();

  // Get data of that day
  var dayData = undefined;
  for (let i = 0; i < data.data.length; i++) {
    const getDate = data.data[i].date;
    if (getDate[0] == now.getFullYear() && getDate[1] == now.getMonth() && getDate[2] == now.getDate()) {
      dayData = data.data[i];
      break;
    }
  }
  if (dayData != undefined) {
    const getWhite = getComputedStyle(document.body).getPropertyValue("--white");
    input_cell_color.value = dayData.color == "" ? getWhite : dayData.color;
    input_ot.checked = dayData.ot ? true : false;

    if (dayData.lists[0] != undefined) {
      const topData = dayData.lists[0];
      input_top_header.value = topData.header.replaceAll("<br>", "\n");
      input_top_text.value = topData.text;
      input_top_time.value = topData.time;
      input_top_color.value = topData.color;
      input_top_shape.value = topData.shape;
    }

    // Load that data
    var thatData = undefined;
    for (let i = 0; i < dayData.lists.length; i++) {
      if (isInHour(dayData.lists[i].time, loadTime)) {
        input_top_group.style.display = i == 0 ? "none" : "flex";
        thatData = dayData.lists[i];
        break;
      }
    }
    if (thatData != undefined) {
      input_txt_header.value = thatData.header.replaceAll("<br>", "\n");
      input_txt_text.value = thatData.text;
      input_txt_time.value = thatData.time;
      input_txt_color.value = thatData.color;
      input_txt_shape.value = thatData.shape;
    } else {
      input_txt_header.value = "";
      input_txt_text.value = "";
      input_txt_time.value = loadTime;
      input_txt_color.value = "#000000";
      input_txt_shape.value = "circle";
    }
  } else {
    input_top_header.value = "";
    input_top_text.value = "";
    input_top_time.value = "";
    input_top_color.value = "#000000";
    input_top_shape.value = "circle";

    input_txt_header.value = "";
    input_txt_text.value = "";
    input_txt_time.value = loadTime;
    input_txt_color.value = "#000000";
    input_txt_shape.value = "circle";
  }
}
const saveData = () => {
  const input_ot = document.querySelector("#input_ot");
  const input_cell_color = document.querySelector("#input_cell_color");

  const input_top_header = document.querySelector("#input_top_header");
  const input_top_text = document.querySelector("#input_top_text");
  const input_top_time = document.querySelector("#input_top_time");
  const input_top_color = document.querySelector("#input_top_color");
  const input_top_shape = document.querySelector("#input_top_shape");

  const input_txt_header = document.querySelector("#input_txt_header");
  const input_txt_text = document.querySelector("#input_txt_text");
  const input_txt_time = document.querySelector("#input_txt_time");
  const input_txt_color = document.querySelector("#input_txt_color");
  const input_txt_shape = document.querySelector("#input_txt_shape");

  const loadTime = document.querySelector("#input_txt_time").value;
  // Get data of that day
  var dayData = undefined;
  var dataI = 0;
  for (dataI; dataI < data.data.length; dataI++) {
    const getDate = data.data[dataI].date;
    if (getDate[0] == now.getFullYear() && getDate[1] == now.getMonth() && getDate[2] == now.getDate()) {
      dayData = data.data[dataI];
      break;
    }
  }
  if (dayData != undefined) {
    // Load that data
    var thatData = undefined;
    var thatDataI = 0;
    for (thatDataI; thatDataI < dayData.lists.length; thatDataI++) {
      if (isInHour(dayData.lists[thatDataI].time, loadTime)) {
        thatData = dayData.lists[thatDataI];
        break;
      }
    }

    // update top and OT
    data.data[dataI].ot = input_ot.checked;
    data.data[dataI].color = input_cell_color.value;
    data.data[dataI].lists[0] = {
      time: input_top_time.value,
      color: input_top_color.value,
      header: input_top_header.value.trim().replaceAll("\n", "<br>"),
      text: input_top_text.value.trim(),
      shape: input_top_shape.value,
    };

    // update that list
    if (thatData != undefined) {
      data.data[dataI].lists[thatDataI] = {
        time: input_txt_time.value,
        color: input_txt_color.value,
        header: input_txt_header.value.trim().replaceAll("\n", "<br>"),
        text: input_txt_text.value.trim(),
        shape: input_txt_shape.value,
      };
    } else {
      data.data[dataI].lists.push({
        time: input_txt_time.value,
        color: input_txt_color.value,
        header: input_txt_header.value.trim().replaceAll("\n", "<br>"),
        text: input_txt_text.value.trim(),
        shape: input_txt_shape.value,
      });
    }
  } else {
    data.data.push({
      date: [now.getFullYear(), now.getMonth(), now.getDate()],
      ot: input_ot.checked,
      color: input_cell_color.value,
      lists: [
        {
          time: input_txt_time.value,
          color: input_txt_color.value,
          header: input_txt_header.value.trim().replaceAll("\n", "<br>"),
          text: input_txt_text.value.trim(),
          shape: input_txt_shape.value,
        },
      ],
    });
  }

  // sort data
  sortByTime(data, dataI);

  document.querySelector("#page_day").style.display = "block";
  document.querySelector("#page_add").style.display = "none";
  generateDay(now.getDate(), now.getMonth(), now.getFullYear());
};
const deleteData = () => {
  const loadTime = document.querySelector("#input_txt_time").value;
  // Get data of that day
  var dayData = undefined;
  var dataI = 0;
  for (dataI; dataI < data.data.length; dataI++) {
    const getDate = data.data[dataI].date;
    if (getDate[0] == now.getFullYear() && getDate[1] == now.getMonth() && getDate[2] == now.getDate()) {
      dayData = data.data[dataI];
      break;
    }
  }
  if (dayData != undefined) {
    // Load that data
    var thatData = undefined;
    var thatDataI = 0;
    for (thatDataI; thatDataI < dayData.lists.length; thatDataI++) {
      if (isInHour(dayData.lists[thatDataI].time, loadTime)) {
        thatData = dayData.lists[thatDataI];
        break;
      }
    }
    if (thatData != undefined) {
      data.data[dataI].lists.splice(thatDataI, 1);

      // sort data
      sortByTime(data, dataI);

      generateDay(now.getDate(), now.getMonth(), now.getFullYear());
      saveToServer();
    } else console.log("no data found");
  } else console.log("no data found");

  document.querySelector("#page_day").style.display = "block";
  document.querySelector("#page_add").style.display = "none";
};
document.querySelector("#btn_add_save").addEventListener("click", () => {
  saveData();
  saveToServer();
});
document.querySelector("#btn_add_delete").addEventListener("click", () => {
  deleteData();
  saveToServer();
});

document.querySelector("#btn_logout").addEventListener("click", () => {
  document.querySelector("#page_calendar").style.display = "none";
  document.querySelector("#page_login").style.display = "flex";
});

function saveToServer() {
  page_spin.style.display = "flex";
  const dataurl =
    "https://script.google.com/macros/s/AKfycbyB3IFdP8LxILK2rVh3u_p-H-DwRPnRPUe9eIyVe95X-Nsdy56122kJhsXhyqu8ESOY/exec";
  fetch(dataurl, {
    redirect: "follow",
    method: "POST",
    body: JSON.stringify({ command: "set", sheetid: sheetid, data: JSON.stringify(data) }),
    headers: {
      "Content-type": "text/plain;charset=utf-8",
    },
  })
    .then((response) => response.text())
    .then((json) => {
      const getdata = JSON.parse(json);
      if (getdata.status == "success") {
      }
      page_spin.style.display = "none";
    });
}

// #endregion

// #region : helper function

const rgbToHsl = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s ? (l === r ? (g - b) / s : l === g ? 2 + (b - r) / s : 4 + (r - g) / s) : 0;
  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ];
};
const hslToRgb = (h, s, l) => {
  s /= 100;
  l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [255 * f(0), 255 * f(8), 255 * f(4)];
};
function changeColor(hex, percent) {
  // Remove the '#' if present
  hex = hex.replace(/^#/, "");

  // Parse the r, g, b values
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  const [h, s, l] = rgbToHsl(r, g, b);

  // Convert back to hex
  let R = Math.round(hslToRgb(h, s, l + percent)[0])
    .toString(16)
    .padStart(2, "0");
  let G = Math.round(hslToRgb(h, s, l + percent)[1])
    .toString(16)
    .padStart(2, "0");
  let B = Math.round(hslToRgb(h, s, l + percent)[2])
    .toString(16)
    .padStart(2, "0");

  return `#${R}${G}${B}`;
}
function updateCSS(el, cssProperties) {
  // Create a <style> element
  const style = document.createElement("style");

  // Construct the CSS string
  let cssString = el;
  for (const property in cssProperties) {
    cssString += `${property}: ${cssProperties[property]};`;
  }
  cssString += "}";

  // Set the CSS string as the content of the <style> element
  style.innerHTML = cssString;

  // Append the <style> element to the <head> of the document
  document.head.appendChild(style);
}
function updateColorTheme(theme) {
  const symbol = document.querySelector("#btn_darkmode span");
  switch (theme) {
    case 0:
      document.documentElement.style.setProperty("--black", "#222222");
      document.documentElement.style.setProperty("--white", "#efefef");
      document.documentElement.style.setProperty("--color5", "#d0d0d0");
      document.documentElement.style.setProperty("--color6", "#e5ffe5");
      updateCSS("#page_calendar td.weekend {", { "box-shadow": "inset 0 0 50px 50px rgba(0, 0, 0, 0.1)" });
      updateCSS(".btn:hover {", { "box-shadow": "inset 0 0 50px 50px rgba(0, 0, 0, 0.3)" });
      symbol.textContent = "dark_mode";
      break;
    case 1:
      document.documentElement.style.setProperty("--black", "#efefef");
      document.documentElement.style.setProperty("--white", "#222222");
      document.documentElement.style.setProperty("--color5", "#6a6a6a");
      document.documentElement.style.setProperty("--color6", "#899b89");
      updateCSS("#page_calendar td.weekend {", {
        "box-shadow": "inset 0 0 50px 50px rgba(255, 255, 255, 0.1)",
      });
      updateCSS(".btn:hover {", { "box-shadow": "inset 0 0 50px 50px rgba(255, 255, 255, 0.3)" });
      symbol.textContent = "light_mode";
      break;
  }
}

// #endregion
