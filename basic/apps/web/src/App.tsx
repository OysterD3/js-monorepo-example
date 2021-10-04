import { createSignal } from "solid-js";
import type { Component } from "solid-js";
import { getRandomString, getString, HttpMethod, initFetch } from "../../../shared/utils";

const App: Component = () => {
  const fetchCall = initFetch(import.meta.env.API_URL || "http://localhost:8000")
  const [data, setData] = createSignal("")

  fetchCall(HttpMethod.GET, "/").then((resp) => setData(resp))

  return (
    <>
      <p class="text-4xl text-green-700 text-center py-20">{getString("web")}</p>
      <p class="text-4xl text-blue-700 text-center py-20">{data()}</p>
      <p class="text-center">I am a random string from shared: {getRandomString()}</p>
    </>
  );
};

export default App;
