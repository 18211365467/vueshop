import Axios from 'axios'
export function request(config){
    //const auth = vue.prototype.$auth
    const intance =Axios.create({
        baseURL:'http://tpadmin.test/api',
        timeout:'5000'
    })

    //请求拦截
    intance.interceptors.request.use(config=>{
        //config.headers.Authorization = auth.getAuthorization()
        return config
    },
        err=>{
             console.log(err+'请求拦截报错')
        }
    )
    intance.interceptors.response.use(res=>{
        return res.data
    },
        err=>{
            console.log(err+'响应拦截报错')
        }
    )
    return intance(config)
}