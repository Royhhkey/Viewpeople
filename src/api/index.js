import request from "../utils/request";


export const gettable = (date ,qx) => {
    return request({
        url: '/2025/03/06/get',
        method: 'post',
        data:{
            date:date,
            qx:qx
        }
    })
}

export const getstudent = (date,qx) => {
    return request({
        url: '/2025/03/06/gettotal',
        method: 'post',
        data:{
            date:date,
            qx:qx
        }
    })
}
export const getinactivestudent = (date,qx,dwdm,lbdm) => {
    return request({
        url: '/2025/03/06/getdetail',
        method: 'post',
        data:{
            dwdm:dwdm,
            lbdm:lbdm,
            date:date,
            qx:qx
        }
    })
}

export const getqx =   ()=>{
    return request({
        url: '/2025/03/06/getqx',
        method: 'post',
    })
}