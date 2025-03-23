import { MediaType, XtreamCredentials, XtreamAuthResponse, XtreamCategory, XtreamStream, XtreamVodStream, XtreamSeriesInfo } from './types/xtream-types';

/**
 * XtreamAPI class provides methods to interact with the Xtream IPTV service
 * This class handles authentication and retrieval of various content categories
 * including live streams, VOD, and series
 */
export class XtreamAPI {
    private credentials: XtreamCredentials;

    /**
     * Creates an instance of XtreamAPI
     * @param credentials - The credentials object containing username, password, and baseUrl
     */
    constructor(credentials: XtreamCredentials) {
        this.credentials = credentials;
    }

    /**
     * Generates the authentication URL with credentials
     * @returns The complete authentication URL
     * @private
     */
    private getAuthUrl(): string {
        return `${this.credentials.baseUrl}/player_api.php?username=${this.credentials.username}&password=${this.credentials.password}`;
    }

    /**
     * Generates the URL for retrieving category-specific content
     * @param category - The category type to fetch (live, vod, series)
     * @returns The complete category URL
     * @private
     */
    private getCategoryUrl(category: string): string {
        return `${this.credentials.baseUrl}/player_api.php?username=${this.credentials.username}&password=${this.credentials.password}&action=get_${category}`;
    }

    /**
     * Authenticates with the Xtream service
     * @returns Promise resolving to the authentication response
     * @throws Error if authentication fails or network error occurs
     */
    async authenticate(): Promise<XtreamAuthResponse> {
        try {
            const response = await fetch(this.getAuthUrl());
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json() as XtreamAuthResponse;
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Authentication failed: ${error.message}`);
            }
            throw new Error('Authentication failed: Unknown error');
        }
    }

    /**
     * Retrieves all available live stream categories
     * @returns Promise resolving to the live categories data
     * @throws Error if the request fails
     */
    async getLiveCategories(): Promise<XtreamCategory[]> {
        const response = await fetch(this.getCategoryUrl('live_categories'));
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }

    /**
     * Retrieves all available live streams
     * @returns Promise resolving to the live streams data
     * @throws Error if the request fails
     */
    async getLiveStreams(): Promise<XtreamStream[]> {
        const response = await fetch(this.getCategoryUrl('live_streams'));
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }

    /**
     * Retrieves all available VOD categories
     * @returns Promise resolving to the VOD categories data
     * @throws Error if the request fails
     */
    async getVodCategories(): Promise<XtreamCategory[]> {
        const response = await fetch(this.getCategoryUrl('vod_categories'));
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }

    /**
     * Retrieves all available VOD streams
     * @returns Promise resolving to the VOD streams data
     * @throws Error if the request fails
     */
    async getVodStreams(): Promise<XtreamVodStream[]> {
        const response = await fetch(this.getCategoryUrl('vod_streams'));
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }

    /**
     * Retrieves all available series categories
     * @returns Promise resolving to the series categories data
     * @throws Error if the request fails
     */
    async getSeriesCategories(): Promise<XtreamCategory[]> {
        const response = await fetch(this.getCategoryUrl('series_categories'));
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }

    /**
     * Retrieves all available series
     * @returns Promise resolving to the series list data
     * @throws Error if the request fails
     */
    async getSeriesList(): Promise<XtreamSeriesInfo[]> {
        const response = await fetch(this.getCategoryUrl('series'));
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }

    /**
     * Generates a streaming URL for the specified media content
     * @param mediaType - Type of media (live, movie, or series)
     * @param streamId - ID of the stream to play
     * @param container - Container format (e.g., 'ts', 'mp4'). Defaults to 'ts' for live streams
     * @returns The complete streaming URL
     */
    getMediaUrl(mediaType: MediaType, streamId: string | number, container: string = 'ts'): string {
        const { username, password, baseUrl } = this.credentials;
        const extension = mediaType === MediaType.LIVE ? 'ts' : container;
        return `${baseUrl}${mediaType}/${username}/${password}/${streamId}.${extension}`;
    }
}