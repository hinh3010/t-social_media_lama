import { format } from "timeago.js";

export const PF = process.env.REACT_APP_PUBLIC_FOLDER || 'http://localhost:8800/images/';
export const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:8800/api/';
export const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'ws://localhost:8900';
export const dateFormat = (date) => format(date)