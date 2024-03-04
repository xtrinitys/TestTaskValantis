import axios from "axios";
import {getDateString, hashText} from "./utils";

function generateToken():string {
  const API_PASS:string = process.env.REACT_APP_PASSWORD || '';
  const date = getDateString(new Date());

  return hashText(`${API_PASS}_${date}`);
}

export function attachAuthorizationHeader():void {
  axios.defaults.headers.post['X-Auth'] = generateToken();
}