import { request } from '@/utils/request'

// 获取导航连接
export const getNavigates = () => request.post('https://78bnit.lafyun.com:443/get-navigates')

// 提交导航
export const submitNavigate = (data: any) =>
  request.post('https://78bnit.lafyun.com:443/add-navigate', data)

// 获取知乎热榜
export const getZhihuHots = () => request.get('https://78bnit.lafyun.com:443/get-news')

// 获取36k资讯
export const get36kNews = () => request.get('https://78bnit.lafyun.com:443/get-juejin-list')

// 获取bing的图片
export const getBingPic = () => request.get('https://78bnit.lafyun.com:443/get-bing-image')
