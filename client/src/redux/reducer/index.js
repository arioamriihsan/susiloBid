import { combineReducers } from 'redux'
import { authReducer } from './AuthReducer'
import { ModalReducer } from './ModalReducer'

export default combineReducers({
    auth : authReducer,
    modal : ModalReducer
})