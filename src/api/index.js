import request from "../utils/request";


export const gettable = (date) => {
    return request({
        url: '/2025/03/06/get',
        method: 'post',
        data:{
            date:date
        }
    })
}

export const getstudent = (date) => {
    return request({
        url: '/2025/03/06/gettotal',
        method: 'post',
        data:{
            date:date
        }
    })
}