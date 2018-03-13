package controllers

import (
	"bat188/models"
	//"encoding/json"
	"github.com/astaxie/beego"
	//"github.com/astaxie/beego/orm"
	//"github.com/astaxie/beego/context"
	"io/ioutil"
	"os"
	"strconv"
	"strings"
	"time"
)

type ServiceController struct {
	beego.Controller
}

/*
读取文件信息
*/
func readFile(path string) string {
	fi, err := os.Open(path)
	if err != nil {
		panic(err)
	}
	defer fi.Close()
	fd, err := ioutil.ReadAll(fi)
	return string(fd)
}

func (self *ServiceController) Get() {
	//self.Data["Website"] = "beego.me"
	//self.Data["Email"] = "astaxie@gmail.com"
	//self.TplName = "index.tpl"
}

//读取分类数据
func getSelobj(sportID int64) (selobj map[string]interface{}, err error) {
	selobj = map[string]interface{}{
		"pid":  0,
		"isp":  false,
		"spt":  6,
		"sptn": "lottery",
		"evt":  1620113,
		"cids": "28933",
		"dp":   -1, //直播是否关闭
		"favT": 0,  //是否开启favT模式
		"btp":  "default",
		"uibt": "",
		"edt":  "05/Aug/2016",
		"isfd": false,
		"ip":   false, //滚球
		"ipo":  false,
		"ifl":  true, //窗口大小
	}
	return selobj, nil
}

func getE(gm data.Games) map[string]interface{} {

	no, _ := data.GetN_O(gm.Id, gm.Edt)
	edt := data.UnixtoTime(gm.Edt)

	otime := gm.Edt - time.Now().Unix()
	//t1 := edt.Sub(time.Now())
	//t1.String()
	//lot := edt.Sub(time.Now()).

	//tss := time.Date(time.Now().Year(), time.Now().Month(), time.Now().Day(), 0, 0, 0, 0, time.Local)
	//sss := tss.Add(lot)

	//h := strconv.Itoa(sss.Hour())
	//m := strconv.Itoa(sss.Minute())
	//s := strconv.Itoa(sss.Second())

	sb, t1, t2 := data.GetSb()

	e := map[string]interface{}{
		"hide": false,
		"egn":  "",
		"k":    gm.Id,
		"heid": 0,
		"l":    0,
		"pts":  []interface{}{},
		"ibs":  true,
		"ibsc": true,
		"cel":  []interface{}{},
		"cei":  map[string]interface{}{"ctid": 0, "n": ""},
		"pk":   gm.Id,
		"ihe":  false,
		"g":    "",
		"edt":  gm.Edt,
		"pvdr": "p",
		"mts":  15,
		"o":    []interface{}{},
		"n-o":  no,
		"i": []interface{}{
			"" + strconv.FormatInt(int64(t2), 10) + "期",
			"" + strconv.FormatInt(int64(t1), 10) + "期",
			"9",
			"True",
			"" + edt.Format("2006年01月02日") + "",
			//"" + m + ":" + s + "",
			"" + strconv.FormatInt(int64(otime), 10) + "",
			"True",
			//"" + h + ":",
			"",
			"",
			"",
			"",
			"",
			"",
			"",
			"",
			"",
			"",
			"",
			"",
			"",
			"",
			"",
			"",
			"",
			"",
			"",
			"",
			"",
			"",
			"",
			"",
			"",
			"9",
			"",
			"",
			"",
			"Ufa-U21-vs-Zenit-St-Petersburg-U21",
			"8",
			"True"},

		"sb": map[string]interface{}{
			"s":   6,
			"cp":  "s8",
			"t":   "00:00",
			"a":   0,
			"h":   1,
			"adv": -1,
			"ps":  sb,
		},
	}
	return e
}

func getC(gm data.Games) map[string]interface{} {

	c := map[string]interface{}{
		"k":     gm.Id,
		"n":     gm.Cn,
		"ec":    0,
		"hasor": false,
		"e":     []interface{}{getE(gm)},
	}
	return c
}

func getD() map[string]interface{} {

	gm, _ := data.GetGame(1)

	//beego.Error(gm.Id)
	fb, _ := data.GetFb(gm.Id)

	d := map[string]interface{}{
		"k":  6,
		"tn": "zh-cn:inplay",
		"v":  0,
		"c":  []interface{}{getC(*gm)},
		"n":  "彩票",
		"en": "lottery",
		"fb": fb,
	}
	return d
}

func getMdb() map[string]interface{} {
	mdb := map[string]interface{}{
		"d":  getD(),
		"v":  33273,
		"ec": 0,
		"t":  1,
		"r":  90,
	}
	return mdb
}

func getLpd() (lpd map[string]interface{}, err error) {
	clumn, err := data.GetColumn()

	fe := map[string]interface{}{
		"progms": []interface{}{},
	}

	ips := map[string]interface{}{
		"ismd": []interface{}{},
		"v":    4663,
	}

	ssm := map[string]interface{}{
		"ssmd": []interface{}{},
		"v":    4663,
	}

	sm := map[string]interface{}{
		"fe":  fe,
		"smd": clumn,
		"v":   4663,
		"fv":  5062,
		"mc":  []interface{}{},
	}

	lpd = map[string]interface{}{
		"sm":   sm,
		"ips":  ips,
		"ssm":  ssm,
		"tipc": 3,
		"tssc": 21,
	}
	return lpd, err
}

//获取数据
func (self *ServiceController) CentralService() {

	//service.GetBatstemporary(1)
	// isFirstLoad := self.Input().Get("IsFirstLoad")
	// versionL := self.Input().Get("VersionL")
	// versionU := self.Input().Get("VersionU")
	// versionF := self.Input().Get("VersionF")
	// versionT := self.Input().Get("VersionT")
	// versionH := self.Input().Get("VersionH")
	// versionS := self.Input().Get("VersionS")

	// isEventMenu := self.Input().Get("IsEventMenu")
	// sportID := self.Input().Get("SportID")
	// competitionID := self.Input().Get("CompetitionID")

	reqUrl := self.Input().Get("reqUrl")
	// oIsInplayAll := self.Input().Get("oIsInplayAll")
	// oIsFirstLoad := self.Input().Get("oIsFirstLoad")
	// oSortBy := self.Input().Get("oSortBy")
	// oOddsType := self.Input().Get("oOddsType")
	// oPageNo := self.Input().Get("oPageNo")

	if strings.Contains(reqUrl, "lottery") {
		//用户
		uvd := map[string]interface{}{
			"login":  true,
			"ov":     2,
			"sb":     1,
			"urView": "ASIAN",
			"efloat": true,
			"pds":    1,
			"showls": false,
			"nol":    1,
			"iarf":   true,
		}

		lpc := map[string]interface{}{
			"sm":  0,
			"smv": 2,
			"imv": 1,
			"ssv": 2,
		}

		mpc := map[string]interface{}{
			"pv": 2,
		}

		selobj, err := getSelobj(6)

		if err != nil {
			beego.Error(err)
		}

		lpd, err := getLpd()

		if err != nil {
			beego.Error(err)
		}

		self.Data["json"] = map[string]interface{}{
			"selobj": selobj,
			"uvd":    uvd,
			"lpc":    lpc,
			"mpc":    mpc,
			"lpd":    lpd,
			"mbd":    getMdb(),
		}
		self.ServeJSON()
	} else if strings.Contains(reqUrl, "football") {
		xxxjson := readFile("tests/json/关闭TV.json")
		self.Ctx.WriteString(xxxjson)
	}

	return
}

//https://sb.my188.com/zh-cn/Service/BetSlipService?
//GetBySelectionId&
//SelList=1119534677
//&EventList=1617093
//&OddsList=9.00
//&HdpList=null
//&ScoreList=null%3Anull
//&SStakeList=0
//&InplayList=false
//&ParentEventList=1617093
//&_=1470371001205

//
func (self *ServiceController) BetSlipService() {

	// r := new(http.Request)
	// r.ParseForm()

	urls := self.Ctx.Input.URI()
	//m, _ := url.ParseQuery(u.RawQuery)

	//beego.Error(m)

	//下注的ID
	selList := self.Input().Get("SelList")

	//比赛的ID
	//eventList := self.Input().Get("EventList")

	//下注的赔率
	//oddsList := self.Input().Get("OddsList")

	//hdpList := self.Input().Get("HdpList")

	//scoreList := self.Input().Get("ScoreList")

	sstakeList := self.Input().Get("SStakeList")

	//inplayList := self.Input().Get("InplayList")

	//parentEventList := self.Input().Get("ParentEventList")

	if strings.Contains(urls, "GetBySelectionId") || strings.Contains(urls, "GetRemainSelectionId") {

		battemp, err := data.GetBatstemporary(selList, sstakeList)
		if err != nil {
			beego.Error(err.Error())
		}

		self.Data["json"] = map[string]interface{}{
			"bo":    0,
			"berr":  6666,
			"cno":   0,
			"islog": true,
			"issa":  false,
			"isca":  false,
			"cc":    "RMB",
			"ot":    2,
			"l":     "CHS",
			"k":     false,
			"ko":    false,
			"abo":   false,
			"sbc":   true,
			"bal":   301.7399,
			"s":     battemp,
			"c":     []interface{}{},
			"cinfo": []interface{}{
				map[string]interface{}{"cbn": "单注", "wid": 1, "cbs": map[string]interface{}{"bmin": 0, "bmax": 0, "bpay": 0}, "cba": 1},
			},
			//"info": "BS_ClosedMarket",
		}

	} else if strings.Contains(urls, "PlaceBetNew") {

		singleList := self.Input().Get("SingleList")

		bats, info, err := data.SetBats(singleList)
		if err != nil {
			beego.Error(err.Error())
		}

		if info != "" {
			info = "BS_ClosedMarket"
		} else {
			info = "BS_Bet_Successed"
		}

		self.Data["json"] = map[string]interface{}{
			"bo":    0,
			"berr":  9999,
			"cno":   0,
			"islog": true,
			"issa":  true,
			"isca":  false,
			"cc":    "RMB",
			"ot":    2,
			"l":     "CHS",
			"k":     false,
			"ko":    false,
			"abo":   false,
			"sbc":   true,
			"bal":   301.7399,
			"s":     bats,
			"c":     []interface{}{},
			"cinfo": []interface{}{
				map[string]interface{}{"cbn": "单注", "wid": 1, "cbs": map[string]interface{}{"bmin": 0, "bmax": 0, "bpay": 0}, "cba": 1},
			},
			"dt":   "08/11/2016 07:36:07.294",
			"info": info,
		}

		//1@19@第一球@0:0@500@false@19@1@true@1_2@19@第一球@0:0@500@false@19@1@true@1
		//289@1.95@龙虎@0:0@100@false@1.95@9@true@9_290@1.95@龙虎@0:0@100@false@1.95@9@true@9
		/*
			xxxjson := readFile("tests/json/test.json")
			self.Ctx.WriteString(xxxjson)
			return*/
	}
	self.ServeJSON()
	return
}

func (self *ServiceController) MyBetService() {
	//xxxjson := readFile("tests/json/投注记录_已确认.json")
	//xxxjson := readFile("tests/json/投注记录_已确认.json")
	//self.Ctx.WriteString(xxxjson)

	self.Data["json"], _ = data.GetMyBet()
	self.ServeJSON()
	return
}

func (self *ServiceController) LiveTv() {
	// urls := self.Ctx.Input.URI()
	// if strings.Contains(urls, "GetLiveEventDetails") {
	// 	xxxjson := readFile("tests/json/LiveTv?GetLiveEventDetails.json")
	// 	self.Ctx.WriteString(xxxjson)
	// } else if strings.Contains(urls, "GetLiveStramProvider") {
	// 	xxxjson := readFile("tests/json/LiveTv?GetLiveStramProvider.json")
	// 	self.Ctx.WriteString(xxxjson)
	// 	//LiveTv?GetLiveStramProvider.json
	// } else {
	// 	self.TplName = "livetv.tpl"
	// }
	self.TplName = "livetv.tpl"
	return
}

func (self *ServiceController) Webserver() {
	self.Ctx.WriteString("OK(Webserver)")
	return
}
