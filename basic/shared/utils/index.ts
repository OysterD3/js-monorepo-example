export const getString = (name: string): string => {
  return `Hello from ${name}!`
}

// Credits to: https://stackoverflow.com/a/1349426/6820538
export const getRandomString = (length = 5): string => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}

export enum HttpMethod {
  GET = "get",
  POST = "post",
  PATCH = "patch",
  DELETE = "delete",
}

type Options = {
  body?: Object;
  headers?: Record<string, string>;
};

export const initFetch = (apiUrl: string) => {
  return (
    method: HttpMethod,
    url: string,
    opts: Options = { body: {}, headers: {} },
  ): Promise<string> => {
    if (!/^(http|https)\:\/\//.test(url)) {
      url = apiUrl + url;
    }

    let headers: Record<string, string> = {};
    headers = Object.assign(opts.headers || {}, {
      Accept: "application/json",
      "Content-Type": "application/json",
    });

    const config: RequestInit = {
      method: method.toUpperCase(),
      headers,
      body: JSON.stringify(opts.body || {}),
    };
    if (method == HttpMethod.GET) {
      delete config["body"];
    }
    return fetch(url, config)
      .then((resp) => {
        if (!resp.ok) {
          // throw resp;
          throw Error(resp.statusText);
        }
        return resp;
      })
      .then((resp) => (resp.status === 204 ? Promise.resolve("") : Promise.resolve(resp.text())));
  };
}
