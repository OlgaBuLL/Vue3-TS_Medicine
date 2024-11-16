import makeRequest from "@/api/makeRequest";

export const all = (params) => {
  return makeRequest({
    url: "/users",
    method: "GET",
    headers: {
      authorization: false,
    },
    params,
  });
};

export const show = (id) => {
  return makeRequest({
    url: `/users/${id}`,
    method: "GET",
    headers: {
      authorization: false,
    },
  });
};
