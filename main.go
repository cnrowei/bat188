package main

import (
	"bat188/models"
	_ "bat188/routers"
	"encoding/json"
	"io/ioutil"
	"net"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	_ "github.com/go-sql-driver/mysql"
)

func init() {
	/*
		ip := "118.193.197.211"
		if ip != getip() {
			beego.Error("发生错误...数据不正常,请删除硬盘数据")
			return
		}*/

	data.RegisterDB()

	//orm.RegisterDriver("mysql", orm.DRMySQL)
	//orm.RegisterDataBase("default", "mysql", "root:ishgishg@/bat188?charset=utf8")
}

func main() {

	//o := orm.NewOrm()
	//o.Using("default")

	//beego.Error(getip())

	orm.Debug = false
	orm.RunSyncdb("default", false, false)
	//添加默认的数据
	//data.AddDate()
	//service.AddDateGames()
	beego.SetStaticPath("/tests", "tests")
	beego.SetStaticPath("/188BetFlash-phase3", "188BetFlash-phase3")
	beego.SetStaticPath("/public", "public")
	beego.SetStaticPath("/Public", "public")

	lottery168879()

	api168()

	heyispig()

	startTimer(func() {
		addlottery()
		beego.Error("计算下一个零点.自动添加第二天赛事", time.Now())
	})

	//模板函数
	beego.AddFuncMap("getWinOrLose", data.GetWinOrLose)
	beego.AddFuncMap("unixtoTimeStr", data.UnixtoTimeStr)
	beego.AddFuncMap("getand", data.GetAnd)
	beego.AddFuncMap("getds", data.GetDS)
	beego.AddFuncMap("getlh", data.GetLH)
	beego.AddFuncMap("getdx", data.GetDX)
	beego.AddFuncMap("getwdx", data.GetWDX)
	beego.AddFuncMap("getadd0", data.Add0)
	beego.Run()

}

func getip() string {
	conn, err := net.Dial("udp", "www.baidu.com:80")
	if err != nil {
		beego.Error(err.Error())
	}
	defer conn.Close()

	return strings.Split(conn.LocalAddr().String(), ":")[0]
}

func api168() {
	str := "http://kj.168api.com/Open/CurrentOpenOne?code=1005"

LABLE:
	resp, err := http.Get(str) //使用get方法访问
	if err != nil {
		beego.Error(err.Error())
		return
	}

	defer resp.Body.Close()
	input, err1 := ioutil.ReadAll(resp.Body) //读取流数据
	if err1 != nil {
		beego.Error(err.Error())
	}

	var a168 Api168
	err = json.Unmarshal(input, &a168)
	if err != nil {
		beego.Error(err.Error())
	}

	if len(a168.C_r) != 0 {

		//判断输赢
		data.Upbatlist(a168.C_t, a168.C_r)

		//更新数据
		data.AddGameLr(a168.C_t, a168.C_r)

		beego.Error("Success:reader json ", a168.C_r)
	} else {
		beego.Error("error:json nil,go to reader")
		goto LABLE
	}

}

func lottery168879() {

	str := "http://www.168879.com/Open/CurrentOpen?code=1005"

	resp, err := http.Get(str) //使用get方法访问
	if err != nil {
		beego.Error(err.Error())
		return
	}

	defer resp.Body.Close()
	input, err1 := ioutil.ReadAll(resp.Body) //读取流数据
	if err1 != nil {
		beego.Error(err.Error())
	}

	var lot Lot

	err = json.Unmarshal(input, &lot)
	if err != nil {
		beego.Error(err.Error())
	}

	if len(lot.L_r) != 0 {

		for _, v := range lot.List {
			/*
				var a []string
				for _, k := range v.O_m {
					switch k.(type) {
					case int:
						a = append(a, strconv.Itoa(int(k.(int))))
					case string:
						a = append(a, k.(string))
					}

				}
				aa := v.C_r + "," + strings.Join(a, ",")
			*/
			//lr := []int{}
			data.Upbatlist(v.C_t, v.C_r)

			// list := strings.Split(v.C_r, ",")
			// for _, k := range list {
			// 	sss, err := strconv.ParseInt(k, 10, 32)
			// 	if err != nil {
			// 		beego.Error(err.Error())
			// 	}

			// 	lr = append(lr, i)
			// 	beego.Error(sss)
			// }

			data.AddGameLr(v.C_t, v.C_r)
			beego.Error("Get_JSON", time.Now())
		}
	}
}

func heyispig() {
	ticker := time.NewTicker(time.Millisecond * 1000)
	beego.Error("--------", time.Millisecond*1000)
	go func() {
		for _ = range ticker.C {
			beego.Error("HZY IS PIG....", time.Now())
			now := time.Now()
			s := now.Minute()
			ss := now.Second()

			if s == 00 || s == 10 || s == 20 || s == 30 || s == 40 || s == 50 && ss == 33 {
				ticker.Stop()
				ok10timer()
				//ticker = time.NewTicker(time.Minute * 1)
			}

		}
	}()
}

//程序对整时间后，每10分钟读取一次数据
func ok10timer() {
	ticker := time.NewTicker(time.Minute * 1)
	go func() {
		for _ = range ticker.C {

			api168()
		}
	}()
}

//启动的时候执行一次，以后每天晚上12点执行，怎么实现
func startTimer(f func()) {
	go func() {
		for {
			f()
			now := time.Now()
			// 计算下一个零点
			next := now.Add(time.Minute * 24)
			//beego.Error("next11", next)
			next = time.Date(next.Year(), next.Month(), next.Day(), 0, 0, 0, 0, next.Location())
			next = next.AddDate(0, 0, 1)
			durmi, _ := time.ParseDuration("2m")
			next = next.Add(durmi)

			//beego.Error("next22", next.Sub(now))
			t := time.NewTimer(next.Sub(now))
			<-t.C
		}
	}()
}

func addlottery() {
	cn := "湖南快乐十分"
	en := "Hunan Happy Very"

	var t int64 //期数编号
	var strt string
	var edt time.Time

	now := time.Now()
	ts := time.Date(now.Year(), now.Month(), now.Day(), 9, 0, 30, 0, time.Local)

	strt = ts.Format("20060102000")
	t, _ = strconv.ParseInt(strt, 10, 64)

	durmi, _ := time.ParseDuration("+10m")
	for i := 1; i <= 84; i++ {

		edt = ts.Add(durmi)
		ts = edt

		//tss := edt.Unix()
		//beego.Error(edt.Unix())
		t++
		data.AddDateGame(cn, en, edt.Unix(), t)
		//service.AddDateGames(cn, en, edt, t)
		//service.AddDateGame(cn, en, t)
	}
}

type Api168 struct {
	C_t int64  `json:"c_t"`
	C_r string `json:"c_r"`
}

type Lot struct {
	S    int
	M    string
	C    string
	L_c  int
	L_t  int
	L_d  string
	L_r  string
	C_t  int
	C_d  string
	N_t  int
	N_d  string
	List []Lotlist
}

type Lotlist struct {
	C_t int64
	C_d string
	C_r string
	O_m []interface{}
}
