import request from "../utils/request";


export const getdata = (date) => {
    return request({
        url: '/2025/03/06/get',
        method: 'post',
        data:{
            date:date
        }
    })
}