import { Profile } from "./types/profile";
import { LiveStream } from "./types/livestream";
import { VOD } from "./types/VOD";
import { Serie, SerieInfo } from "./types/serie";
import { Category } from "./types/category";
/**
 * Xtream class is used to interact with the Xtream API.
 * It provides methods to fetch profiles, live streams, VOD streams, series, categories, EPG, server info and user info.
 */
export declare class Xtream {
    #private;
    /**
     * Constructs an instance of the Xtream class.
     * @param {string} baseUrl - The base URL of the Xtream API.
     * @param {Object} auth - The authentication object containing username and password.
     */
    constructor(baseUrl: string, auth: {
        username: string;
        password: string;
    });
    /**
     * Fetches the user profile.
     * @returns {Promise<Profile>} A promise that resolves to the user profile.
     */
    getProfile(): Promise<Profile>;
    /**
     * Fetches the live streams.
     * @returns {Promise<LiveStream[]>} A promise that resolves to an array of live streams.
     */
    getLiveStreams(): Promise<LiveStream[]>;
    /**
     * Fetches the VOD streams.
     * @returns {Promise<VOD[]>} A promise that resolves to an array of VOD streams.
     */
    getVODStreams(): Promise<VOD[]>;
    /**
     * Fetches the series.
     * @returns {Promise<Serie[]>} A promise that resolves to an array of series.
     */
    getSeries(): Promise<Serie[]>;
    /**
     * Fetches the serie info.
     * @param serie_id
     * @returns {Promise<SerieInfo>} A promise that resolves to the serie info.
     */
    getSerieInfo(serie_id: number): Promise<SerieInfo>;
    /**
     * Fetches the live categories.
     * @returns {Promise<Category[]>} A promise that resolves to an array of categories.
     */
    getCategories(): Promise<Category[]>;
    /**
     * Fetches the VOD categories.
     * @returns {Promise<Category[]>} A promise that resolves to an array of categories.
     */
    getVODCategories(): Promise<Category[]>;
    /**
     * Fetches the series categories.
     * @returns {Promise<Category[]>} A promise that resolves to an array of categories.
     */
    getSeriesCategories(): Promise<Category[]>;
    /**
     * Fetches the server info.
     * @returns {Promise<Profile>} A promise that resolves to the server info.
     */
    getServerInfo(): Promise<Profile>;
    /**
     * Fetches the user info.
     * @returns {Promise<Profile>} A promise that resolves to the user info.
     */
    getUserInfo(): Promise<Profile>;
}
