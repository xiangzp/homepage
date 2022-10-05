import { request } from "../utils/request";

export function getBingImage() {
  return request.get(
    "https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN"
  );
}
