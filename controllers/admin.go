package controllers

import (
	"github.com/astaxie/beego"
)

type AdminController struct {
	beego.Controller
}

func (self *AdminController) Get() {
	self.Data["Website"] = "bet188"
	self.Data["Email"] = "bet188@gmail.com"
	self.TplName = "admin/index.tpl"
}

func (self *AdminController) Login() {
	self.TplName = "admin/login.tpl"
}

func (self *AdminController) Column() {
	self.TplName = "admin/column.tpl"
}
