package controllers

import (
	"github.com/astaxie/beego"
	"io/ioutil"
	"os"
	"strconv"
	"time"
)

type CurrentTimeController struct {
	beego.Controller
}

func readFile1(path string) string {
	fi, err := os.Open(path)
	if err != nil {
		panic(err)
	}
	defer fi.Close()
	fd, err := ioutil.ReadAll(fi)
	return string(fd)
}

func (self *CurrentTimeController) Get() {
	// c.Data["Website"] = "beego.me"
	// c.Data["Email"] = "astaxie@gmail.com"
	// c.TplName = "index.tpl"
	now := time.Now().Unix()
	var sss string
	sss = strconv.FormatInt(now, 10)
	self.Ctx.WriteString(sss)
	return
}

func (self *CurrentTimeController) EventDetailsPrioritised() {
	xxxjson := readFile1("tests/json/eventDetailsPrioritised.json")
	self.Ctx.WriteString(xxxjson)
	return
}

func (self *CurrentTimeController) GetIncidentFeedPrioritised() {
	xxxjson := readFile1("tests/json/getIncidentFeedPrioritised.json")
	self.Ctx.WriteString(xxxjson)
	return
}

func (self *CurrentTimeController) GetEventCoverage() {
	xxxjson := readFile1("tests/json/getEventCoverage.json")
	self.Ctx.WriteString(xxxjson)
	return
}
