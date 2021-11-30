import request from "supertest";
import isPortReachable from "is-port-reachable";

import server from "../src/app.js";

// Check if database port is reachable
beforeAll(async () => {
  const isSuccessConnected = await isPortReachable(5432, { host: "localhost" });
  if (!isSuccessConnected) {
    throw new Error("Database did not connect");
  }
});

// Close server after test
afterAll((done) => {
  server.close();
  done();
});

describe("Course API", () => {
  const URL = "/api/courses";

  // Get all
  test(`[GET] ${URL}`, async () => {
    const response = await request(server).get(URL);
    expect(response.statusCode).toBe(200);
  });
});

describe("Exam API", () => {
  const URL = "/api/exams";

  // Get all
  test(`[GET] ${URL}`, async () => {
    const response = await request(server).get(URL);
    expect(response.statusCode).toBe(200);
  });
});

describe("ExamAnswer API", () => {
  const URL = "/api/exam-answers";

  // Get all
  test(`[GET] ${URL}`, async () => {
    const response = await request(server).get(URL);
    expect(response.statusCode).toBe(200);
  });
});

describe("ExamQuestion API", () => {
  const URL = "/api/exam-questions";

  // Get all
  test(`[GET] ${URL}`, async () => {
    const response = await request(server).get(URL);
    expect(response.statusCode).toBe(200);
  });
});

describe("Question API", () => {
  const URL = "/api/questions";
  const mockCreate = {
    name: "Quan tri he thong mang 2",
    description: "abc",
    brief: "a",
  };

  // Get all
  test(`[GET] ${URL}`, async () => {
    const response = await request(server).get(URL);
    expect(response.statusCode).toBe(200);
  });

  // create
  test(`[POST] ${URL}`, async () => {
    const response = await request(server).post(URL).send(mockCreate);
    expect(response.statusCode).toBe(500);
  });
});

describe("QuestionOption API", () => {
  const URL = "/api/question-options";

  // Get all
  test(`[GET] ${URL}`, async () => {
    const response = await request(server).get(URL);
    expect(response.statusCode).toBe(200);
  });
});

describe("Subject API", () => {
  const URL = "/api/subjects";
  const mockCreate = {
    name: "Quan tri he thong mang 2",
    description: "abc",
    brief: "a",
  };
  let id = null;

  // Get all
  test(`[GET] ${URL}`, async () => {
    const response = await request(server).get(URL);
    expect(response.statusCode).toBe(200);
  });

  // create
  test(`[POST] ${URL}`, async () => {
    const response = await request(server).post(URL).send(mockCreate);
    expect(response.statusCode).toBe(201);
    expect(response.body.data.name).toBe("Quan tri he thong mang 2");
    expect(response.body.data.description).toBe("abc");
    id = response.body.data.id;
  });

  // delete
  test(`[DELETE] ${URL}/${id}`, async () => {
    const response = await request(server).delete(`${URL}/${id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.data).toBe(null);
  });
});
