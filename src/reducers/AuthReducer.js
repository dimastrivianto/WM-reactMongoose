let init = {
    id: "",
    username: ""
}

export default (state = init, action) => {
    switch(action.type){
        case 'LOGIN_SUCCESS' :
            return {...state, id : action.payload.id, username : action.payload.username}
        case 'LOGOUT_SUCCESS' :
            return {...init}
        //pertama kali jalan saat init
        default :
            return state
    }
}