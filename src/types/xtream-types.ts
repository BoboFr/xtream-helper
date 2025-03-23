/**
 * Enum representing different types of media streams
 */
export enum MediaType {
    LIVE = 'live',
    MOVIE = 'movie',
    SERIES = 'series'
}

export interface XtreamCredentials {
    username: string;
    password: string;
    baseUrl: string;
}

export interface XtreamAuthResponse {
    user_info: {
        username: string;
        password: string;
        message: string;
        auth: number;
        status: string;
        exp_date: string;
        is_trial: string;
        active_cons: string;
        created_at: string;
        max_connections: string;
        allowed_output_formats: string[];
    };
    server_info: {
        url: string;
        port: string;
        https_port: string;
        server_protocol: string;
        rtmp_port: string;
        timezone: string;
        timestamp_now: number;
        time_now: string;
    };
}

export interface XtreamCategory {
    category_id: string;
    category_name: string;
    parent_id: number;
}

export interface XtreamStream {
    stream_id: number;
    name: string;
    title: string;
    stream_icon: string;
    category_id: string;
    added: string;
    rating: string;
    rating_5based: number;
}

export interface XtreamVodStream extends XtreamStream {
    stream_type: string;
    container_extension: string;
    duration: string;
    plot: string;
    cast: string;
    director: string;
    genre: string;
    release_date: string;
    youtube_trailer: string;
}

export interface XtreamSeriesInfo extends XtreamStream {
    series_id: number;
    cover: string;
    plot: string;
    cast: string;
    director: string;
    genre: string;
    release_date: string;
    last_modified: string;
    episodes: {
        [season: string]: {
            [episode: string]: {
                id: string;
                episode_num: number;
                title: string;
                container_extension: string;
                info: {
                    duration: string;
                    plot: string;
                };
                added: string;
                season: number;
            }
        }
    };
}