package controllers

import (
	"bat188/models"
	"github.com/astaxie/beego"
	"io/ioutil"
	"os"
	//"strconv"
	"time"
)

type MyController struct {
	beego.Controller
}

func (self *MyController) Get() {
	// c.Data["Website"] = "beego.me"
	//self.Data["global.lan"] = "zh-cn"
	self.Data["tranHisCtrl.pageKey"] = "txtStatementSummary"
	self.TplName = "my/main.tpl"
	return
}

func (self *MyController) Betshistory() {
	inputFromDatePicker := self.GetString("inputFromDatePicker")
	inputToDatePicker := self.GetString("inputToDatePicker")

	daysInput, err := self.GetInt("daysInput")

	InputButn, _ := self.GetInt("InputButn")

	if err != nil {
		InputButn = 30
	} else {
		InputButn = daysInput
	}

	// var tm1,tm2 time.Time
	// if daysInput == 30 {
	// 	//从字符串转为时间戳，第一个参数是格式，第二个是要转换的时间字符串

	// 	tm1, _ = time.Parse("02/01/2006", inputFromDatePicker)
	// 	tm2, _ = time.Parse("02/01/2006", inputToDatePicker)
	// }

	bets, m1, m2, err := data.GetMyBets(inputFromDatePicker, inputToDatePicker, daysInput)
	if err != nil {
		beego.Error(err.Error())
	} else {
		self.Data["ubats"] = bets
	}

	self.Data["t1"] = time.Now()
	self.Data["t2"] = time.Now().AddDate(0, 0, -30)
	self.Data["m1"] = m1
	self.Data["m2"] = m2
	self.Data["InputButn"] = InputButn
	self.TplName = "my/betshistory.tpl"
	return
}

func (self *MyController) GetSummaryHistory() {
	// c.Data["Website"] = "beego.me"
	//self.Data["global.lan"] = "zh-cn"
	//self.TplName = "my/main.tpl"
	xxxjson := readFile2("tests/json/GetSummaryHistory.json")
	self.Ctx.WriteString(xxxjson)
	return
}

func (self *MyController) GetMsgCounter() {
	// c.Data["Website"] = "beego.me"
	//self.Data["global.lan"] = "zh-cn"
	//self.TplName = "my/main.tpl"
	xxxjson := readFile2("tests/json/GetMsgCounter.json")
	self.Ctx.WriteString(xxxjson)
	return
}

func (self *MyController) GetAnnouncement() {
	// c.Data["Website"] = "beego.me"
	//self.Data["global.lan"] = "zh-cn"
	//self.TplName = "my/main.tpl"
	xxxjson := readFile2("tests/json/GetMsgCounter.json")
	self.Ctx.WriteString(xxxjson)
	return
}

func readFile2(path string) string {
	fi, err := os.Open(path)
	if err != nil {
		panic(err)
	}
	defer fi.Close()
	fd, err := ioutil.ReadAll(fi)
	return string(fd)
}
