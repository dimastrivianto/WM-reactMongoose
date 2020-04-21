export let onLoginUser = (user) => {
    let {_id, username} = user

    localStorage.setItem('userData', JSON.stringify({_id, username}))

    return {
        type: 'LOGIN_SUCCESS',
        payload : {
            id: user._id,
            username : user.username
        }
    }
}

export let onLogoutUser = () => {
    localStorage.removeItem('userData')

    return {
        type: 'LOGOUT_SUCCESS'
    }
}

