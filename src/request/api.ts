import { LoginData } from "@/type/login"
import service from "."

//登录接口
export function login(data:LoginData){
    return service({   //service是传一个promise对象
        url:"/login",
        method:"post",
        data
    })
}

//商品列表接口
export function getGoodsList(){
    return service({   //service是传一个promise对象
        url:"/getGoodsList",
        method:"get",
        
    })
}

//用户列表接口
export function getUserList(){
    return service({   //service是传一个promise对象
        url:"/getUserList",
        method:"get",
        
    })
}

//角色列表接口
export function getRoleList(){
    return service({   //service是传一个promise对象
        url:"/getRoleList",
        method:"get",
        
    })
}

//权限列表接口
export function getAuthorityList(){
    return service({   //service是传一个promise对象
        url:"/getAuthorityList",
        method:"get",
        
    })
}
