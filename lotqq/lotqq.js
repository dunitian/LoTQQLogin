(function ($) {
    $.lotqq = function (lotAppId, lotUrl, lotDocId, lotFun) {
        window.console.log('LoTQQLogin V1.0 By dunitian QQ:1054186320 WebSite:dnt.dkill.net');
        $(document).ready(function () {
            var lotdomstr = "#" + lotDocId + "";
            $(lotdomstr).html('<a href="https://graph.qq.com/oauth2.0/authorize?client_id=' + lotAppId + '&amp;response_type=token&amp;scope=all&amp;redirect_uri=' + lotUrl + '"><img src="http://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png" alt="QQ登录" border="0"></a>');
            //QQSDK
            QC.Login({
            }, function (reqData, opts) {
                var dom = $(lotdomstr),
                _logoutTemplate = [
                    '<span><img src="{figureurl}" class="{size_key}"/></span>',
                    '<span>{nickname}</span>',
                    '<span><a href="javascript:QC.Login.signOut();">退出</a></span>'
                ].join("");
                dom && (dom.html(QC.String.format(_logoutTemplate, { nickname: QC.String.escHTML(reqData.nickname), figureurl: reqData.figureurl })));
                if (QC.Login.check()) {
                    QC.api("get_user_info")
                        .success(function (s) {
                            QC.Login.getMe(function (openId, accessToken) {
                                var data = { Name: s.data.nickname, OpenId: openId, AccessToken: accessToken, Figureurl: s.data.figureurl };
                                lotFun(data);
                            })
                        })
                        .error(function (f) {
                            alert("登录失败！请重试");
                        })
                        .complete(function (c) {
                            //完成请求回调
                        });
                }
            }, function (opts) {
                alert('QQ登录 注销成功');
                window.location.href = '/';
            }
);
        })
    };
})(jQuery);