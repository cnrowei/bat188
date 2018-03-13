package controllers

import (
	//"bat188/models"
	//"encoding/json"
	"bat188/models"
	"encoding/base64"
	"github.com/astaxie/beego"
	qrcode "github.com/skip2/go-qrcode"
	//"github.com/astaxie/beego/context"
	//"io/ioutil"
	//"os"
	//"strings"
	//"strconv"
)

type LotteryController struct {
	beego.Controller
}

func (self *LotteryController) Get() {
	//self.Data["Website"] = "beego.me"
	//self.Data["Email"] = "astaxie@gmail.com"
	self.Data["domain"] = beego.AppConfig.String("domain")
	self.TplName = "lottery.tpl"
}

//赛果
func (self *LotteryController) Results() {
	//self.Data["Website"] = "beego.me"
	//self.Data["Email"] = "astaxie@gmail.com"
	//self.Data["domain"] = beego.AppConfig.String("domain")
	games, err := data.GetGameslist()
	if err != nil {
		beego.Error(err.Error())
	}

	self.Data["games"] = games
	self.TplName = "results.tpl"
}

//规则
func (self *LotteryController) Rules() {
	//self.Data["Website"] = "beego.me"
	//self.Data["Email"] = "astaxie@gmail.com"
	self.Data["domain"] = beego.AppConfig.String("domain")
	self.TplName = "rules.tpl"
}

func (self *LotteryController) Print() {
	//self.Data["Website"] = "beego.me"
	//self.Data["Email"] = "astaxie@gmail.com"

	idlists := self.GetString("ids")
	ubats, err := data.GetBetPrint(idlists)

	var png []byte
	png, err = qrcode.Encode("http://"+beego.AppConfig.String("domain")+"/zh-cn/sports/lottery/competition/finds?ids="+idlists, qrcode.High, 150)
	if err != nil {
		beego.Error(err.Error())
	}

	// dist := make([]byte, 50000) //开辟存储空间
	// base64.StdEncoding.Encode(dist, png)
	self.Data["ubats"] = ubats
	self.Data["qrcode"] = base64.StdEncoding.EncodeToString(png)
	self.Data["title"] = ubats[0].G.Cn
	self.Data["qs"] = ubats[0].G.T
	self.Data["time"] = data.UnixtoTime(ubats[0].G.Edt).Format("2006-01-02 15:04")
	self.TplName = "print.tpl"
}

func (self *LotteryController) Finds() {

	idlists := self.GetString("ids")
	ubats, err := data.GetBetPrint(idlists)
	if err != nil {
		beego.Error(err.Error())
	}
	// dist := make([]byte, 50000) //开辟存储空间
	// base64.StdEncoding.Encode(dist, png)
	self.Data["ubats"] = ubats
	self.Data["title"] = ubats[0].G.Cn
	self.Data["qs"] = ubats[0].G.T
	self.Data["time"] = data.UnixtoTime(ubats[0].G.Edt).Format("2006-01-02 15:04")
	self.TplName = "my/finds.tpl"
}
