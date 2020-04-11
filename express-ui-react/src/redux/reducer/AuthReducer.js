const INITIAL_STATE = {
    id : null,
    username : '',
    role : '',
    logged : false
}

export const authReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'LOGIN' :
            return {
                id : action.payload.id,
                username : action.payload.username,
                role : action.payload.role,
                logged : true
            }
        case 'LOGOUT' :
            return INITIAL_STATE
        default :
            return state
    }
}