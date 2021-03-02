import {request} from '../request'
export function getHome(){
    return request({
        url: '/imglist'
    })
}