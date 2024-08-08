"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Xtream_instances, _Xtream_baseUrl, _Xtream_username, _Xtream_password, _Xtream_buildUrl, _Xtream_handleErrors;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Xtream = void 0;
/**
 * Xtream class is used to interact with the Xtream API.
 * It provides methods to fetch profiles, live streams, VOD streams, series, categories, EPG, server info and user info.
 */
class Xtream {
    /**
     * Constructs an instance of the Xtream class.
     * @param {string} baseUrl - The base URL of the Xtream API.
     * @param {Object} auth - The authentication object containing username and password.
     */
    constructor(baseUrl, auth) {
        _Xtream_instances.add(this);
        _Xtream_baseUrl.set(this, void 0);
        _Xtream_username.set(this, void 0);
        _Xtream_password.set(this, void 0);
        _Xtream_buildUrl.set(this, void 0);
        if (!baseUrl) {
            throw new Error("Base URL is required");
        }
        __classPrivateFieldSet(this, _Xtream_baseUrl, baseUrl.trim(), "f");
        if (!__classPrivateFieldGet(this, _Xtream_baseUrl, "f").endsWith("/")) {
            __classPrivateFieldSet(this, _Xtream_baseUrl, __classPrivateFieldGet(this, _Xtream_baseUrl, "f") + "/", "f");
        }
        __classPrivateFieldSet(this, _Xtream_username, auth.username.trim(), "f");
        __classPrivateFieldSet(this, _Xtream_password, auth.password.trim(), "f");
        __classPrivateFieldSet(this, _Xtream_buildUrl, `${__classPrivateFieldGet(this, _Xtream_baseUrl, "f")}/player_api.php?username=${__classPrivateFieldGet(this, _Xtream_username, "f")}&password=${__classPrivateFieldGet(this, _Xtream_password, "f")}&action=`, "f");
    }
    /**
     * Fetches the user profile.
     * @returns {Promise<Profile>} A promise that resolves to the user profile.
     */
    getProfile() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${__classPrivateFieldGet(this, _Xtream_buildUrl, "f")}get_user_info`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            yield __classPrivateFieldGet(this, _Xtream_instances, "m", _Xtream_handleErrors).call(this, response);
            return yield response.json();
        });
    }
    /**
     * Fetches the live streams.
     * @returns {Promise<LiveStream[]>} A promise that resolves to an array of live streams.
     */
    getLiveStreams() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${__classPrivateFieldGet(this, _Xtream_buildUrl, "f")}get_live_streams`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            yield __classPrivateFieldGet(this, _Xtream_instances, "m", _Xtream_handleErrors).call(this, response);
            const data = yield response.json();
            data.map((item) => {
                item.url = `${__classPrivateFieldGet(this, _Xtream_baseUrl, "f")}live/${__classPrivateFieldGet(this, _Xtream_username, "f")}/${__classPrivateFieldGet(this, _Xtream_password, "f")}/${item.stream_id}.ts`;
            });
            return data;
        });
    }
    /**
     * Fetches the VOD streams.
     * @returns {Promise<VOD[]>} A promise that resolves to an array of VOD streams.
     */
    getVODStreams() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${__classPrivateFieldGet(this, _Xtream_buildUrl, "f")}get_vod_streams`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            yield __classPrivateFieldGet(this, _Xtream_instances, "m", _Xtream_handleErrors).call(this, response);
            const data = yield response.json();
            console.log(response.status);
            data.map((item) => {
                item.url = `${__classPrivateFieldGet(this, _Xtream_baseUrl, "f")}movie/${__classPrivateFieldGet(this, _Xtream_username, "f")}/${__classPrivateFieldGet(this, _Xtream_password, "f")}/${item.stream_id}.${item.container_extension}`;
            });
            return data;
        });
    }
    /**
     * Fetches the series.
     * @returns {Promise<Serie[]>} A promise that resolves to an array of series.
     */
    getSeries() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${__classPrivateFieldGet(this, _Xtream_buildUrl, "f")}get_series`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            yield __classPrivateFieldGet(this, _Xtream_instances, "m", _Xtream_handleErrors).call(this, response);
            const data = yield response.json();
            data.map((item) => {
                item.url = `${__classPrivateFieldGet(this, _Xtream_baseUrl, "f")}series/${__classPrivateFieldGet(this, _Xtream_username, "f")}/${__classPrivateFieldGet(this, _Xtream_password, "f")}/${item.series_id}.mp4`;
            });
            return data;
        });
    }
    /**
     * Fetches the serie info.
     * @param serie_id
     * @returns {Promise<SerieInfo>} A promise that resolves to the serie info.
     */
    getSerieInfo(serie_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${__classPrivateFieldGet(this, _Xtream_buildUrl, "f")}get_series_info&series_id=${serie_id}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            yield __classPrivateFieldGet(this, _Xtream_instances, "m", _Xtream_handleErrors).call(this, response);
            const data = yield response.json();
            for (const k in Object.keys(data.episodes)) {
                if (typeof data.episodes[k] === "object") {
                    data.episodes[k].map((item) => {
                        item.url = `${__classPrivateFieldGet(this, _Xtream_baseUrl, "f")}series/${__classPrivateFieldGet(this, _Xtream_username, "f")}/${__classPrivateFieldGet(this, _Xtream_password, "f")}/${item.id}.${item.container_extension}`;
                    });
                }
            }
            return data;
        });
    }
    /**
     * Fetches the live categories.
     * @returns {Promise<Category[]>} A promise that resolves to an array of categories.
     */
    getCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${__classPrivateFieldGet(this, _Xtream_buildUrl, "f")}get_live_categories`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            yield __classPrivateFieldGet(this, _Xtream_instances, "m", _Xtream_handleErrors).call(this, response);
            return yield response.json();
        });
    }
    /**
     * Fetches the VOD categories.
     * @returns {Promise<Category[]>} A promise that resolves to an array of categories.
     */
    getVODCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${__classPrivateFieldGet(this, _Xtream_buildUrl, "f")}get_vod_categories`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            yield __classPrivateFieldGet(this, _Xtream_instances, "m", _Xtream_handleErrors).call(this, response);
            return yield response.json();
        });
    }
    /**
     * Fetches the series categories.
     * @returns {Promise<Category[]>} A promise that resolves to an array of categories.
     */
    getSeriesCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${__classPrivateFieldGet(this, _Xtream_buildUrl, "f")}get_series_categories`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            yield __classPrivateFieldGet(this, _Xtream_instances, "m", _Xtream_handleErrors).call(this, response);
            return yield response.json();
        });
    }
    /**
     * Fetches the server info.
     * @returns {Promise<Profile>} A promise that resolves to the server info.
     */
    getServerInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${__classPrivateFieldGet(this, _Xtream_buildUrl, "f")}get_server_info`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            yield __classPrivateFieldGet(this, _Xtream_instances, "m", _Xtream_handleErrors).call(this, response);
            return yield response.json();
        });
    }
    /**
     * Fetches the user info.
     * @returns {Promise<Profile>} A promise that resolves to the user info.
     */
    getUserInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${__classPrivateFieldGet(this, _Xtream_buildUrl, "f")}get_user_info`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            yield __classPrivateFieldGet(this, _Xtream_instances, "m", _Xtream_handleErrors).call(this, response);
            return yield response.json();
        });
    }
}
exports.Xtream = Xtream;
_Xtream_baseUrl = new WeakMap(), _Xtream_username = new WeakMap(), _Xtream_password = new WeakMap(), _Xtream_buildUrl = new WeakMap(), _Xtream_instances = new WeakSet(), _Xtream_handleErrors = function _Xtream_handleErrors(response) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response;
    });
};
