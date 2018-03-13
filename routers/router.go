package routers

import (
	"bat188/controllers"
	"github.com/astaxie/beego"
)

func init() {
	//beego.ErrorHandler("404", page_not_found)
	beego.ErrorController(&controllers.ErrorController{})

	beego.Router("/", &controllers.MainController{})
	beego.Router("/zh-cn/Service/CentralService", &controllers.ServiceController{}, "post:CentralService")
	beego.Router("/zh-cn/Service/BetSlipService", &controllers.ServiceController{}, "*:BetSlipService")
	beego.Router("/zh-cn/Service/MyBetService", &controllers.ServiceController{}, "get:MyBetService")

	beego.Router("/zh-cn/Service/LiveTv", &controllers.ServiceController{}, "get:LiveTv")
	beego.Router("/dynaTraceMonitor", &controllers.ServiceController{}, "post:Webserver")
	beego.Router("/zh-cn/sports/lottery", &controllers.LotteryController{})

	beego.Router("/zh-cn/rules/sports", &controllers.LotteryController{}, "get:Rules")
	beego.Router("/zh-cn/sports/results", &controllers.LotteryController{}, "get:Results")

	beego.Router("/zh-cn/sports/lottery/competition/print", &controllers.LotteryController{}, "get:Print")
	beego.Router("/zh-cn/sports/lottery/competition/finds", &controllers.LotteryController{}, "get:Finds")

	beego.Router("/zh-cn/sports/:sportNa/:name1/:name2", &controllers.LotteryController{})
	beego.Router("/zh-cn/sports/:sportNa/:name1/:name2/:name3", &controllers.LotteryController{})
	beego.Router("/zh-cn/sports/lottery/competition/full-time-asian-handicap-and-over-under", &controllers.LotteryController{})

	//beego.Router("/betstream-view/188bet-flash-sc/getIncidentFeedPrioritised", &controllers.CurrentTimeController{}, "get:GetIncidentFeedPrioritised")
	//beego.Router("/betstream-view/188bet-flash-sc/eventDetailsPrioritised", &controllers.CurrentTimeController{}, "get:EventDetailsPrioritised")

	beego.Router("/betstream-view/getEventCoverage", &controllers.CurrentTimeController{}, "get:GetEventCoverage")
	beego.Router("/betstream-view/getCurrentTime", &controllers.CurrentTimeController{})

	//beego.Router("/zh-cn/my-account/statement/transaction-history/summary", &controllers.MyController{})
	//beego.Router("/zh-cn/my-account/statement/betting-history/lotto/settled-bets", &controllers.MyController{})

	beego.Router("/service/myaccounttapi/GetSummaryHistory", &controllers.MyController{}, "get:GetSummaryHistory")
	beego.Router("/service/MsgHubApi/GetMsgCounter", &controllers.MyController{}, "get:GetMsgCounter")
	beego.Router("/service/msghubapi/getAnnouncement", &controllers.MyController{}, "get:GetAnnouncement")

	beego.Router("/zh-cn/sports/lottery/competition/settled-bets", &controllers.MyController{}, "*:Betshistory")

	//beego.Router("/signalr/hubs", &controllers.MyController{}, "get:Hubs")
	beego.Router("/admin", &controllers.AdminController{})
	beego.Router("/admin/login", &controllers.AdminController{}, "get:Login")

	//栏目
	beego.Router("/admin/column", &controllers.AdminController{}, "get:Column")
}

/*
func page_not_found(rw http.ResponseWriter, r *http.Request) {
	t, _ := template.New("404.html").ParseFiles(beego.ViewsPath + "/404.html")
	data := make(map[string]interface{})
	data["content"] = "page not found"
	t.Execute(rw, data)
}
*/
