 export interface ListInt{
    id:number,
    nickName:string,
    role:RoleInt[],
    introduce:string
}

interface RoleInt{
    role:number,
    roleName:string
}
interface SelectDataInt{
    role:number,
    nickName:string
}
interface RoleListInt{
    authority: number[]
    roleId: number
    roleName: string
}
interface ActiveInt{
    id:number,
    nickName:string,
    role:number[],
   // introduce:string
}

export class InitData{
    list:ListInt[] = [] //用来接受用户信息的列表
    roleList:RoleListInt[] = [] //用来接受角色信息的列表
    selectData:SelectDataInt={
      nickName:"",
      role:0
    }
    isShow=false
    active:ActiveInt={ //选中的对象
        id:0,
        nickName:"",
        role:[],
       // introduce:""    
    }
}