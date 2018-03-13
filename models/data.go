package data

import (
	//"encoding/json"
	//"github.com/bitly/go-simplejson"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	_ "github.com/go-sql-driver/mysql"
	"strconv"
	"strings"
	"time"
)

type Users struct {
	Id            int64
	Username      string `orm:"index"`
	Password      string `orm:"index"`
	Email         string `orm:"index"`
	Money         float64
	Created       int64            `orm:"index"`
	Updated       int64            `orm:"index"`
	Batstemporary []*Batstemporary `orm:"reverse(many)"`
	Batlist       []*Batlist       `orm:"reverse(many)"`
}

type Uvd struct {
	Id     int64
	Login  bool
	Ov     int
	Sb     int
	Urview string
	Efloat bool
	Pds    int
	Showls bool
	Nol    int
	Iarf   int
}

//bat栏目 Smd#
type Column struct {
	Id     int64    `json:"sid"`
	CnName string   `json:"sn"`
	EnName string   `json:"sen"`
	Mt     int64    `json:"mt"`
	Son    int64    `json:"son"`
	Tc     int      `json:"tc"` //今日塞事
	Tmrc   int      `json:"tmrc"`
	Ipc    int      `json:"ipc"` //滚球塞事
	Ec     int      `json:"ec"`
	Psc    int      `json:"psc"` //所有塞事
	Orc    int      `json:"orc"`
	Puc    string   `json:"puc"`
	G      []*Games `orm:"reverse(many)"`
}

//赛事的模板属性
type D struct {
	Id int64
	Cn string
	En string
	V  int
	Tn string //栏目模板名称
	Bt string
}

//栏目下面赛事,JSON#E
type Games struct {
	Id            int64
	Did           int64 //那套模板
	Cn            string
	En            string
	Hide          bool
	Heid          int
	L             int
	Ibs           bool
	Ibsc          bool
	Ihe           bool
	G             string
	I             string
	Edt           int64 `orm:"index"` //时间搓
	Pvdr          string
	Mts           int
	Wr            bool             //是否已经开奖了
	Lr            string           //开奖的号码"9,13,19,16,2,14,15,11"
	T             int64            //期数，自定义
	C             *Column          `orm:"rel(fk)"` //所属的栏目
	Odds          []*Odds          `orm:"reverse(many)"`
	Batstemporary []*Batstemporary `orm:"reverse(many)"`
	Batlist       []*Batlist       `orm:"reverse(many)"`
}

//下注的赔率分类，第一球，第二球，龙虎等 JSON#N
type Odds struct {
	Id            int64
	Cn            string
	En            string
	Mo            int64            //排序
	F             string           //分类字符
	Mn            string           //
	O             string           //类型1
	No            string           //类型2
	G             *Games           `orm:"rel(fk)"` //所属的栏目
	L             []*Oddslist      `orm:"reverse(many)"`
	Batstemporary []*Batstemporary `orm:"reverse(many)"`
	Batlist       []*Batlist       `orm:"reverse(many)"`
}

//赔率分类下的详细单赔率
type Oddslist struct {
	Id            int64
	Cn            string
	En            string
	Od            float64          //赔率
	Odds          *Odds            `orm:"rel(fk)"` //所属的下注类型
	Batstemporary []*Batstemporary `orm:"reverse(many)"`
	Batlist       []*Batlist       `orm:"reverse(many)"`
}

//下注临时列表
type Batstemporary struct {
	Id      int64
	Osname  string
	Olname  string
	U       *Users    `orm:"rel(fk)"`
	G       *Games    `orm:"rel(fk)"`
	O       *Odds     `orm:"rel(fk)"`
	Ol      *Oddslist `orm:"rel(fk)"`
	Created int64     `orm:"index"`
}

//确认下注的列表
type Batlist struct {
	Id      int64
	U       *Users    `orm:"rel(fk)"`
	G       *Games    `orm:"rel(fk)"`
	O       *Odds     `orm:"rel(fk)"`
	Ol      *Oddslist `orm:"rel(fk)"`
	S       float64   //下注额
	Od      float64   //下注赔率
	L       bool      //是否已结算
	Nr      bool      //是否已确认--是true未确认，false已确认
	Wr      int       //输赢平
	Created int64     `orm:"index"`
}

//创建数据库
func RegisterDB() {
	// 需要在init中注册定义的model
	orm.RegisterModel(new(Users), new(Column), new(Games), new(Odds), new(Oddslist), new(Batstemporary), new(Batlist))
	orm.RegisterDriver("mysql", orm.DRMySQL)
	//orm.DefaultTimeLoc = time.Local
	orm.RegisterDataBase("default", "mysql", "root:"+beego.AppConfig.String("mysqlpassword")+"@/bat188?charset=utf8")
}

//栏目下面菜单
type Fb struct {
	Tx string `json:"tx"`
	Ex string `json:"ex"`
}

//JSON C 数据
type C struct {
	K     int64  `json:"k"`
	N     string `json:"n"`
	Ec    int64  `json:"ec"`
	Hasor bool   `json:"hasor"`
	E     []*E   `json:"e"`
}

//JSON E 数据
type E struct {
	Hide bool     `json:"hide"`
	Egn  string   `json:"egn"`
	K    int64    `json:"k"`
	Heid int64    `json:"heid"`
	L    int64    `json:"l"`
	O    string   `json:"O"`
	No   []*No    `json:"n-o"`
	Pts  string   `json:"pts"`
	Ibs  bool     `json:"ibs"`
	Ibsc bool     `json:"ibsc"`
	Cel  string   `json:"cel"`
	Cei  string   `json:"cei"`
	Pk   string   `json:"pk"`
	Ihe  bool     `json:"ihe"`
	G    string   `json:"g"`
	I    []string `json:"i"`
	Edt  string   `json:"edt"`
	Pvdr string   `json:"pvdr"`
	Mts  int64    `json:"mts"`
}

//JSON NO 数据
type No struct {
	N  string        `json:"n"`
	Mn string        `json:"mn"`
	F  string        `json:"f"`
	Mo int64         `json:"mo"`
	O  []interface{} `json:"o"`
}

//JOSN S 数据
type S struct {
	Ip   bool                   `json:"ip"`
	Ap   bool                   `json:"ap"`
	Bn   string                 `json:"bn"`
	Sn   string                 `json:"sn"`
	Hn   string                 `json:"hn"`
	An   string                 `json:"an"`
	As   int                    `json:"as"`
	Hs   int                    `json:"hs"`
	Eid  int64                  `json:"eid"`
	En   string                 `json:"en"`
	Hd   string                 `json:"hd"`
	Cpn  string                 `json:"cpn"`
	Sid  int64                  `json:"sid"`
	St   float64                `json:"st"`
	Bo   int                    `json:"bo"`
	O    float64                `json:"o"`
	Eo   float64                `json:"eo"`
	Rsl  int                    `json:"rsl"`
	Wid  int                    `json:"wid"`
	Tl   string                 `json:"tl"`
	Cv   int                    `json:"cv"`
	Wo   int64                  `json:"wo"`
	Ishp bool                   `json:"ishp"`
	Isnu bool                   `json:"isnu"`
	Isds bool                   `json:"isds"`
	Ors  string                 `json:"ors"`
	Edt  time.Time              `json:"edt"`
	Idan bool                   `json:"idan"`
	Peid int64                  `json:"peid"`
	Bs   map[string]interface{} `json:"bs"`
	Serr string                 `json:"serr"`
}

//JSON L 数据
type L struct {
	Id  string        `json:"id"`
	T   string        `json:"t"`
	Cn  string        `json:"cn"`
	Nr  bool          `json:"nr"`
	Nc  bool          `json:"nc"`
	St  string        `json:"st"`
	S   string        `json:"s"`
	Ep  string        `json:"ep"`
	C   bool          `json:"c"`
	Pdt time.Time     `json:"pdt"`
	Wr  string        `json:"wr"`
	Tf  string        `json:"tf"`
	D   bool          `json:"d"`
	L   []interface{} `json:"l"`
}

//JSON SB 数据
type Sb struct {
	P string `json:"p"`
	A string `json:"a"`
	H string `json:"h"`
}

/** 计算输赢
 * @param GetWinOrLose，标准
 */
func GetWinOrLose(s float64, od float64, wr int) float64 {
	var money float64
	if wr == 1 {
		money = s * (od - 1)
	} else if wr == 2 {
		money = 0 - s
	} else {
		money = 0
	}
	return money
}

/** 计算和
 * @param lr
 */
func GetAnd(lr string) int64 {
	list := strings.Split(lr, ",")
	var num int64
	for _, v := range list {

		k, err := strconv.ParseInt(v, 10, 64)
		if err != nil {
			beego.Error(err.Error())
		}
		num += k
	}
	return num
}

func GetDS(lr string) string {
	list := strings.Split(lr, ",")
	var num int64
	for _, v := range list {

		k, err := strconv.ParseInt(v, 10, 64)
		if err != nil {
			beego.Error(err.Error())
		}
		num += k
	}
	str := "单"
	if num%2 == 0 {
		str = "双"
	}
	return str
}

func GetDX(lr string) string {
	list := strings.Split(lr, ",")
	var num int64
	for _, v := range list {

		k, err := strconv.ParseInt(v, 10, 64)
		if err != nil {
			beego.Error(err.Error())
		}
		num += k
	}

	var str string
	//大小判断
	if num >= 85 && num <= 132 {
		str = "大"
	} else if num >= 36 && num <= 83 {
		str = "小"
	} else if num == 84 {
		str = "和"
	}
	return str
}

func GetWDX(lr string) string {
	list := strings.Split(lr, ",")
	var num int64
	for _, v := range list {

		k, err := strconv.ParseInt(v, 10, 64)
		if err != nil {
			beego.Error(err.Error())
		}
		num += k
	}

	var str string

	k := num % 10
	if k >= 5 {
		str = "尾大"
	} else {
		str = "尾小"
	}
	return str
}

func GetLH(lr string) string {
	list := strings.Split(lr, ",")
	lh0, _ := strconv.ParseInt(list[0], 10, 32)
	lh7, _ := strconv.ParseInt(list[7], 10, 32)
	var str string
	//大小判断
	if lh0 > lh7 {
		str = "龙"
	} else {
		str = "虎"
	}
	return str
}

//判断是否过期
func GetBS_SERR(edt int64) bool {
	//a:=t2.After(t1)      //t2的记录时间是否在t1记录时间的**后面**呢，是的话，a就是true
	//b:=t2.Before(t1)     //t2的记录时间是否在t1记录时间的**前面**呢，是的话，b就是true

	now := time.Now()
	//dur, _ := time.ParseDuration("-2h")
	//durmi, _ := time.ParseDuration("-7m")
	ts := UnixtoTime(edt)
	durs, _ := time.ParseDuration("-61s") //减去10秒
	battime := ts.Add(durs)               //比赛时间减去60秒

	serr := true
	if battime.After(now) {
		//serr = "BS_SelectionClosed"
		serr = false
	}
	return serr
}

//获取打印列表
func GetBetPrint(idlists string) ([]*Batlist, error) {
	o := orm.NewOrm()
	bats := make([]*Batlist, 0)

	list1 := strings.Split(idlists, "_")
	beego.Error(list1)

	count := len(list1)
	ids := make([]int64, count)

	for k, v := range list1 {
		//ID组
		id, err := strconv.ParseInt(v, 10, 64)
		if err != nil {
			beego.Error(err.Error())
		}
		ids[k] = id
	}

	_, err := o.QueryTable("batlist").Filter("Id__in", ids).RelatedSel().All(&bats)
	//_, err := qs

	return bats, err
}

/** 查询所有的用户投注列表
 * @param ts time.Time
 */
func GetMyBets(tm1s string, tm2s string, days int) ([]*Batlist, float64, float64, error) {
	o := orm.NewOrm()
	bats := make([]*Batlist, 0)
	qs := o.QueryTable("batlist")
	var tm1, tm2 int64
	var err error

	now := time.Now()
	if days == 30 {
		tmm1, err := time.Parse("02/01/2006", tm1s)
		if err != nil {
			beego.Error(err.Error())
		}
		tmm2, err := time.Parse("02/01/2006", tm2s)
		if err != nil {
			beego.Error(err.Error())
		}
		_, err = qs.Filter("created__gt", tmm1.Unix()).Filter("created__lt", tmm2.Unix()).OrderBy("-created").RelatedSel().All(&bats)
	} else if days == 1 {
		tm1 = time.Date(now.Year(), now.Month(), now.Day()-1, 0, 0, 0, 0, time.Local).Unix()
		tm2 = time.Date(now.Year(), now.Month(), now.Day()-1, 23, 59, 59, 59, time.Local).Unix()
		_, err = qs.Filter("created__gt", tm1).Filter("created__lt", tm2).OrderBy("-created").RelatedSel().All(&bats)
	} else {
		tm1 = time.Date(now.Year(), now.Month(), now.Day(), 0, 0, 0, 0, time.Local).Unix()
		_, err = qs.Filter("created__gt", tm1).OrderBy("-created").RelatedSel().All(&bats)
	}

	var m1, m2 float64
	for _, v := range bats {
		m1 += v.S
		m2 += GetWinOrLose(v.S, v.Od, v.Wr)
	}
	return bats, m1, m2, err
}

//用户投注列表
func GetMyBet() (map[string]interface{}, error) {
	o := orm.NewOrm()
	var err error

	var bat []*Batlist

	t := time.Now()
	durdm, _ := time.ParseDuration("-24h")
	ta := t.Add(durdm).Unix()
	qs := o.QueryTable("batlist")
	_, err = qs.Filter("created__gt", ta).OrderBy("-created").RelatedSel().All(&bat)
	//_, err = o.QueryTable("batlist").All(&bat)

	//未结算的
	aul := make([]*L, 0)
	//滚球
	//ipul := make([]*L, 0)
	//已结算的24小时内
	sl := make([]*L, 0)

	uc := 0
	sc := 0

	for _, v := range bat {
		if !v.L {
			uc++
			aul = append(aul, &L{
				T:   v.G.Cn + "-" + strconv.FormatInt(int64(v.G.T), 10) + "期",
				Id:  strconv.FormatInt(int64(v.Id), 10),
				Cn:  v.G.Cn + "-" + strconv.FormatInt(int64(v.G.T), 10) + "期",
				Nr:  false,
				Nc:  false,
				S:   strconv.FormatInt(int64(v.S), 10),
				Ep:  strconv.FormatInt(int64(v.S*(v.Od-1)), 10),
				Pdt: UnixtoTime(v.Created),
				//Wr:  "",
				D: true,
				L: []interface{}{
					map[string]interface{}{
						//"h":  "",
						//"a":  "",
						"sn": v.O.Cn + " @ " + Add0(v.Ol.Cn),
						"od": v.Od,
						//"hd":  "-0/0.5",
						"en": "投注" + v.O.Cn + "-" + Add0(v.Ol.Cn),
						//"m":   "选择" + v.O.Cn,
						"e":   true,
						"nm":  true,
						"nu":  false,
						"ip":  false,
						"ors": "",
						//"edt": UnixtoTime(v.G.Edt),
						"eid": v.G.Id,
						"vt":  2,
					},
				},
			})
		} else {
			sc++
			var st, tf string
			var d bool
			var nr bool
			var ep string = strconv.FormatInt(int64(v.S*(v.Od-1)), 10)

			if v.Wr == 1 {
				st = "Wager_Win"
				d = true
				nr = false
				tf = ep
			} else if v.Wr == 2 {
				st = "Wager_Lose"
				d = false
				nr = true
				tf = "-" + strconv.FormatInt(int64(v.S), 10)
			} else if v.Wr == 3 {
				st = "Wager_Draw"
				tf = "-"
			}

			//od := FormatFloat64(v.Od, 10)

			sl = append(sl, &L{
				T:   v.G.Cn + "-" + strconv.FormatInt(int64(v.G.T), 10) + "期",
				Id:  strconv.FormatInt(int64(v.Id), 10),
				Cn:  v.G.Cn + "-" + strconv.FormatInt(int64(v.G.T), 10) + "期",
				Nr:  nr,
				Nc:  false,
				S:   strconv.FormatInt(int64(v.S), 10),
				Ep:  ep,
				Pdt: UnixtoTime(v.Created),
				//Wr:  "",
				Tf: tf,
				St: st,
				D:  d,
				L: []interface{}{
					map[string]interface{}{
						//"h":  "",
						//"a":  "",
						"sn": v.O.Cn + " @ " + Add0(v.Ol.Cn),
						"od": v.Od,
						//"hd":  "-0/0.5",
						"en": "投注" + v.O.Cn + "-" + Add0(v.Ol.Cn),
						//"m":   "投注" + v.O.Cn,
						"e":   true,
						"nm":  true,
						"nu":  true,
						"ip":  false,
						"ors": "",
						//"edt": v.G.Edt,
						"eid": v.G.Id,
						"vt":  2,
					},
				},
			})
		}
		//beego.Error(v)
	}

	json := map[string]interface{}{
		"aul":  aul,
		"ipul": []interface{}{},
		"sl":   sl,
		"uc":   uc,
		"sc":   sc,
	}

	return json, err
}

//确认下注
func SetBats(singleList string) ([]*S, string, error) {
	o := orm.NewOrm()
	var err error
	var info string

	var bat []*Oddslist
	var list2 []string
	//289@1.95@龙虎@0:0@100@false@1.95@9@true@9_290@1.95@龙虎@0:0@100@false@1.95@9@true@9

	list1 := strings.Split(singleList, "_")
	count := len(list1)

	ids := make([]int64, count)
	odds := make([]float64, count)

	u := &Users{Id: 1}
	if o.Read(u) == nil {
		beego.Error("下注确认时，用户数据读取错误")
	}

	for k, v := range list1 {
		list2 = strings.Split(v, "@")
		//count := len(list2)

		//ID组
		id, err := strconv.ParseInt(list2[0], 10, 64)
		if err != nil {
			beego.Error(err.Error())
		}
		ids[k] = id

		//下注金额组
		odd, err := strconv.ParseFloat(list2[4], 64)
		if err != nil {
			beego.Error(err.Error())
		}
		odds[k] = odd
	}

	ss := make([]*S, 0)
	_, err = o.QueryTable("oddslist").Filter("Id__in", ids).RelatedSel().All(&bat)

	var bs bool
	var serr string
	var bid int64

	batlist := new(Batlist)

	for i, v := range bat {

		bs = GetBS_SERR(v.Odds.G.Edt)

		if bs {
			serr = "BS_SelectionLotteryClosed"
			info += "0"
		} else {
			batlist.G = v.Odds.G
			batlist.O = v.Odds
			batlist.Ol = v
			batlist.Od = v.Od
			batlist.S = odds[i]
			batlist.U = u
			batlist.Created = time.Now().Unix()

			bid, err = o.Insert(batlist)
		}

		if err != nil {
			serr = "BS_ExceedExposure"
			bs = true
			info += "0"
		}

		ss = append(ss, &S{
			Ip:   false,
			Ap:   true,
			Bn:   "下注" + v.Odds.Cn,
			Sn:   Add0(v.Cn),
			As:   0,
			Hs:   0,
			Eid:  v.Odds.Id,
			En:   v.Odds.G.Cn,
			Hd:   v.Odds.Cn,
			Cpn:  v.Odds.G.Cn,
			Sid:  v.Id,
			St:   odds[i],
			Bo:   1,
			O:    v.Od,
			Eo:   v.Od,
			Rsl:  9999,
			Wid:  0,
			Tl:   "OR",
			Cv:   0,
			Wo:   bid,
			Ishp: true,
			Isnu: false,
			Isds: false,
			Ors:  "",
			Edt:  UnixtoTime(v.Odds.G.Edt),
			Idan: bs,
			Peid: v.Odds.Id,
			Bs: map[string]interface{}{
				"bmin": 10,
				"bmax": 5000,
				"dm":   "49,800",
				"bpay": 50000,
			},
			Serr: serr,
		})
	}

	return ss, info, err
}

//临时下注单
func GetBatstemporary(selList string, sstakeList string) ([]*S, error) {

	o := orm.NewOrm()
	var bat []*Oddslist

	list := strings.Split(selList, "_")
	talist := strings.Split(sstakeList, "_")

	ids := make([]int64, len(list))

	inttalist := make([]float64, len(talist))

	for i, s := range list {
		id, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			beego.Error(err.Error())
		}
		ids[i] = id
	}

	// for i := len(list) - 1; i >= 0; i-- {
	// 	id, err := strconv.ParseInt(list[i], 10, 64)
	// 	if err != nil {
	// 		beego.Error(err.Error())
	// 	}
	// 	ids[i] = id
	// }

	for i, s := range talist {
		id, err := strconv.ParseFloat(s, 64)
		if err != nil {
			beego.Error(err.Error())
		}
		inttalist[i] = id
	}

	_, err := o.QueryTable("oddslist").Filter("Id__in", ids).RelatedSel().All(&bat)

	ss := make([]*S, 0)

	//beego.Error(len(bat))

	for i := len(bat) - 1; i >= 0; i-- {
		now := time.Now()

		edt := UnixtoTime(bat[i].Odds.G.Edt)
		durs, _ := time.ParseDuration("-61s") //减去10秒
		battime := edt.Add(durs)              //比赛时间减去60秒

		serr := ""
		//bs = GetBS_SERR(v.Odds.G.Edt)
		if battime.Before(now) {
			serr = "BS_SelectionLotteryClosed"
		}

		ss = append(ss, &S{
			Ip:  false,
			Ap:  true,
			Bn:  "第" + strconv.FormatInt(int64(bat[i].Odds.G.T), 10) + "期",
			Sn:  Add0(bat[i].Cn),
			As:  0,
			Hs:  0,
			Eid: bat[i].Odds.Id,
			En:  bat[i].Odds.G.Cn,
			//Hd:   v.Odds.G.Edt.Format("2006-01-02 15:04:05"),
			Hd:   bat[i].Odds.Cn,
			Cpn:  bat[i].Odds.G.Cn,
			Sid:  bat[i].Id,
			St:   inttalist[i],
			Bo:   3,
			O:    bat[i].Od,
			Eo:   bat[i].Od,
			Rsl:  0,
			Wid:  0,
			Tl:   "OR",
			Cv:   0,
			Wo:   0,
			Ishp: false,
			Isnu: false,
			Isds: false,
			Ors:  "",
			Edt:  edt,
			Idan: false,
			Peid: bat[i].Odds.Id,
			Bs: map[string]interface{}{
				"bmin": 10,
				"bmax": 5000,
				"dm":   "49,800",
				"bpay": 50000,
			},
			Serr: serr,
		})
	}

	/*
		for i, v := range bat {
			//t1 := UnixtoTime(v.Odds.G.Edt)
			now := time.Now()

			edt := UnixtoTime(v.Odds.G.Edt)
			durs, _ := time.ParseDuration("-61s") //减去10秒
			battime := edt.Add(durs)              //比赛时间减去60秒

			serr := ""
			//bs = GetBS_SERR(v.Odds.G.Edt)
			if battime.Before(now) {
				serr = "BS_SelectionLotteryClosed"
			}

			ss = append(ss, &S{
				Ip:  false,
				Ap:  true,
				Bn:  "第" + strconv.FormatInt(int64(v.Odds.G.T), 10) + "期",
				Sn:  Add0(v.Cn),
				As:  0,
				Hs:  0,
				Eid: v.Odds.Id,
				En:  v.Odds.G.Cn,
				//Hd:   v.Odds.G.Edt.Format("2006-01-02 15:04:05"),
				Hd:   v.Odds.Cn,
				Cpn:  v.Odds.G.Cn,
				Sid:  v.Id,
				St:   inttalist[i],
				Bo:   1,
				O:    v.Od,
				Eo:   v.Od,
				Rsl:  0,
				Wid:  0,
				Tl:   "OR",
				Cv:   0,
				Wo:   0,
				Ishp: false,
				Isnu: false,
				Isds: false,
				Ors:  "",
				Edt:  edt,
				Idan: false,
				Peid: v.Odds.Id,
				Bs: map[string]interface{}{
					"bmin": 10,
					"bmax": 5000,
					"dm":   "49,800",
					"bpay": 50000,
				},
				Serr: serr,
			})
		}
	*/

	return ss, err
}

//添加临时下注
func AddBatstemporary(gid int64, olid int64) error {
	o := orm.NewOrm()

	//临时下注的用户
	u := &Users{Id: 1}

	g := &Games{Id: gid}
	if o.Read(g) == nil {
		beego.Error("game数据为空")
	}

	ol := &Oddslist{Id: olid}
	if o.Read(ol) == nil {
		beego.Error("ol数据为空")
	}

	os := &Odds{Id: ol.Odds.Id}
	if o.Read(os) == nil {
		beego.Error("os数据为空")
	}

	batstemporary := &Batstemporary{
		Osname:  os.Cn + "/" + ol.Cn,
		U:       u,
		G:       g,
		O:       os,
		Ol:      ol,
		Created: time.Now().Unix(),
	}
	_, err := o.Insert(batstemporary)
	return err
}

//获取栏目的数据
func GetColumn() ([]*Column, error) {
	o := orm.NewOrm()
	column := make([]*Column, 0)

	//_, err := qs.All(&column)
	_, err := o.QueryTable("column").Filter("id", 6).All(&column)
	return column, err
}

//获取比赛列表
func GetGameslist() ([]*Games, error) {
	o := orm.NewOrm()
	games := make([]*Games, 0)

	var tm1, tm2 int64
	now := time.Now()

	tm1 = time.Date(now.Year(), now.Month(), now.Day(), 0, 0, 0, 0, time.Local).Unix()
	tm2 = time.Date(now.Year(), now.Month(), now.Day(), 23, 59, 59, 59, time.Local).Unix()

	_, err := o.QueryTable("games").Filter("wr", 1).Filter("edt__gt", tm1).Filter("edt__lt", tm2).OrderBy("-edt").All(&games)

	return games, err
}

//获取比赛列表
func GetGames(sid int64) ([]*Games, error) {
	o := orm.NewOrm()
	games := make([]*Games, 0)

	qs := o.QueryTable("games")
	_, err := qs.Filter("Edt__gt", time.Now()).All(&games)
	beego.Error("读取比赛列表")
	return games, err
}

//获取下注菜单
func GetFb(sid int64) ([]*Fb, error) {
	o := orm.NewOrm()
	odds := make([]*Odds, 0)

	qs := o.QueryTable("odds")
	_, err := qs.Filter("g_id", sid).All(&odds)

	fb := make([]*Fb, 0)
	fb = append(fb, &Fb{Tx: "所有的", Ex: ""})
	for _, v := range odds {
		fb = append(fb, &Fb{Tx: v.Cn, Ex: v.F})
	}
	//_, err = qs.All(&column)
	return fb, err
}

//更新下载菜单输赢
//参数,期数
func Upbatlist(t int64, lr string) {
	o := orm.NewOrm()

	var bat []*Batlist
	//_, err := o.QueryTable("batlist").Filter("G__T", t).RelatedSel().All(&bat)

	_, err := o.QueryTable("batlist").Filter("Wr", 0).Filter("G__T", t).RelatedSel().All(&bat)

	if err != nil {
		beego.Error(err.Error())
	}

	// beego.Error("___________________", err)
	for _, v := range bat {

		list := strings.Split(lr, ",")
		wr := 2
		l0, err := strconv.ParseInt(list[0], 10, 32)
		l7, err := strconv.ParseInt(list[7], 10, 32)

		//beego.Error(v.O.Mo)

		if v.O.Mo == 9 {
			var num int
			for _, k := range list {
				k1, err := strconv.ParseInt(k, 10, 32)

				if err != nil {
					beego.Error(err.Error())
				}
				num = num + int(k1) //总和
			}

			//beego.Error(v.Ol.Cn, num)
			switch v.Ol.Cn {
			case "单":
				if num%2 != 0 {
					wr = 1
				}
				break
			case "双":
				if num%2 == 0 {
					wr = 1
				}
				break
			case "尾大":
				//获取个位数字
				k := num % 10
				if k >= 5 {
					wr = 1
				}
				break
			case "尾小":
				k := num % 10
				if k <= 4 {
					wr = 1
				}
				break
			case "大":
				if num >= 85 && num <= 132 {
					wr = 1
				}
				break
			case "小":
				if num >= 36 && num <= 83 {
					wr = 1
				}
				break
			case "和":
				if num == 84 {
					wr = 1
				}
				break
			case "龙":
				if l0 > l7 {
					wr = 1
				}
				break
			case "虎":
				if l0 < l7 {
					wr = 1
				}
				break
			}

			//beego.Error("wr:", wr)

		} else {

			for i := 0; i < 9; i++ {

				//beego.Error(v.O.Mo)
				if v.O.Mo == int64(i+1) {

					//beego.Error("list", list[i])
					_, err := strconv.ParseInt(v.Ol.Cn, 10, 32)
					num2, _ := strconv.ParseInt(list[i], 10, 32)

					if err != nil {

						beego.Error(v.Ol.Cn)

						switch v.Ol.Cn {
						case "单":
							if num2%2 != 0 {
								wr = 1
							}
							break
						case "双":
							if num2%2 == 0 {
								wr = 1
							}
							break
						case "和单":
							s1 := (num2 % 100) / 10
							s2 := num2 % 10
							kkk := s1 + s2

							if kkk%2 != 0 {
								wr = 1
							}
							break
						case "和双":
							s1 := (num2 % 100) / 10
							s2 := num2 % 10
							kkk := s1 + s2

							if kkk%2 == 0 {
								wr = 1
							}
							break
						case "大":
							if num2 >= 11 {
								wr = 1
							}
							break
						case "小":
							if num2 <= 10 {
								wr = 1
							}
							break
						case "尾大":
							k := num2 % 10
							if k >= 5 {
								wr = 1
							}
							break
						case "尾小":
							k := num2 % 10
							if k >= 5 {
								wr = 1
							}
							break
						case "春":
							if num2 >= 1 && num2 <= 5 {
								wr = 1
							}
							break
						case "夏":
							if num2 >= 6 && num2 <= 10 {
								wr = 1
							}
							break
						case "秋":
							if num2 >= 11 && num2 <= 15 {
								wr = 1
							}
							break
						case "冬":
							if num2 >= 16 && num2 <= 20 {
								wr = 1
							}
							break
						case "红":
							if num2 == 1 || num2 == 4 || num2 == 7 || num2 == 10 || num2 == 13 || num2 == 16 {
								wr = 1
							}
							break
						case "蓝":
							if num2 == 2 || num2 == 5 || num2 == 8 || num2 == 11 || num2 == 14 || num2 == 17 {
								wr = 1
							}
							break
						case "绿":
							if num2 == 3 || num2 == 6 || num2 == 9 || num2 == 12 || num2 == 15 || num2 == 18 {
								wr = 1
							}
							break
						case "金":
							if num2 == 19 || num2 == 20 {
								wr = 1
							}
							break
						}
					} else {
						if v.Ol.Cn == list[i] {
							wr = 1
						}

					}

				}
			}
		}

		upbat := Batlist{Wr: wr, L: true, Nr: true, Id: v.Id}

		upid, err := o.Update(&upbat, "wr", "l", "nr")
		if err != nil {
			beego.Error(err.Error(), "ERROR", upid)
		}

		if err != nil {
			beego.Error(err)
		}
	}
}

//上2期彩票的中奖号码
func GetSb() ([]*Sb, int64, int64) {
	sb := make([]*Sb, 0)

	var game []*Games

	o := orm.NewOrm()

	var err error

	_, err = o.QueryTable("games").Filter("wr", 1).OrderBy("-edt").Limit(2).All(&game)
	//_, err := o.QueryTable("games").Filter("wr", 1).GroupBy("-edt").RelatedSel().Limit(2).All(&game)
	if err != nil {
		beego.Error(err.Error)
	}

	list1 := strings.Split(game[0].Lr, ",")
	list2 := strings.Split(game[1].Lr, ",")

	var zh1, zh2 int
	var ds1, ds2 string
	var lh1, lh2 string
	var dx1, dx2 string

	lh10, err := strconv.ParseInt(list1[0], 10, 32)
	lh17, err := strconv.ParseInt(list1[7], 10, 32)

	lh20, err := strconv.ParseInt(list2[0], 10, 32)
	lh27, err := strconv.ParseInt(list2[7], 10, 32)

	for i := 0; i < len(list1); i++ {
		x, _ := strconv.Atoi(list1[i])
		y, _ := strconv.Atoi(list2[i])
		zh1 += x
		zh2 += y
		sb = append(sb, &Sb{
			P: "s" + strconv.Itoa(i+1),
			A: list1[i],
			H: list2[i],
		})
	}

	if zh1%2 == 0 {
		ds1 = "双"
	} else {
		ds1 = "单"
	}

	if zh2%2 == 0 {
		ds2 = "双"
	} else {
		ds2 = "单"
	}

	if lh10 > lh17 {
		lh1 = "龙"
	} else {
		lh1 = "虎"
	}

	if lh20 > lh27 {
		lh2 = "龙"
	} else {
		lh2 = "虎"
	}

	//大小判断
	if zh1 >= 85 && zh1 <= 132 {
		dx1 = "大"
	} else if zh1 >= 36 && zh1 <= 83 {
		dx1 = "小"
	} else if zh1 == 84 {
		dx1 = "和"
	}

	if zh2 >= 85 && zh2 <= 132 {
		dx2 = "大"
	} else if zh2 >= 36 && zh2 <= 83 {
		dx2 = "小"
	} else if zh2 == 84 {
		dx2 = "和"
	}

	//尾大小判断
	//w1 := strings.Split(strconv.Itoa(zh1), sep)

	sb = append(sb, &Sb{P: "ft", A: strconv.Itoa(zh1), H: strconv.Itoa(zh2)})
	sb = append(sb, &Sb{P: "p", A: ds1, H: ds2})
	sb = append(sb, &Sb{P: "ftg", A: lh1, H: lh2})
	sb = append(sb, &Sb{P: "dx", A: dx1, H: dx2})

	return sb, game[0].T, game[1].T
}

func Add0(str string) string {
	if len(string(str)) < 2 {
		str = "0" + str
	}
	return str
}

//获取一个比赛
func GetGame(sid int64) (*Games, error) {
	o := orm.NewOrm()
	var game Games
	err := o.QueryTable("games").Filter("edt__gt", time.Now().Unix()).One(&game)
	//game := &Games{Id: sid}
	//if o.Read(game) == nil {
	//beego.Error("game数据为空")
	//}
	if err == orm.ErrNoRows {
		beego.Error("Error:获取当前赛事为空")
	}
	return &game, nil
}

//比赛结果输入数据库
func AddGameLr(st int64, lr string) {
	o := orm.NewOrm()

	var game Games
	err := o.QueryTable("games").Filter("t", st).One(&game)
	//多条记录
	if err == orm.ErrMultiRows {
		beego.Error("多条期属赛事")
		return
	}

	// 没有找到记录
	if err == orm.ErrNoRows {
		beego.Error("该期比赛不存在", st)
		return
	} else {
		if !game.Wr {
			game.Wr = true
			game.Lr = lr
			game.Id = game.Id
			_, err := o.Update(&game)
			if err != nil {
				beego.Error(err.Error())
			}
		}
	}
}

//下注参数
func GetO(sid int64, lock bool) ([]interface{}, error) {
	o := orm.NewOrm()
	oddslist := make([]*Oddslist, 0)

	qs := o.QueryTable("oddslist")
	_, err := qs.Filter("odds_id", sid).All(&oddslist)

	list := make([]interface{}, 0)

	var id string
	for _, v := range oddslist {
		//时间到了，锁盘静止下单
		id = "o" + strconv.FormatInt(v.Id, 10)
		if lock {
			list = append(list, []string{Add0(v.Cn), id, "c"})
		} else {
			list = append(list, []string{Add0(v.Cn), id, strconv.FormatFloat(v.Od, 'f', -1, 64)})
		}
	}
	return list, err
}

//下注列表
func GetN_O(sid int64, edt int64) ([]*No, error) {
	o := orm.NewOrm()

	odds := make([]*Odds, 0)

	qs := o.QueryTable("odds")
	_, err := qs.Filter("g_id", sid).All(&odds)

	no := make([]*No, 0)

	lock := GetBS_SERR(edt)

	for _, v := range odds {
		list, _ := GetO(v.Id, lock)
		no = append(no, &No{
			N:  v.Cn,
			Mo: v.Mo,
			Mn: v.Mn,
			F:  v.F,
			O:  list,
		})
	}
	return no, err
}

//添加默认数据
func AddDateGame(cn string, en string, edt int64, t int64) {
	o := orm.NewOrm()
	c := &Column{
		Id: 6,
	}

	var game Games
	err := o.QueryTable("games").Filter("t", t).One(&game)

	if err == orm.ErrMultiRows {
		// 没有找到记录
		return
	}

	if err == orm.ErrNoRows {

		games := &Games{
			Cn:   cn,
			En:   en,
			Did:  1,
			Hide: false,
			Heid: 0,
			L:    0,
			Ibs:  true,
			Ibsc: true,
			Ihe:  true,
			G:    "n",
			I:    "",
			Edt:  edt,
			Pvdr: "p",
			Mts:  15,
			T:    t,
			C:    c,
		}
		o.Insert(games)

		cnname := [9]string{"第一球", "第二球", "第三球", "第四球", "第五球", "第六球", "第七球", "第八球", "龙虎"}
		fs := [9]string{"|a|", "|b|", "|c|", "|d|", "|e|", "|f|", "|g|", "|h|", "|i|"}

		odds1 := new(Odds)
		for i := 0; i < 9; i++ {
			odds1.Cn = cnname[i]
			odds1.En = ""
			odds1.Mo = int64(i + 1)
			odds1.Mn = "one"
			odds1.F = fs[i]
			odds1.G = games

			o.Insert(odds1)

			list := new(Oddslist)

			if i == 8 {
				list1s := []Oddslist{
					{Cn: "大", Od: 1.95, Odds: odds1},
					{Cn: "小", Od: 1.95, Odds: odds1},
					{Cn: "尾大", Od: 1.95, Odds: odds1},
					{Cn: "尾小", Od: 1.95, Odds: odds1},
					{Cn: "单", Od: 1.95, Odds: odds1},
					{Cn: "双", Od: 1.95, Odds: odds1},
					{Cn: "和单", Od: 1.95, Odds: odds1},
					{Cn: "和双", Od: 1.95, Odds: odds1},
					{Cn: "和", Od: 1.95, Odds: odds1},
					{Cn: "龙", Od: 1.95, Odds: odds1},
					{Cn: "虎", Od: 1.95, Odds: odds1},
				}
				o.InsertMulti(8, list1s)

			} else {
				for i := 1; i <= 20; i++ {
					name := strconv.Itoa(i)

					list.Cn = name
					list.Od = 19.00
					list.Odds = odds1
					o.Insert(list)
				}

				list1s := []Oddslist{
					{Cn: "春", Od: 3.60, Odds: odds1},
					{Cn: "夏", Od: 3.60, Odds: odds1},
					{Cn: "秋", Od: 3.60, Odds: odds1},
					{Cn: "冬", Od: 3.60, Odds: odds1},
					{Cn: "红", Od: 3.60, Odds: odds1},
					{Cn: "蓝", Od: 3.60, Odds: odds1},
					{Cn: "绿", Od: 3.60, Odds: odds1},
					{Cn: "金", Od: 3.60, Odds: odds1},
					{Cn: "单", Od: 1.95, Odds: odds1},
					{Cn: "双", Od: 1.95, Odds: odds1},
					{Cn: "和单", Od: 1.95, Odds: odds1},
					{Cn: "和双", Od: 1.95, Odds: odds1},
					{Cn: "大", Od: 1.95, Odds: odds1},
					{Cn: "小", Od: 1.95, Odds: odds1},
					{Cn: "尾大", Od: 1.95, Odds: odds1},
					{Cn: "尾小", Od: 1.95, Odds: odds1},
				}
				o.InsertMulti(16, list1s)

			}
		}
	} else {
		beego.Error("该期数据存在")
	}
}

//添加默认菜单
func AddDate() error {
	o := orm.NewOrm()
	//添加默认的用户
	users := &Users{
		Username: "admin",
		Password: "admin888",
		Email:    "email@bat188.com",
		Created:  time.Now().Unix(),
	}
	o.Insert(users)

	colums := []Column{
		{
			CnName: "足球",
			EnName: "football",
			Mt:     1,
			Son:    1,
			Tc:     114,
			Tmrc:   200,
			Ipc:    0,
			Ec:     427,
			Psc:    541,
			Orc:    73,
		}, {
			CnName: "篮球",
			EnName: "basketball",
			Mt:     1,
			Son:    1,
			Tc:     114,
			Tmrc:   200,
			Ipc:    0,
			Ec:     427,
			Psc:    541,
			Orc:    73,
		}, {
			CnName: "网球",
			EnName: "tennis",
			Mt:     1,
			Son:    1,
			Tc:     114,
			Tmrc:   200,
			Ipc:    0,
			Ec:     427,
			Psc:    541,
			Orc:    73,
		}, {
			CnName: "棒球",
			EnName: "baseball",
			Mt:     1,
			Son:    1,
			Tc:     114,
			Tmrc:   200,
			Ipc:    0,
			Ec:     427,
			Psc:    541,
			Orc:    73,
		}, {
			CnName: "高尔夫球",
			EnName: "golf",
			Mt:     1,
			Son:    1,
			Tc:     114,
			Tmrc:   200,
			Ipc:    0,
			Ec:     427,
			Psc:    541,
			Orc:    73,
		}, {
			CnName: "彩票",
			EnName: "lottery",
			Mt:     1,
			Son:    1,
			Tc:     114,
			Tmrc:   200,
			Ipc:    0,
			Ec:     427,
			Psc:    541,
			Orc:    73,
		},
	}

	o.InsertMulti(6, colums)

	// colum1 := &Column{
	// 	CnName: "足球",
	// 	EnName: "football",
	// }

	// o.Insert(colum1)
	//_, err := o.Insert(colum2)
	return nil
}

func UnixtoTime(edt int64) time.Time {
	return time.Unix(edt, 0)
}

func UnixtoTimeStr(edt int64) string {
	return time.Unix(edt, 0).Format("2006/01/02 15:04:05")
}

/*
func UnixtoTime(edt int64) string {
	//return time.Unix(sec, nsec)
	return time.Unix(edt, 0).String()
}
*/

//https://sb.my188.com/zh-cn/Service/BetSlipService?PlaceBetNew
/*
func AddOdds() {
	o := orm.NewOrm()
	g := &Games{Id: 1}

	odds := []Odds{
		{Cn: "第一球", En: "", Mo: "one", F: "|a|"},
		{Cn: "第一球", En: "", Mo: "one", F: "|a|"},
	}

}
*/
