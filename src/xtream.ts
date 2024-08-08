import { Profile } from "./types/profile";
import { LiveStream } from "./types/livestream";
import { VOD } from "./types/VOD";
import { Episode, EpisodeInfo, Serie, SerieInfo } from "./types/serie";
import { Category } from "./types/category";
/**
 * Xtream class is used to interact with the Xtream API.
 * It provides methods to fetch profiles, live streams, VOD streams, series, categories, EPG, server info and user info.
 */
export class Xtream {
  #baseUrl: string;
  #username: string;
  #password: string;
  #buildUrl: string;

  /**
   * Constructs an instance of the Xtream class.
   * @param {string} baseUrl - The base URL of the Xtream API.
   * @param {Object} auth - The authentication object containing username and password.
   */
  constructor(baseUrl: string, auth: { username: string; password: string }) {
    if (!baseUrl) {
      throw new Error("Base URL is required");
    }
    this.#baseUrl = baseUrl.trim();
    if (!this.#baseUrl.endsWith("/")) {
      this.#baseUrl += "/";
    }
    this.#username = auth.username.trim();
    this.#password = auth.password.trim();

    this.#buildUrl = `${this.#baseUrl}/player_api.php?username=${
      this.#username
    }&password=${this.#password}&action=`;
  }

  /**
   * Fetches the user profile.
   * @returns {Promise<Profile>} A promise that resolves to the user profile.
   */
  async getProfile(): Promise<Profile> {
    const response = await fetch(`${this.#buildUrl}get_user_info`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    await this.#handleErrors(response);
    return await response.json();
  }

  /**
   * Fetches the live streams.
   * @returns {Promise<LiveStream[]>} A promise that resolves to an array of live streams.
   */
  async getLiveStreams(): Promise<LiveStream[]> {
    const response = await fetch(`${this.#buildUrl}get_live_streams`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    await this.#handleErrors(response);
    const data: LiveStream[] = await response.json();
    data.map((item: LiveStream) => {
      item.url = `${this.#baseUrl}live/${this.#username}/${this.#password}/${
        item.stream_id
      }.ts`;
    });
    return data;
  }

  /**
   * Fetches the VOD streams.
   * @returns {Promise<VOD[]>} A promise that resolves to an array of VOD streams.
   */
  async getVODStreams(): Promise<VOD[]> {
    const response = await fetch(`${this.#buildUrl}get_vod_streams`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    await this.#handleErrors(response);
    const data: VOD[] = await response.json();
    console.log(response.status);
    data.map((item: VOD) => {
      item.url = `${this.#baseUrl}movie/${this.#username}/${this.#password}/${
        item.stream_id
      }.${item.container_extension}`;
    });
    return data;
  }

  /**
   * Fetches the series.
   * @returns {Promise<Serie[]>} A promise that resolves to an array of series.
   */
  async getSeries(): Promise<Serie[]> {
    const response = await fetch(`${this.#buildUrl}get_series`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    await this.#handleErrors(response);
    const data: Serie[] = await response.json();
    data.map((item: Serie) => {
      item.url = `${this.#baseUrl}series/${this.#username}/${this.#password}/${
        item.series_id
      }.mp4`;
    });
    return data;
  }

  /**
   * Fetches the serie info.
   * @param serie_id
   * @returns {Promise<SerieInfo>} A promise that resolves to the serie info.
   */
  async getSerieInfo(serie_id: number): Promise<SerieInfo> {
    const response = await fetch(
      `${this.#buildUrl}get_series_info&series_id=${serie_id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    await this.#handleErrors(response);
    const data: SerieInfo = await response.json();
    for (const k in Object.keys(data.episodes)) {
      if (typeof data.episodes[k] === "object") {
        data.episodes[k].map((item: Episode) => {
          item.url = `${this.#baseUrl}series/${this.#username}/${
            this.#password
          }/${item.id}.${item.container_extension}`;
        });
      }
    }
    return data;
  }

  /**
   * Fetches the live categories.
   * @returns {Promise<Category[]>} A promise that resolves to an array of categories.
   */
  async getCategories(): Promise<Category[]> {
    const response = await fetch(`${this.#buildUrl}get_live_categories`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    await this.#handleErrors(response);
    return await response.json();
  }

  /**
   * Fetches the VOD categories.
   * @returns {Promise<Category[]>} A promise that resolves to an array of categories.
   */
  async getVODCategories(): Promise<Category[]> {
    const response = await fetch(`${this.#buildUrl}get_vod_categories`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    await this.#handleErrors(response);
    return await response.json();
  }

  /**
   * Fetches the series categories.
   * @returns {Promise<Category[]>} A promise that resolves to an array of categories.
   */
  async getSeriesCategories(): Promise<Category[]> {
    const response = await fetch(`${this.#buildUrl}get_series_categories`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    await this.#handleErrors(response);
    return await response.json();
  }

  /**
   * Fetches the server info.
   * @returns {Promise<Profile>} A promise that resolves to the server info.
   */
  async getServerInfo(): Promise<Profile> {
    const response = await fetch(`${this.#buildUrl}get_server_info`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    await this.#handleErrors(response);
    return await response.json();
  }

  /**
   * Fetches the user info.
   * @returns {Promise<Profile>} A promise that resolves to the user info.
   */
  async getUserInfo(): Promise<Profile> {
    const response = await fetch(`${this.#buildUrl}get_user_info`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    await this.#handleErrors(response);
    return await response.json();
  }

  async #handleErrors(response: Response) {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response;
  }
}
