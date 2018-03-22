import { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'
const config = require('../config/config')

@withRouter
@connect(
    null,
)

class AuthRoute extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount = () => {
        let pathName = this.props.location.pathname
        let code = this.props.location.search.split("?code=")
        let appId = pathName.split("/")[2]
        let uId
        code = code[1]
        console.log(appId)
        console.log(code)
        var strCookie = document.cookie;
        var arrCookie = strCookie.split("; ");
        for (var i = 0; i < arrCookie.length; i++) {
            var arr = arrCookie[i].split("=");
            if ('uId' === arr[0]) {
                uId = arr[1];
            }
        }
        console.log(uId)
        if (uId) {   //若是有uId
            axios.get('/api/wechat/getUserInfo?&appId=' + appId)
                .then(res => {
                    console.log(res)
                })
        } else {   //若是没有uId
            //判断有没有code
            if (!code) {
                // 若是没有，跳转到获取code路由
                window.location = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + config.appid + '&redirect_uri=http://app.jserk.com' + pathName + '&response_type=code&scope=' + config.scope + '&state=STATE#wechat_redirect'

            } else {// 若是有code，让后端请求微信获取用户信息
                axios.get('/api/wechat/getUserInfo?code=' + code + "&appId=" + appId)
                    .then(res => {
                        console.log(res)
                    })
            }
        }

    }
    render() {
        return null
    }
}

export default AuthRoute