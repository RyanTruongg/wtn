import uuid from "uuid/v1";
import moment from "moment";

import mock from "utils/mock";

const tests = [
  {
    id: 1,
    name: "Final Math 2020-2021",
    subject: "Math",
    start: Date.parse(new Date(Date.UTC(2021, 9, 15, 3, 0, 0))),
    end: Date.parse(new Date(Date.UTC(2021, 9, 15, 10, 0, 0))),
  },
  {
    id: 2,
    name: "Final Chemistry 2020-2021",
    subject: "Chemistry",
    start: Date.parse(new Date(Date.UTC(2021, 8, 10, 3, 0, 0))),
    end: Date.parse(new Date(Date.UTC(2021, 9, 15, 8, 0, 0))),
  },
  {
    id: 3,
    name: "Final English 2020-2021",
    subject: "English",
    start: Date.parse(new Date(Date.UTC(2021, 8, 5, 3, 0, 0))),
    end: Date.parse(new Date(Date.UTC(2021, 8, 10, 8, 0, 0))),
  },
];

mock.onGet("/api/classroom/courses").reply(200, {
  courses: [
    {
      id: uuid(),
      name: "IT 19050301",
      teacher: "Mai Van Manh",
      tests: tests,
    },
    {
      id: uuid(),
      name: "IT 19050301",
      teacher: "Mai Van Manh",
      tests: tests,
    },
    {
      id: uuid(),
      name: "IT 19050301",
      teacher: "Mai Van Manh",
      tests: tests,
    },
  ],
});

mock.onGet("/api/classroom/tests").reply(200, {
  tests: tests,
});

mock.onGet("/api/classroom/tests/1").reply(200, {
  test: {
    id: 1,
    name: "Final Math 2020-2021",
    subject: "Math",
    start: Date.parse(new Date(Date.UTC(2021, 9, 15, 3, 0, 0))),
    end: Date.parse(new Date(Date.UTC(2021, 9, 15, 10, 0, 0))),
  },
});

mock.onGet("/api/classroom/tests/2").reply(200, {
  test: {
    id: 2,
    name: "Final Chemistry 2020-2021",
    subject: "Chemistry",
    start: Date.parse(new Date(Date.UTC(2021, 8, 10, 3, 0, 0))),
    end: Date.parse(new Date(Date.UTC(2021, 9, 15, 8, 0, 0))),
  },
});

mock.onGet("/api/classroom/tests/3").reply(200, {
  test: {
    id: 3,
    name: "Final English 2020-2021",
    subject: "English",
    start: Date.parse(new Date(Date.UTC(2021, 8, 5, 3, 0, 0))),
    end: Date.parse(new Date(Date.UTC(2021, 8, 10, 8, 0, 0))),
  },
});

mock.onGet("/api/classroom/students").reply(200, {
  students: [
    {
      id: uuid(),
      name: "Adam Denisov",
      email: "adam.denisov@devias.io",
      avatar: "/images/avatars/avatar_7.png",
    },
    {
      id: uuid(),
      name: "Cao Yu",
      email: "cao.yu@devias.io",
      avatar: "/images/avatars/avatar_3.png",
    },
  ],
});

mock.onGet("/api/classroom/teachers").reply(200, {
  teachers: [
    {
      id: uuid(),
      name: "Shen Zhi",
      email: "shen.zhi@devias.io",
      avatar: "/images/avatars/avatar_11.png",
    },
    {
      id: uuid(),
      name: "Ekaterina Tankova",
      email: "ekaterina.tankova@devias.io",
      avatar: "/images/avatars/avatar_2.png",
    },
  ],
});
