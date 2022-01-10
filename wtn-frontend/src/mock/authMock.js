import mock from "utils/mock";

mock.onPost("/login/test-token").reply(200, {
  email: "admin@gmail.com",
  is_active: true,
  is_superuser: true,
  full_name: "string",
  id: 2,
});
