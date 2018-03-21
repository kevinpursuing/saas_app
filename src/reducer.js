// 合并所有reducer 并且返回

import { combineReducers } from 'redux'
import { App } from './container/client/redux/app.redux'

export default combineReducers({ App })