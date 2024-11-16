import config from "@/api/config";

export default async ({
  url = "",
  method = "get",
  params = {},
  data = {},
  headers = {},
  responseType = "json",
}) => {
  url = config.apiUrl + url;

  const requestData = {
    url,
    method,
    headers,
    params,
    data,
    // body: JSON.stringify(data),
    responseType,
  };

  try {
    const response = await fetch(url, requestData);

    if (!response.ok) {
      console.error("Ошибка при запросе:", response.statusText);
      return { error: response.statusText };
    }

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error("Ошибка при выполнении запроса:", error);
    return { error: error.message };
  }
};
