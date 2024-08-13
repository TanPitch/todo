/*
TODO:
[ ] press enter -> login
[ ] add lists to multiple day (batch)
[ ] add copy head to text

FIXME:
[ ] ot boder not auto in day page
*/

var rawData;
var data = [];

// for DEBUG:
const isDebug = (isdebug) => {
  if (!isdebug) return;
  rawData = {
    app: { login_background: 0, theme: 1 },
    data: [
      {
        date: [2024, 7, 27],
        ot: {
          show: true,
          color: { bg: "#afafaf", text: "#ffffff" },
          text: "OT",
          shape: "round",
          border: { color: "#d92828", thick: 2, line: "dashed" },
        },
        color: "#222222",
        toplist: -1,
        lists: [
          {
            time: "08:00",
            color: { bg: "#333333", text: "#ffffff" },
            border: { color: "#d92929", thick: 2, line: "solid" },
            header: ".",
            text: ".",
            shape: "circle",
          },
          {
            time: "22:00",
            color: { bg: "#ee719e", text: "" },
            border: { color: "", thick: 2, line: "dashed" },
            header: "รักมีนๆ",
            text: "รักมีนๆ",
            shape: "box",
          },
          {
            time: "23:00",
            color: { bg: "#ffb8b8", text: "" },
            border: { color: "", thick: 0, line: "solid" },
            header: "รักนันๆ",
            text: "รักนันๆ",
            shape: "circle",
          },
        ],
      },
      {
        date: [2024, 7, 3],
        ot: {
          show: true,
          color: { bg: "", text: "" },
          text: "OT",
          shape: "round",
          border: { color: "", thick: 3, line: "dotted" },
        },
        color: "#222222",
        toplist: 0,
        lists: [
          {
            time: "00:00",
            color: { bg: "#393939", text: "#ffffff" },
            border: { color: "#d92929", thick: 2, line: "solid" },
            header: "",
            text: ".",
            shape: "circle",
          },
          {
            time: "17:00",
            color: { bg: "#ee719e", text: "#ffffff" },
            border: { color: "#d92929", thick: 2, line: "dotted" },
            header: "17:00 ทวีทอง2",
            text: "17:00 ทวีทอง2",
            shape: "circle",
          },
        ],
      },
      {
        date: [2024, 7, 5],
        ot: {
          show: false,
          color: { bg: "", text: "" },
          text: "OT",
          shape: "round",
          border: { color: "", thick: 3, line: "dotted" },
        },
        color: "#222222",
        toplist: -1,
        lists: [
          {
            time: "17:00",
            color: { bg: "#ee719e", text: "#ffffff" },
            border: { color: "#d92929", thick: 2, line: "dotted" },
            header: "17:00 ทวีทอง2",
            text: "17:00 ทวีทอง2",
            shape: "circle",
          },
        ],
      },
      {
        date: [2024, 7, 6],
        ot: {
          show: true,
          color: { bg: "", text: "" },
          text: "OT",
          shape: "round",
          border: { color: "", thick: 3, line: "dotted" },
        },
        color: "#222222",
        toplist: -1,
        lists: [
          {
            time: "17:00",
            color: { bg: "#ee719e", text: "#ffffff" },
            border: { color: "#d92929", thick: 2, line: "dotted" },
            header: "17:00 ทวีทอง2",
            text: "17:00 ทวีทอง2",
            shape: "circle",
          },
        ],
      },
      {
        date: [2024, 7, 8],
        ot: {
          show: true,
          color: { bg: "", text: "" },
          text: "OT",
          shape: "round",
          border: { color: "", thick: 3, line: "dotted" },
        },
        color: "#aab000",
        toplist: -1,
        lists: [],
      },
      {
        date: [2024, 7, 9],
        ot: {
          show: false,
          color: { bg: "", text: "" },
          text: "OT",
          shape: "round",
          border: { color: "", thick: 3, line: "dotted" },
        },
        color: "#bba000",
        toplist: -1,
        lists: [],
      },
    ],
  };
  // console.log(JSON.stringify(rawData));
  data = rawData;
  generateFilter();
  generateCalendar(now.getMonth(), now.getFullYear());
  document.querySelector("#page_login").style.display = "none";
  document.querySelector("#page_calendar").style.display = "block";
};

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
auto_login(); // DEBUG:
updateLoginBg();

// #region : main

// #region : page calendar

var colorLists = [];
function updateFilter() {
  data = JSON.parse(JSON.stringify(rawData));
  var colorCheck = [];
  document.querySelectorAll("#filter_area input").forEach((el) => {
    colorCheck.push(el.checked);
  });

  data.data.forEach((day, i) => {
    const newData = [];
    day.lists.forEach((el) => {
      if (colorCheck[colorLists.indexOf(el.color.bg)]) newData.push(el);
    });
    data.data[i].lists = newData;
  });
}
function generateFilter() {
  colorLists = [];
  rawData.data.forEach((day) => {
    day.lists.forEach((el) => {
      if (!colorLists.includes(el.color.bg)) colorLists.push(el.color.bg);
    });
  });

  document.querySelector("#filter_area").innerHTML = "";
  colorLists.forEach((color) => {
    document.querySelector(
      "#filter_area"
    ).innerHTML += `<div class="row gap" onclick="generateCalendar(${now.getMonth()}, ${now.getFullYear()})">
    <div class="switch_container">
    <input type="checkbox" class="checkbox" id="input_${color}" checked>
    <label class="switch" for="input_${color}">
    <span class="slider"></span>
    </label>
    </div>
    <div class="box" style="background-color: ${color}"></div>
    </div>`;
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
  const day_tools = document.querySelector("#day_tools");
  const header_label = document.querySelector("#header_label");
  const calendar_tools = document.querySelector("#calendar_tools");

  calendar_tools.style.display = "flex";
  day_tools.style.display = "none";

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
    var dayDataRaw = undefined;
    for (let i = 0; i < data.data.length; i++) {
      const getDate = data.data[i].date;
      if (getDate[0] == year && getDate[1] == month && getDate[2] == day) {
        dayData = data.data[i];
        dayDataRaw = rawData.data[i];
        break;
      }
    }
    var lists_txt = "";
    if (dayData != undefined) {
      const borderColor = (dataColor) => {
        const bgColor =
          dataColor == "" ? getComputedStyle(document.body).getPropertyValue("--white") : dataColor;
        return contrast(hexToRgb(bgColor).match(/\d+/g).map(Number));
      };

      // OT style
      const getBG =
        dayData.color == "" ? getComputedStyle(document.body).getPropertyValue("--white") : dayData.color;
      const otstyle = `style="${
        dayData.ot.color.bg != "" ? "background-color: " + dayData.ot.color.bg + "; " : ""
      }${dayData.ot.color.text != "" ? "color: " + dayData.ot.color.text + "; " : ""} border: ${
        dayData.ot.border.thick
      }px ${dayData.ot.border.line} ${
        dayData.ot.border.color == "" ? borderColor(getBG) : dayData.ot.border.color
      }"`;

      if (dayData.lists.length > 0) {
        const shapeReturn = (shape) => {
          switch (shape) {
            case "box":
              return "box";
            case "circle":
              return "box circle";
          }
        };

        // add only date
        // if (dayData.toplist < 0) lists_txt += `<div class="bold">${day}</div>`;

        // add top list
        for (let k = 0; k < dayData.lists.length; k++) {
          const el = dayData.lists[k];

          // find index
          var i = 0;
          for (i; i < dayDataRaw.lists.length; i++) {
            const thatRaw = dayDataRaw.lists[i];
            if (
              thatRaw.border.color == el.border.color &&
              thatRaw.border.thick == el.border.thick &&
              thatRaw.border.line == el.border.line &&
              thatRaw.time == el.time &&
              thatRaw.color.bg == el.color.bg &&
              thatRaw.color.text == el.color.text &&
              thatRaw.header == el.header &&
              thatRaw.text == el.text &&
              thatRaw.shape == el.shape
            )
              break;
          }

          if (i == dayData.toplist) {
            lists_txt += `<div class="row gap top"><div class="bold">${day}</div><div class="${shapeReturn(
              el.shape
            )}" style="background-color: ${el.color.bg}; border: ${el.border.thick}px ${el.border.line} ${
              el.border.color != "" ? el.border.color : borderColor(dayData.color)
            }"></div><div class="left">${el.header}</div></div>`;
            break;
          } else {
            lists_txt += `<div class="bold">${day}</div>`;
            break;
          }
        }

        // add others
        for (let k = 0; k < dayData.lists.length; k++) {
          const el = dayData.lists[k];

          // find index
          var i = 0;
          for (i; i < dayDataRaw.lists.length; i++) {
            const thatRaw = dayDataRaw.lists[i];
            if (
              thatRaw.border.color == el.border.color &&
              thatRaw.border.thick == el.border.thick &&
              thatRaw.border.line == el.border.line &&
              thatRaw.time == el.time &&
              thatRaw.color.bg == el.color.bg &&
              thatRaw.color.text == el.color.text &&
              thatRaw.header == el.header &&
              thatRaw.text == el.text &&
              thatRaw.shape == el.shape
            )
              break;
          }

          if (i != dayData.toplist) {
            lists_txt += `<div class="row gap top"><div class="${shapeReturn(
              el.shape
            )}" style="background-color: ${el.color.bg}; border: ${el.border.thick}px ${el.border.line} ${
              el.border.color != "" ? el.border.color : borderColor(dayData.color)
            }"></div><div class="left">${el.header}</div></div>`;
          }
        }

        cell_txt = `<div class="row gap top"><div class="col top">${lists_txt}</div>${
          dayData.ot.show ? `<div class="ot" ${otstyle}>OT</div>` : ""
        }</div>`;
      } else {
        cell_txt = dayData.ot.show
          ? `<div class="row"><div class="col"><div class="bold">${day}</div></div>${
              dayData.ot.show ? `<div class="ot" ${otstyle}>OT</div>` : ""
            }</div>`
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

// #endregion

// #region : page day

// top list checkbox
function top_checkbox(el) {
  const isCheck = el.className.includes(" check");
  document.querySelectorAll(".boxcheck").forEach((box) => {
    box.className = "boxcheck";
  });
  el.className = isCheck ? "boxcheck" : "boxcheck check";

  // get top list position
  var topPos = -1;
  var dayData = undefined;
  for (let i = 0; i < data.data.length; i++) {
    const getDate = data.data[i].date;
    if (getDate[0] == now.getFullYear() && getDate[1] == now.getMonth() && getDate[2] == now.getDate()) {
      dayData = data.data[i];
      break;
    }
  }
  dayData.lists.forEach((list, i) => {
    for (let j = 1; j < document.querySelectorAll("#day_area tr").length; j++) {
      const loadTime = document.querySelectorAll("#day_area tr")[j].querySelector("td").textContent;
      if (isInHour(list.time, loadTime)) {
        const checkbox = document
          .querySelectorAll("#day_area tr")
          [j].querySelectorAll("td")[1]
          .querySelector("div");
        if (checkbox.className.includes(" check")) {
          topPos = i;
          break;
        }
      }
    }
  });

  dayData.toplist = topPos;
  saveToServer();
}
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
  const calendar_tools = document.querySelector("#calendar_tools");
  const day_tools = document.querySelector("#day_tools");
  const day_area = document.querySelector("#day_area");
  const day_label = document.querySelector("#day_label");

  calendar_tools.style.display = "none";
  day_tools.style.display = "flex";

  page_filter.style.display = "none";

  // Update label bar
  day_label.textContent = `${day} ${monthsOfYear[month]} ${year}`;

  // Get day data
  var dayData = undefined;
  for (let i = 0; i < rawData.data.length; i++) {
    const getDate = rawData.data[i].date;
    if (getDate[0] == year && getDate[1] == month && getDate[2] == day) {
      dayData = rawData.data[i];
      break;
    }
  }

  const table = document.createElement("table");
  const thead = document.createElement("tr");

  // Create header row
  ["Time", "", "Detail"].forEach((list) => {
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
    const isTop = document.createElement("td");
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
      if (dayData.ot.show) {
        label_ot.textContent = dayData.ot.text;
        label_ot.style.opacity = dayData.ot.show ? 1 : 0;
        label_ot.style.backgroundColor = dayData.ot.color.bg;
        label_ot.style.color =
          dayData.ot.color.text ||
          (dayData.ot.color.bg
            ? contrast(hexToRgb(dayData.ot.color.bg).match(/\d+/g).map(Number))
            : getComputedStyle(document.body).getPropertyValue("--black"));
        label_ot.style.border = `${dayData.ot.border.thick}px ${dayData.ot.border.line} ${dayData.ot.border.color}`;
      } else label_ot.style.opacity = 0;

      if (dayData.lists.length > 0) {
        for (let i = 0; i < dayData.lists.length; i++) {
          const listData = dayData.lists[i];
          if (isInHour(listData.time, el)) {
            if (theme == 1) {
              td.style.backgroundColor = `${changeColor(listData.color.bg, -20)}`;
              detail.style.backgroundColor = `${changeColor(listData.color.bg, -20)}`;
            } else {
              td.style.backgroundColor = `${changeColor(listData.color.bg, 20)}`;
              detail.style.backgroundColor = `${changeColor(listData.color.bg, 20)}`;
            }
            // check if is top display
            isTop.innerHTML = `<div class="boxcheck${
              dayData.toplist == i ? " check" : ""
            }" onclick="top_checkbox(this)"></div>`;
            detail.textContent = listData.text;
            break;
          } else {
            isTop.innerHTML = `<div class="boxcheck" onclick="top_checkbox(this)"></div>`;
          }
        }
      } else isTop.innerHTML = `<div class="boxcheck"></div>`;
    } else {
      label_ot.textContent = "";
      label_ot.style.opacity = 0;
      isTop.innerHTML = `<div class="boxcheck"></div>`;
    }

    tr.appendChild(td);
    tr.appendChild(isTop);
    tr.appendChild(detail);
    table.appendChild(tr);
  });

  day_area.innerHTML = "";
  day_area.appendChild(table);
}

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
  page_day_setting.style.display = "none";
  page_add.style.display = "none";
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
  document.querySelector("#page_add").style.display = "block";

  const page_add_label = document.querySelector("#page_add_label");
  page_add_label.textContent = `${now.getDate()} ${monthsOfYear[now.getMonth()]} ${now.getFullYear()}`;

  const input_ot = document.querySelector("#input_ot");
  const input_cell_color = document.querySelector("#input_cell_colorBG");

  const input_txt_header = document.querySelector("#input_txt_header");
  const input_txt_text = document.querySelector("#input_txt_text");
  const input_txt_time = document.querySelector("#input_txt_time");
  const input_txt_color = document.querySelector("#input_txt_color");
  const input_dot_color = document.querySelector("#input_dot_color");
  const input_txt_shape = document.querySelector("#input_txt_shape");
  const input_line_color = document.querySelector("#input_line_color");
  const input_line_thick = document.querySelector("#input_line_thick");
  const input_line_dash = document.querySelector("#input_line_dash");

  const btn_add_delete = document.querySelector("#btn_add_delete");
  btn_add_delete.style.display = "flex";

  // load data
  const loadTime = e.target.parentNode.children[0].textContent.trim();

  // clear data
  input_txt_header.value = "";
  input_txt_text.value = "";
  input_txt_time.value = loadTime;
  input_txt_color.style.backgroundColor = "";
  input_dot_color.style.backgroundColor = "";
  input_txt_shape.value = "circle";
  input_line_color.style.backgroundColor = "";
  input_line_thick.value = 0;
  input_line_dash.value = "solid";

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
    input_cell_color.style.backgroundColor = dayData.color == "" ? getWhite : dayData.color;
    input_ot.checked = dayData.ot ? true : false;

    if (dayData.lists.length > 0) {
      // Load that data
      var thatData = undefined;
      for (let i = 0; i < dayData.lists.length; i++) {
        if (isInHour(dayData.lists[i].time, loadTime)) {
          thatData = dayData.lists[i];
          break;
        }
      }
      if (thatData != undefined) {
        input_txt_header.value = thatData.header.replaceAll("<br>", "\n");
        input_txt_text.value = thatData.text;
        input_txt_time.value = thatData.time;
        input_txt_color.style.backgroundColor = thatData.color.text;
        input_dot_color.style.backgroundColor = thatData.color.bg;
        input_txt_shape.value = thatData.shape;
        input_line_color.style.backgroundColor = thatData.border.color;
        input_line_thick.value = thatData.border.thick;
        input_line_dash.value = thatData.border.line;
      } else {
        input_txt_header.value = "";
        input_txt_text.value = "";
        input_txt_time.value = loadTime;
        input_txt_color.style.backgroundColor = "";
        input_dot_color.style.backgroundColor = "";
        input_txt_shape.value = "circle";
        input_line_color.style.backgroundColor = "";
        input_line_thick.value = 0;
        input_line_dash.value = "solid";

        btn_add_delete.style.display = "none";
      }
    } else {
      input_txt_header.value = "";
      input_txt_text.value = "";
      input_txt_time.value = loadTime;
      input_txt_color.style.backgroundColor = "";
      input_dot_color.style.backgroundColor = "";
      input_txt_shape.value = "circle";
      input_line_color.style.backgroundColor = "";
      input_line_thick.value = 0;
      input_line_dash.value = "solid";

      btn_add_delete.style.display = "none";
    }
  } else {
    btn_add_delete.style.display = "none";
  }
}
const saveData = () => {
  const input_txt_header = document.querySelector("#input_txt_header");
  const input_txt_text = document.querySelector("#input_txt_text");
  const input_txt_time = document.querySelector("#input_txt_time");
  const input_txt_color = document.querySelector("#input_txt_color");
  const input_dot_color = document.querySelector("#input_dot_color");
  const input_txt_shape = document.querySelector("#input_txt_shape");
  const input_line_color = document.querySelector("#input_line_color");
  const input_line_thick = document.querySelector("#input_line_thick");
  const input_line_dash = document.querySelector("#input_line_dash");

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

    // update that list
    if (thatData != undefined) {
      data.data[dataI].lists[thatDataI] = {
        time: input_txt_time.value,
        color: {
          bg: input_dot_color.style.backgroundColor
            ? `#${input_dot_color.style.backgroundColor
                .match(/\d+/g)
                .map(Number)
                .map((num) => num.toString(16).padStart(2, "0"))
                .join("")}`
            : "",
          text: input_txt_color.style.backgroundColor
            ? `#${input_txt_color.style.backgroundColor
                .match(/\d+/g)
                .map(Number)
                .map((num) => num.toString(16).padStart(2, "0"))
                .join("")}`
            : "",
        },
        border: {
          color: input_line_color.style.backgroundColor
            ? `#${input_line_color.style.backgroundColor
                .match(/\d+/g)
                .map(Number)
                .map((num) => num.toString(16).padStart(2, "0"))
                .join("")}`
            : "",
          thick: input_line_thick.value,
          line: input_line_dash.value,
        },
        header: input_txt_header.value.trim().replaceAll("\n", "<br>"),
        text: input_txt_text.value.trim(),
        shape: input_txt_shape.value,
      };
    } else {
      data.data[dataI].lists.push({
        time: input_txt_time.value,
        color: {
          bg: input_dot_color.style.backgroundColor
            ? `#${input_dot_color.style.backgroundColor
                .match(/\d+/g)
                .map(Number)
                .map((num) => num.toString(16).padStart(2, "0"))
                .join("")}`
            : "",
          text: input_txt_color.style.backgroundColor
            ? `#${input_txt_color.style.backgroundColor
                .match(/\d+/g)
                .map(Number)
                .map((num) => num.toString(16).padStart(2, "0"))
                .join("")}`
            : "",
        },
        border: {
          color: input_line_color.style.backgroundColor
            ? `#${input_line_color.style.backgroundColor
                .match(/\d+/g)
                .map(Number)
                .map((num) => num.toString(16).padStart(2, "0"))
                .join("")}`
            : "",
          thick: input_line_thick.value,
          line: input_line_dash.value,
        },
        header: input_txt_header.value.trim().replaceAll("\n", "<br>"),
        text: input_txt_text.value.trim(),
        shape: input_txt_shape.value,
      });
    }
  } else {
    data.data.push({
      date: [now.getFullYear(), now.getMonth(), now.getDate()],
      ot: {
        show: false,
        color: {
          bg: "",
          text: "",
        },
        text: "OT",
        shape: "round",
        border: {
          color: "",
          thick: 0,
          line: "solid",
        },
      },
      color: "",
      toplist: 0,
      lists: [
        {
          time: input_txt_time.value,
          color: {
            bg: input_dot_color.style.backgroundColor
              ? `#${input_dot_color.style.backgroundColor
                  .match(/\d+/g)
                  .map(Number)
                  .map((num) => num.toString(16).padStart(2, "0"))
                  .join("")}`
              : "",
            text: input_txt_color.style.backgroundColor
              ? `#${input_txt_color.style.backgroundColor
                  .match(/\d+/g)
                  .map(Number)
                  .map((num) => num.toString(16).padStart(2, "0"))
                  .join("")}`
              : "",
          },
          border: {
            color: input_line_color.style.backgroundColor
              ? `#${input_line_color.style.backgroundColor
                  .match(/\d+/g)
                  .map(Number)
                  .map((num) => num.toString(16).padStart(2, "0"))
                  .join("")}`
              : "",
            thick: input_line_thick.value,
            line: input_line_dash.value,
          },
          header: input_txt_header.value.trim().replaceAll("\n", "<br>"),
          text: input_txt_text.value.trim(),
          shape: input_txt_shape.value,
        },
      ],
    });
  }

  // sort data
  sortByTime(data, dataI);
  rawData = JSON.parse(JSON.stringify(data));

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
      // delete only data
      if (data.data[dataI].lists.length > 1) {
        data.data[dataI].lists.splice(thatDataI, 1);
      } else {
        // if no ot, delete that day
        if (data.data[dataI].ot.show) {
          data.data[dataI].lists = [];
        } else {
          data.data.splice(dataI, 1);
        }
      }

      // sort data
      sortByTime(data, dataI);
      rawData = JSON.parse(JSON.stringify(data));

      generateDay(now.getDate(), now.getMonth(), now.getFullYear());
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

// cell edit
const cellData = () => {
  const input_ot = document.querySelector("#input_ot");
  const input_cell_text = document.querySelector("#input_cell_text");
  const input_cell_colorBG = document.querySelector("#input_cell_colorBG");
  const input_cell_colorOT = document.querySelector("#input_cell_colorOT");
  const input_cell_colorBorder = document.querySelector("#input_cell_colorBorder");
  const input_cell_thick = document.querySelector("#input_cell_thick");
  const input_cell_dash = document.querySelector("#input_cell_dash");

  var dataI = 0;
  for (dataI; dataI < data.data.length; dataI++) {
    const getDate = data.data[dataI].date;
    if (getDate[0] == now.getFullYear() && getDate[1] == now.getMonth() && getDate[2] == now.getDate())
      break;
  }
  if (data.data[dataI] != undefined) {
    if (data.data[dataI].lists.length == 0) {
      if (input_cell_colorBG.style.backgroundColor != "" || input_ot.checked) {
        data.data[dataI].ot.show = input_ot.checked;
        data.data[dataI].ot.text = input_cell_text.value;

        (data.data[dataI].color = input_cell_colorBG.style.backgroundColor
          ? `#${input_cell_colorBG.style.backgroundColor
              .match(/\d+/g)
              .map(Number)
              .map((num) => num.toString(16).padStart(2, "0"))
              .join("")}`
          : ""),
          (data.data[dataI].ot.color.bg = input_cell_colorOT.style.backgroundColor
            ? `#${input_cell_colorOT.style.backgroundColor
                .match(/\d+/g)
                .map(Number)
                .map((num) => num.toString(16).padStart(2, "0"))
                .join("")}`
            : ""),
          (data.data[dataI].ot.border.color = input_cell_colorBorder.style.backgroundColor
            ? `#${input_cell_colorBorder.style.backgroundColor
                .match(/\d+/g)
                .map(Number)
                .map((num) => num.toString(16).padStart(2, "0"))
                .join("")}`
            : ""),
          (data.data[dataI].ot.border.line = input_cell_dash.value);
        data.data[dataI].ot.border.thick = input_cell_thick.value;
      } else data.data.splice(dataI, 1);
    } else {
      if (data.data[dataI].lists.length == 0) data.data.splice(dataI, 1);
      else {
        data.data[dataI].ot.show = input_ot.checked;
        data.data[dataI].ot.text = input_cell_text.value;

        (data.data[dataI].color = input_cell_colorBG.style.backgroundColor
          ? `#${input_cell_colorBG.style.backgroundColor
              .match(/\d+/g)
              .map(Number)
              .map((num) => num.toString(16).padStart(2, "0"))
              .join("")}`
          : ""),
          (data.data[dataI].ot.color.bg = input_cell_colorOT.style.backgroundColor
            ? `#${input_cell_colorOT.style.backgroundColor
                .match(/\d+/g)
                .map(Number)
                .map((num) => num.toString(16).padStart(2, "0"))
                .join("")}`
            : ""),
          (data.data[dataI].ot.border.color = input_cell_colorBorder.style.backgroundColor
            ? `#${input_cell_colorBorder.style.backgroundColor
                .match(/\d+/g)
                .map(Number)
                .map((num) => num.toString(16).padStart(2, "0"))
                .join("")}`
            : ""),
          (data.data[dataI].ot.border.line = input_cell_dash.value);
        data.data[dataI].ot.border.thick = input_cell_thick.value;
      }
    }
  } else {
    data.data.push({
      date: [now.getFullYear(), now.getMonth(), now.getDate()],
      ot: {
        show: false,
        color: {
          bg: "",
          text: "",
        },
        text: "OT",
        shape: "round",
        border: {
          color: "",
          thick: 0,
          line: "solid",
        },
      },
      color: input_cell_colorBG.style.backgroundColor
      ? `#${input_cell_colorBG.style.backgroundColor
          .match(/\d+/g)
          .map(Number)
          .map((num) => num.toString(16).padStart(2, "0"))
          .join("")}`
      : "",
      toplist: 0,
      lists: [],
    });
  }

  console.log(data); // DEBUG:
  // sort data
  sortByTime(data, dataI);
  rawData = JSON.parse(JSON.stringify(data));

  document.querySelector("#page_day").style.display = "block";
  document.querySelector("#page_add").style.display = "none";
  document.querySelector("#page_day_setting").style.display = "none";
  generateDay(now.getDate(), now.getMonth(), now.getFullYear());
};

document.querySelector("#btn_logout").addEventListener("click", () => {
  document.querySelector("#page_calendar").style.display = "none";
  document.querySelector("#page_login").style.display = "flex";
});

function saveToServer() {
  page_spin.style.display = "flex";
  rawData = JSON.parse(JSON.stringify(data));
  generateFilter();
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

const btn_day_setting = document.querySelector("#btn_day_setting");
const btn_day_save = document.querySelector("#btn_day_save");
const page_day_setting = document.querySelector("#page_day_setting");

btn_day_setting.addEventListener("click", () => {
  const input_ot = document.querySelector("#input_ot");
  const input_cell_text = document.querySelector("#input_cell_text");
  const input_cell_colorBG = document.querySelector("#input_cell_colorBG");
  const input_cell_colorOT = document.querySelector("#input_cell_colorOT");
  const input_cell_colorBorder = document.querySelector("#input_cell_colorBorder");
  const input_cell_thick = document.querySelector("#input_cell_thick");
  const input_cell_dash = document.querySelector("#input_cell_dash");

  // Get data of that day
  var dayData = undefined;
  for (let i = 0; i < data.data.length; i++) {
    const getDate = data.data[i].date;
    if (getDate[0] == now.getFullYear() && getDate[1] == now.getMonth() && getDate[2] == now.getDate()) {
      dayData = data.data[i];
      break;
    }
  }

  // reset setting
  input_ot.checked = false;
  input_cell_text.value = "";
  input_cell_colorBG.style.backgroundColor = "";
  input_cell_colorOT.style.backgroundColor = "";
  input_cell_colorBorder.style.backgroundColor = "";
  input_cell_thick.value = 0;
  input_cell_dash.value = "solid";

  page_day_setting.style.display = "block";

  if (dayData == undefined) return;

  // get setting
  const getWhite = getComputedStyle(document.body).getPropertyValue("--white");
  input_ot.checked = dayData.ot.show ? true : false;
  input_cell_text.value = dayData.ot.text;
  input_cell_colorBG.style.backgroundColor = dayData.color;
  input_cell_colorOT.style.backgroundColor = dayData.ot.color.bg;
  input_cell_colorBorder.style.backgroundColor = dayData.ot.border.color;
  input_cell_thick.value = dayData.ot.border.thick;
  input_cell_dash.value = dayData.ot.border.line;
});
btn_day_save.addEventListener("click", () => {
  cellData();
  saveToServer();  // DEBUG:
});

// #endregion

// #endregion

// #region : helper function

const hexToRgb = (h) => {
  let r = 0,
    g = 0,
    b = 0;

  // 3 digits
  if (h.length == 4) {
    r = "0x" + h[1] + h[1];
    g = "0x" + h[2] + h[2];
    b = "0x" + h[3] + h[3];

    // 6 digits
  } else if (h.length == 7) {
    r = "0x" + h[1] + h[2];
    g = "0x" + h[3] + h[4];
    b = "0x" + h[5] + h[6];
  }

  return "rgb(" + +r + "," + +g + "," + +b + ")";
};
const rgbToHex = (r, g, b) => {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};
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
      // symbol.textContent = "dark_mode";
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
      // symbol.textContent = "light_mode";
      break;
  }
}
function contrast(bg) {
  const brightness = Math.round(
    (parseInt(bg[0]) * 299 + parseInt(bg[1]) * 587 + parseInt(bg[2]) * 114) / 1000
  );
  const style = getComputedStyle(document.body);
  const get_black = style.getPropertyValue("--black");
  const get_white = style.getPropertyValue("--white");

  if (theme == 1) return brightness <= 125 ? get_black : get_white;
  else return brightness > 125 ? get_black : get_white;
}

// drop down
function dropDown() {
  event.target.parentNode.children[1].classList.toggle("show");
}
document.querySelectorAll(".dropdown-content > div").forEach((el) => {
  el.addEventListener("click", () => {
    el.parentNode.className = "dropdown-content";
  });
});
document.addEventListener("click", (e) => {
  if (e.target.matches(".dropbtn")) return;
  document.querySelectorAll(".dropdown-content").forEach((el) => {
    el.className = "dropdown-content";
  });
});

// #endregion

// #region : color picker

var pickerEl = null;

const color_picker = document.querySelector("#color_picker");
const picker_grid = document.querySelector("#picker_grid");
const picker_slide = document.querySelector("#picker_slide");

const picker_hex = document.querySelector("#picker_hex");

const btn_picker_grid = document.querySelector("#btn_picker_grid");
const btn_picker_slide = document.querySelector("#btn_picker_slide");

const picker_previous = document.querySelector("#picker_previous");
const picker_preview = document.querySelector("#picker_preview");

// generate grid
const cellColorGrid = (el) => {
  const pixel = el.target.style.backgroundColor.match(/\d+/g).map(Number);
  picker_hex.value = rgbToHex(pixel[0], pixel[1], pixel[2]);
  color_picker.querySelectorAll("td").forEach((element) => {
    element.className = "";
  });
  el.target.className = "select";
  picker_preview.style.backgroundColor = picker_hex.value;

  // update color slide
  const rgb = hexToRgb(picker_hex.value).match(/\d+/g).map(Number);
  const hsl = rgbToHsl(rgb[0], rgb[1], rgb[2]);
  const colorBox = document.querySelector("#colorBox");
  const pickerSize = 14;
  generateColorCanvas(hsl[0]);
  colorRainbow_picker.style.left = `${(170 * hsl[0]) / 360}px`;
  colorBox.style.top = `${((142 - pickerSize) * (100 - hsl[2])) / 100}px`;
  colorBox.style.left = `${((170 - pickerSize) * hsl[1]) / 100}px`;

  // update element
  pickerEl.style.backgroundColor = picker_hex.value;
};
const colorGrid = [
  [
    "#ffffff",
    "#ebebeb",
    "#d6d6d6",
    "#c2c2c2",
    "#adadad",
    "#999999",
    "#858585",
    "#707070",
    "#5c5c5c",
    "#474747",
    "#333333",
    "#000000",
  ],
  [
    "#133648",
    "#071d53",
    "#0f0638",
    "#2a093b",
    "#370c1b",
    "#541107",
    "#532009",
    "#53350d",
    "#523e0f",
    "#65611b",
    "#505518",
    "#2b3d16",
  ],
  [
    "#1e4c63",
    "#0f2e76",
    "#180b4e",
    "#3f1256",
    "#4e1629",
    "#781e0e",
    "#722f10",
    "#734f16",
    "#73591a",
    "#8c8629",
    "#707625",
    "#3f5623",
  ],
  [
    "#2e6c8c",
    "#1841a3",
    "#280c72",
    "#591e77",
    "#6f223d",
    "#a62c17",
    "#a0451a",
    "#a06b23",
    "#9f7d28",
    "#c3bc3c",
    "#9da436",
    "#587934",
  ],
  [
    "#3c8ab0",
    "#2155ce",
    "#331c8e",
    "#702898",
    "#8d2e4f",
    "#d03a20",
    "#ca5a24",
    "#c8862e",
    "#c99f35",
    "#f3ec4e",
    "#c6d047",
    "#729b44",
  ],
  [
    "#479fd3",
    "#2660f5",
    "#4725ab",
    "#8c33b5",
    "#aa395d",
    "#eb512e",
    "#ed732e",
    "#f3ae3d",
    "#f5c944",
    "#fefb67",
    "#ddeb5c",
    "#86b953",
  ],
  [
    "#01c7fc",
    "#3a87fe",
    "#5e30eb",
    "#be38f3",
    "#e63b7a",
    "#ff6250",
    "#ff8648",
    "#feb43f",
    "#fecb3e",
    "#fff76b",
    "#e4ef65",
    "#96d35f",
  ],
  [
    "#52d6fc",
    "#74a7ff",
    "#864ffe",
    "#d357fe",
    "#ee719e",
    "#ff8c82",
    "#ffa57d",
    "#ffc777",
    "#ffd977",
    "#fff994",
    "#eaf28f",
    "#b1dd8b",
  ],
  [
    "#93e3fd",
    "#a7c6ff",
    "#b18cfe",
    "#e292fe",
    "#f4a4e0",
    "#ffb5af",
    "#ffc5ab",
    "#ffd9a8",
    "#fee4ab",
    "#fffbb9",
    "#f2f7b7",
    "#cde8b5",
  ],
  [
    "#cbf0ff",
    "#d3e2ff",
    "#d9c9fe",
    "#efcafe",
    "#f9d3e0",
    "#ffdbd8",
    "#ffe2d6",
    "#ffecd4",
    "#fff2d5",
    "#efecdd",
    "#f7fadb",
    "#dfeed4",
  ],
];
const grid = document.createElement("table");
for (let i = 0; i < 10; i++) {
  const grid_row = document.createElement("tr");
  for (let j = 0; j < 12; j++) {
    const cell = document.createElement("td");
    cell.style.backgroundColor = colorGrid[i][j];
    cell.addEventListener("click", cellColorGrid);
    grid_row.appendChild(cell);
  }
  grid.appendChild(grid_row);
}
picker_grid.appendChild(grid);

// select previous color
picker_previous.addEventListener("click", () => {
  const pixel = picker_previous.style.backgroundColor.match(/\d+/g).map(Number);
  picker_hex.value = rgbToHex(pixel[0], pixel[1], pixel[2]);
  picker_preview.style.backgroundColor = picker_hex.value;

  // update color slide
  const rgb = hexToRgb(picker_hex.value).match(/\d+/g).map(Number);
  const hsl = rgbToHsl(rgb[0], rgb[1], rgb[2]);
  const colorBox = document.querySelector("#colorBox");
  const pickerSize = 14;
  generateColorCanvas(hsl[0]);
  colorRainbow_picker.style.left = `${(170 * hsl[0]) / 360}px`;
  colorBox.style.top = `${((142 - pickerSize) * (100 - hsl[2])) / 100}px`;
  colorBox.style.left = `${((170 - pickerSize) * hsl[1]) / 100}px`;

  // update color grid
  color_picker.querySelectorAll("td").forEach((element) => {
    element.className = "";
  });
  for (let i = 0; i < colorGrid.length; i++) {
    for (let j = 0; j < colorGrid[i].length; j++) {
      const color = colorGrid[i][j];
      if (color == picker_hex.value) {
        picker_grid.querySelectorAll("td")[i * colorGrid[i].length + j].className = "select";
        break;
      }
    }
  }

  // update element
  pickerEl.style.backgroundColor = picker_hex.value;
});

// generate slider
const colorCanvas = document.querySelector("#colorCanvas");
const ColorCtx = colorCanvas.getContext("2d");

const colorRainbow = document.querySelector("#colorRainbow");
const colorRainbow_picker = document.querySelector("#colorRainbow_picker");

const generateColorCanvas = (hue) => {
  const rgb = hslToRgb(hue, 100, 50).map((el) => Math.round(el));
  var color = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
  let gradientH = ColorCtx.createLinearGradient(0, 0, ColorCtx.canvas.width, 0);
  gradientH.addColorStop(0, "#fff");
  gradientH.addColorStop(1, color);
  ColorCtx.fillStyle = gradientH;
  ColorCtx.fillRect(0, 0, ColorCtx.canvas.width, ColorCtx.canvas.height);

  let gradientV = ColorCtx.createLinearGradient(0, 0, 0, 142);
  gradientV.addColorStop(0, "rgba(0,0,0,0)");
  gradientV.addColorStop(1, "#000");
  ColorCtx.fillStyle = gradientV;
  ColorCtx.fillRect(0, 0, ColorCtx.canvas.width, ColorCtx.canvas.height);
};
generateColorCanvas(0);

// color slide - canvas
var isColorCanvasActive = false;
const colorCanvas_mouseDown = (e) => {
  if (isColorCanvasActive) return;

  const pickerSize = 14;
  const rect = colorCanvas.getBoundingClientRect();
  var getx = e.clientX - rect.left || e.touches[0].clientX - rect.left;
  var gety = e.clientY - rect.top || e.touches[0].clientY - rect.top;
  var x = Math.min(Math.max(getx, 1), colorCanvas.width - 1);
  var y = Math.min(Math.max(gety, 1), colorCanvas.height - 1);

  // update color circle
  const colorBox = document.querySelector("#colorBox");
  const calcTop = ((colorCanvas.offsetHeight - pickerSize) * y) / colorCanvas.offsetHeight;
  const calcLeft = ((colorCanvas.offsetWidth - pickerSize) * x) / colorCanvas.offsetWidth;
  colorBox.style.top = `${Math.min(Math.max(calcTop, 0), colorCanvas.offsetHeight - pickerSize)}px`;
  colorBox.style.left = `${Math.min(Math.max(calcLeft, 0), colorCanvas.offsetWidth - pickerSize)}px`;

  // update getting color
  const pixel = ColorCtx.getImageData(x, y, 1, 1).data;
  picker_hex.value = rgbToHex(pixel[0], pixel[1], pixel[2]);
  picker_preview.style.backgroundColor = picker_hex.value;

  // update color grid
  color_picker.querySelectorAll("td").forEach((element) => {
    element.className = "";
  });
  for (let i = 0; i < colorGrid.length; i++) {
    for (let j = 0; j < colorGrid[i].length; j++) {
      const color = colorGrid[i][j];
      if (color == picker_hex.value) {
        picker_grid.querySelectorAll("td")[i * colorGrid[i].length + j].className = "select";
        break;
      }
    }
  }

  isColorCanvasActive = true;
};
const colorCanvas_mouseMove = (e) => {
  if (!isColorCanvasActive) return;

  const pickerSize = 14;
  const rect = colorCanvas.getBoundingClientRect();
  var getx = e.clientX - rect.left || e.touches[0].clientX - rect.left;
  var gety = e.clientY - rect.top || e.touches[0].clientY - rect.top;
  var x = Math.min(Math.max(getx, 1), colorCanvas.width - 1);
  var y = Math.min(Math.max(gety, 1), colorCanvas.height - 1);

  // update color circle
  const colorBox = document.querySelector("#colorBox");
  const calcTop = ((colorCanvas.offsetHeight - pickerSize) * y) / colorCanvas.offsetHeight;
  const calcLeft = ((colorCanvas.offsetWidth - pickerSize) * x) / colorCanvas.offsetWidth;
  colorBox.style.top = `${Math.min(Math.max(calcTop, 0), colorCanvas.offsetHeight - pickerSize)}px`;
  colorBox.style.left = `${Math.min(Math.max(calcLeft, 0), colorCanvas.offsetWidth - pickerSize)}px`;

  // update getting color
  const pixel = ColorCtx.getImageData(x, y, 1, 1).data;
  picker_hex.value = rgbToHex(pixel[0], pixel[1], pixel[2]);
  picker_preview.style.backgroundColor = picker_hex.value;

  // update color grid
  color_picker.querySelectorAll("td").forEach((element) => {
    element.className = "";
  });
  for (let i = 0; i < colorGrid.length; i++) {
    for (let j = 0; j < colorGrid[i].length; j++) {
      const color = colorGrid[i][j];
      if (color == picker_hex.value) {
        picker_grid.querySelectorAll("td")[i * colorGrid[i].length + j].className = "select";
        break;
      }
    }
  }

  // update element
  pickerEl.style.backgroundColor = picker_hex.value;
};
const colorCanvas_mouseUp = () => {
  if (!isColorCanvasActive) return;
  isColorCanvasActive = false;
};
colorCanvas.addEventListener("mousedown", colorCanvas_mouseDown);
colorCanvas.addEventListener("touchstart", colorCanvas_mouseDown);
document.addEventListener("mousemove", colorCanvas_mouseMove);
document.addEventListener("touchmove", colorCanvas_mouseMove);
document.addEventListener("mouseup", colorCanvas_mouseUp);
document.addEventListener("touchend", colorCanvas_mouseUp);

// color slide - rainbow
var isColorRainbowPickerActive = false;
const colorRainbow_mouseDown = (e) => {
  if (isColorRainbowPickerActive) return;
  const box = colorRainbow.getBoundingClientRect();
  const getx = e.clientX || e.touches[0].clientX;
  const x = Math.max(
    Math.min(
      (colorRainbow.offsetWidth * (getx - box.left)) / colorRainbow.offsetWidth,
      colorRainbow.offsetWidth - 4
    ),
    0
  );
  generateColorCanvas((360 * x) / colorRainbow.offsetWidth);
  colorRainbow_picker.style.left = `${x}px`;

  isColorRainbowPickerActive = true;
};
const colorRainbow_mouseMove = (e) => {
  if (!isColorRainbowPickerActive) return;
  const box = colorRainbow.getBoundingClientRect();
  const getx = e.clientX || e.touches[0].clientX;
  const x = Math.max(
    Math.min(
      (colorRainbow.offsetWidth * (getx - box.left)) / colorRainbow.offsetWidth,
      colorRainbow.offsetWidth - 4
    ),
    0
  );
  generateColorCanvas((360 * x) / colorRainbow.offsetWidth);
  colorRainbow_picker.style.left = `${x}px`;

  // update getting color
  const colorBox = document.querySelector("#colorBox");
  const pickerSize = 14;
  const calcTop =
    ((colorCanvas.offsetHeight - pickerSize) * colorBox.style.top.match(/\d+/g).map(Number)[0]) /
    colorCanvas.offsetHeight;
  const calcLeft =
    ((colorCanvas.offsetWidth - pickerSize) * colorBox.style.left.match(/\d+/g).map(Number)[0]) /
    colorCanvas.offsetWidth;
  const pixel = ColorCtx.getImageData(calcLeft, calcTop, 1, 1).data;
  picker_hex.value = rgbToHex(pixel[0], pixel[1], pixel[2]);
  picker_preview.style.backgroundColor = picker_hex.value;

  // update color grid
  color_picker.querySelectorAll("td").forEach((element) => {
    element.className = "";
  });
  for (let i = 0; i < colorGrid.length; i++) {
    for (let j = 0; j < colorGrid[i].length; j++) {
      const color = colorGrid[i][j];
      if (color == picker_hex.value) {
        picker_grid.querySelectorAll("td")[i * colorGrid[i].length + j].className = "select";
        break;
      }
    }
  }

  // update element
  pickerEl.style.backgroundColor = picker_hex.value;
};
const colorRainbow_mouseUp = () => {
  if (!isColorRainbowPickerActive) return;
  isColorRainbowPickerActive = false;
};
colorRainbow.addEventListener("mousedown", colorRainbow_mouseDown);
colorRainbow.addEventListener("touchstart", colorRainbow_mouseDown);
document.addEventListener("mousemove", colorRainbow_mouseMove);
document.addEventListener("touchmove", colorRainbow_mouseMove);
document.addEventListener("mouseup", colorRainbow_mouseUp);
document.addEventListener("touchend", colorRainbow_mouseUp);

// color picker - hex input
picker_hex.addEventListener("change", () => {
  // update color slide
  const rgb = hexToRgb(picker_hex.value).match(/\d+/g).map(Number);
  const hsl = rgbToHsl(rgb[0], rgb[1], rgb[2]);
  const colorBox = document.querySelector("#colorBox");
  const pickerSize = 14;
  colorRainbow_picker.style.left = `${(colorRainbow.offsetWidth * hsl[0]) / 360}px`;
  generateColorCanvas(hsl[0]);
  colorBox.style.top = `${((colorCanvas.offsetHeight - pickerSize) * (100 - hsl[2])) / 100}px`;
  colorBox.style.left = `${((colorCanvas.offsetWidth - pickerSize) * hsl[1]) / 100}px`;

  // update getting color
  picker_preview.style.backgroundColor = picker_hex.value;

  // update color grid
  color_picker.querySelectorAll("td").forEach((element) => {
    element.className = "";
  });
  for (let i = 0; i < colorGrid.length; i++) {
    for (let j = 0; j < colorGrid[i].length; j++) {
      const color = colorGrid[i][j];
      if (color == picker_hex.value) {
        picker_grid.querySelectorAll("td")[i * colorGrid[i].length + j].className = "select";
        break;
      }
    }
  }

  // update element
  pickerEl.style.backgroundColor = picker_hex.value;
});

btn_picker_grid.addEventListener("click", () => {
  if (btn_picker_grid.className == "select") return;
  btn_picker_grid.className = "select";
  btn_picker_slide.className = "";
  picker_grid.style.display = "flex";
  picker_slide.style.display = "none";
});
btn_picker_slide.addEventListener("click", () => {
  if (btn_picker_slide.className == "select") return;
  btn_picker_grid.className = "";
  btn_picker_slide.className = "select";
  picker_grid.style.display = "none";
  picker_slide.style.display = "flex";
});
picker_clear.addEventListener("click", () => {
  picker_hex.value = "";

  // update color slide
  const colorBox = document.querySelector("#colorBox");
  const pickerSize = 14;
  colorRainbow_picker.style.left = `${0}px`;
  generateColorCanvas(0);
  colorBox.style.top = `${pickerSize}px`;
  colorBox.style.left = `${pickerSize}px`;

  // update getting color
  picker_preview.style.backgroundColor = "";

  // update color grid
  color_picker.querySelectorAll("td").forEach((element) => {
    element.className = "";
  });

  // update element
  pickerEl.style.backgroundColor = "";

  document.querySelector("#color_picker").style.display = "none";
});

function openPicker() {
  pickerEl = event.target;
  const box = pickerEl.getBoundingClientRect();
  const boxPad = 10;
  color_picker.style.top = `${
    box.top + 316 > window.innerHeight - boxPad ? window.innerHeight - 316 - boxPad : box.top + boxPad
  }px`;
  color_picker.style.left = `${
    box.right + 210 > window.innerWidth - boxPad ? window.innerWidth - 210 - boxPad : box.right + boxPad
  }px`;
  const pixel =
    event == undefined
      ? ""
      : window.getComputedStyle(event.target).getPropertyValue("background-color").match(/\d+/g).map(Number);
  if (pixel != "") {
    // update previous color
    picker_previous.style.backgroundColor = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
    // update color slide
    const hsl = rgbToHsl(pixel[0], pixel[1], pixel[2]);
    const colorBox = document.querySelector("#colorBox");
    const pickerSize = 14;
    generateColorCanvas(hsl[0]);
    colorRainbow_picker.style.left = `${(170 * hsl[0]) / 360}px`;
    colorBox.style.top = `${((142 - pickerSize) * (100 - hsl[2])) / 100}px`;
    colorBox.style.left = `${((170 - pickerSize) * hsl[1]) / 100}px`;

    // update getting color
    picker_hex.value = rgbToHex(pixel[0], pixel[1], pixel[2]);
    picker_preview.style.backgroundColor = picker_hex.value;

    // update color grid
    color_picker.querySelectorAll("td").forEach((element) => {
      element.className = "";
    });
    for (let i = 0; i < colorGrid.length; i++) {
      for (let j = 0; j < colorGrid[i].length; j++) {
        const color = colorGrid[i][j];
        if (color == picker_hex.value) {
          picker_grid.querySelectorAll("td")[i * colorGrid[i].length + j].className = "select";
          break;
        }
      }
    }
  } else {
    colorRainbow_picker.style.left = "0px";
    generateColorCanvas(0);
  }
  color_picker.style.display = "flex";
  btn_picker_grid.className = "select";
  btn_picker_slide.className = "";
  picker_grid.style.display = "flex";
  picker_slide.style.display = "none";
}

window.addEventListener("click", (e) => {
  if (color_picker.style.display === "flex" && !color_picker.contains(e.target) && e.target !== pickerEl) {
    color_picker.style.display = "none";
  }
});

// #endregion

// #region : modal

var isModalDrag = false;
var mouseModalX, mouseModalY;
var intModalX, intModalY;
var currentModal;

const handle_modalStart = (e, el) => {
  currentModal = el.parentNode;
  if (isModalDrag) return;
  mouseModalX = e.clientX || e.touches[0].clientX;
  mouseModalY = e.clientY || e.touches[0].clientY;
  const rect = currentModal.getBoundingClientRect();
  intModalX = rect.left;
  intModalY = rect.top;

  isModalDrag = true;
};
const handle_modalMove = (e) => {
  if (!isModalDrag) return;
  const getX = e.clientX || e.touches[0].clientX;
  const getY = e.clientY || e.touches[0].clientY;

  const diffX = getX - mouseModalX;
  const diffY = getY - mouseModalY;

  currentModal.style.top = `${Math.min(
    Math.max(intModalY + diffY, 0),
    window.innerHeight - currentModal.offsetHeight
  )}px`;
  currentModal.style.left = `${Math.min(
    Math.max(intModalX + diffX, 0),
    window.innerWidth - currentModal.offsetWidth
  )}px`;
};

document.querySelectorAll(".modal>div.drag").forEach((el) => {
  el.addEventListener("mousedown", (e) => {
    handle_modalStart(e, el);
  });
  el.addEventListener("touchstart", (e) => {
    handle_modalStart(e, el);
  });
});
document.addEventListener("mousemove", (e) => {
  handle_modalMove(e);
});
document.addEventListener("touchmove", (e) => {
  handle_modalMove(e);
});
document.addEventListener("mouseup", () => {
  if (!isModalDrag) return;
  isModalDrag = false;
});
document.addEventListener("touchend", () => {
  if (!isModalDrag) return;
  isModalDrag = false;
});

// #endregion

// isDebug(true); // DEBUG:
