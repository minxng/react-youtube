import { createContext, useContext } from "react";
import Youtube from "../api/youtube";
import FakeYoutube from "../api/fakeYoutube";

export const YoutubeApiContext = createContext();

const youtube = new FakeYoutube();
// const youtube = new Youtube();

export function YoutubeApiProvider({ children }) {
  return (
    <YoutubeApiContext.Provider value={{ youtube }}>
      {children}
    </YoutubeApiContext.Provider>
  );
}

export function useYoutubeApi() {
  return useContext(YoutubeApiContext);
}

// Youtube라는 클래스로 만든 youtube instance를 제공해주는 우산
