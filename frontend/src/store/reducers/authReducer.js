const initState = {
    authError: null
}
const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SIGNIN_SUCCESS':
            console.log('login success')
            return {
                ...state,
                authError: 'Login success'
            }
        case 'SIGNIN_ERROR':
            console.log('login error')
            return {
                ...state,
                authError: 'Login Failed'
            }
        case 'SIGNOUT_SUCCESS':
            console.log('signout success');
            return {
                state
            }
        case 'SIGNUP_SUCESS':
            console.log('signup success')
            return {
                ...state,
                authError: null
            }
        case 'SIGNUP_ERROR':
            console.log('signup error: ', action.err.message)
            return {
                ...state,
                authError: action.err.message
            }
        default:
            return state
    }
}
export default authReducer