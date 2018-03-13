<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head id="Head1">
    <title>投注记录</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/> 
    <meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE" />
	
<script language="javascript" type="text/javascript">
    var global = { ckExp: 14, root: '../../../../', lan: 'zh-cn', rv: '08120431', cdn: '/', bgurl: '188bet.betstream.betgenius.com', bu: '188BET' };
</script>
    
<script src="/Public/JS/Minified/jquery.min.js?v=08120431" type="text/javascript"></script>
<script src="/Public/JS/Minified/CoreLinks-zh-cn.min.js?v=08120431" type="text/javascript"></script>



    <script language="javascript" type="text/javascript">
        var datePickerMaxDate = new Date('2016', '7', '18');
        HomeJS.ChangeDomain();
    </script>
    
<script language="javascript" type="text/javascript">
    
    var uv = {
        login:false,
        // ov:2, 
        // sb:1,
        // tzDate: "2016年8月18日",
        // tz:"+08:00",
        // tzoff:'480', 
        // svrDt:'2016/08/18 18:42:50', 
        // utcDate:'2016/08/18 10:42:50' ,
        // urView:'ASIAN',
        // abl: 'RMB 277.72',
        // cc: 'RMB',
        // lid: 'conku188',
        //ref:{ic:60, icz:60}, efloat:false, Deposit : false,pds:1,showls:false,country:'CN',nol:1 , iarf:false,cdbg:false,ocgd:false,scgd:false
    };
</script>
    <script type="text/javascript">
        TimeZone.initTz(uv.tzoff, uv.svrDt, uv.utcDate);
    </script>
    
    <link href="/Public/Layout/SportMasterPage.css?v=08120431" rel="stylesheet" type="text/css" />
    <link href="/Public/Layout/iconfont.css?v=08120431" rel="stylesheet" type="text/css" />
    <link href="/Public/Layout/font_lato.css?v=08120431" rel="stylesheet" type="text/css" />
    <link id="theme" href="/Public/Theme/Theme_Black/Css/Theme.css?v=08120431" rel="stylesheet" type="text/css" />
    
    <script src="/Public/Lib/tooltip.js?v=08120431" type="text/javascript"></script>
    <script src="/Public/JS/PostMessage.js?v=08120431" type="text/javascript"></script>
    <script src="/Public/JS/MyAccount/Statement.js?v=08120431" type="text/javascript"></script>
    <script src="/Public/JS/User/Utils.js?v=08120431" type="text/javascript"></script>
    <script language="javascript" type="text/javascript">var g = { hu: '/zh-cn/home' };</script>
        <style type="text/css">
        /* print function */
        @media print 
        {   body.usercontent { background: white; }
            .noprint {display:none;}
            #content-panel{width:800px!important; margin:auto!important; float:none!important;}
            .prnHead {font-weight:bold; }
            #printHeader {display:block; }       
        }
        @media screen
        {
            #printHeader {display:none;}       
        }

        .usercontent .search-labels {
    		padding: 5px 0 5px 10px;
		}
        .usercontent.statement {
            margin-right: 5px;
            margin-left: 5px;
        }
        .usercontent .data-container>table td,.usercontent .data-container>table td.tac{
            padding:10px 10px;
        }
    </style>
<title>

投注记录
   
   </title>
   <script type="text/javascript">
    var credit = false;
    function submitForm(day) {
       $("#daysInput").val(day);
       document.forms[0].submit();
    }
   </script>
    
</head>
<body class="usercontent statement zh-cn">
  

  <form name="aspnetForm" method="get" action="settled-bets" id="aspnetForm">

<!-- <div>
<input type="hidden" name="__EVENTTARGET" id="__EVENTTARGET" value="" />
<input type="hidden" name="__EVENTARGUMENT" id="__EVENTARGUMENT" value="" />
</div> -->

<script type="text/javascript">
//<![CDATA[
var theForm = document.forms['aspnetForm'];
if (!theForm) {
    theForm = document.aspnetForm;
}
function __doPostBack(eventTarget, eventArgument) {
    if (!theForm.onsubmit || (theForm.onsubmit() != false)) {
        // theForm.__EVENTTARGET.value = eventTarget;
        // theForm.__EVENTARGUMENT.value = eventArgument;
        theForm.submit();
    }
}
//]]>
</script>



    
    <div id="container" class="statepage">
      
        <div id="lt-center">
            <div class="bg-c-1 pd-20">
                <div id="container">
                    <div id="content-panel">
      
                        
    <div class="data-grid">
       <!--  <div class="content-header">
            <span class="info-centre">
            已结算注单
            </span>
        </div>
         -->
        <div class="search-panel">                    
                <div class="search-labels dp-blok">
                    <div class="dp-wrap">
                        <span class="t-va-m mg-l-10 mg-r-10">开始日期</span>
                        <label>
                            <input name="inputFromDatePicker" type="text" id="ctl00_Content_inputFromDatePicker" class="date-picker date calender FromDateValidate" readonly="readonly" value="{{dateformat .t2 "02/01/2006"}}" />
                            <span class="icon-ArrowDown"></span>
                        </label>
                    </div>
                    <div class="dp-wrap">
                        <span class="t-va-m mg-l-10 mg-r-10">结束日期</span>
                        <label>
                            <input name="inputToDatePicker" type="text" id="ctl00_Content_inputToDatePicker" class="date-picker date calender ToDateValidate" readonly="readonly" value="{{dateformat .t1 "02/01/2006"}}" />
                            <span class="icon-ArrowDown"></span>
                        </label>
                    </div>
                    <a class="btn-ok btn_submit submit" href="javascript:__doPostBack(&#39;ctl00$Content$ctl00&#39;,&#39;&#39;)">
                        <span class="btn-lt"></span>
                        查询
                        <span class="btn-rt"></span>
                    </a>
                    <span class="btn-print">
                        <span class="btn-lt"></span>
                        打印
                        <span class="btn-rt"></span>
                    </span>
                </div>

                <div class="dt-pk-bar">
                    <div class="search-labels qdp-blok">
                    <input type="hidden" value="" id="daysInput" name="daysInput" />
                        <ul>
                            <li class="first">
                                <a id="linkBtnToday"   href="javascript:submitForm(0);" >今日</a>
                            </li>
                            <li>
                                <a id="linkBtnYesterday"   href="javascript:submitForm(1);" >昨天</a>
                            </li>
                            <li>
                            
                                <a id="linkBtnLast30"  href="javascript:submitForm(30);">过去30天</a>
                            
                            </li>
                        </ul>
                    </div>
                </div>                    
        </div>
           
   </div>

    

        <div class="data-container settled-bet">
            <div class="data-title"> 
                <span class="btn-toggle expand"><span class="toggle-arrow"></span></span>
                <a>已结算注单</a> 
            </div>
            <table border="0" cellspacing="0" cellpadding="0" class="st">
                <colgroup>
                    <col width="44px">
                    <col width="109px">
                    <col width="100px">
                    <col width="226px">
                    <col width="80px">
                    
                    
                    <col width="80px">
                    <col width="60px">
                </colgroup>
                <tbody>
                <tr class="st-hdr">
                    <th>编号</th>
                    <th>投注详情</th>
                    <th>投注玩法</th>
                    <th>选项</th>
                    <th>投注额</th>
                    <th>赢 / 输</th>
                    <th>状态</th>
                </tr>
                {{$allmoney:=0}}
                {{range .ubats}}
                    <tr class="l1 ">
                        <td class="tac">{{.Id}}</td>
                        <td><div>{{.G.Cn}} @ {{.G.T}}</div></td>
                        <td class="bet-type">{{.O.Cn}}</td>
                        <td>{{getadd0 .Ol.Cn}} 号 @ {{.Od}}</td>
                        <td class="tac">{{.S}}</td>
                        <td class="tac">
                       {{getWinOrLose .S .Od .Wr}}
                        </td>
                        <td class="tac">
                            
                        {{if eq .Wr 1}}
                        <span class='win'>赢</span>
                        {{else if eq .Wr 2}}
                        <span class='lose'>输</span>
                        {{else if eq .Wr 3}}
                        <span class='lose'>平</span>
                        {{else}}
                        <span class='lose'>未开奖</span>
                        {{end}}

                        </td>
                    </tr>
                {{end}}


				
				<tr class="st-tl" id="tr_Settled_Total" visible="false">
                    <th colspan="4" class="tar">总共有:</th>
                    <th class="tar">{{.m1}}</th>
                    <th class="tar">{{.m2}}</th>                    
					<th class="no-b">&nbsp;</th>
                </tr>	
				
                
                </tbody>
            </table>
            
        <table border="0" cellspacing="0"  cellpadding="0" id="Table1" style="display:none" class="st noprint">
            <colgroup>
                <col width="44px">
                <col width="109px">
                <col width="100px">
                <col width="226px">
                <col width="80px">
                <col width="80px">
                <col width="60px">
            </colgroup>
            <tbody>
                                
                
                <tr class="hidden"><td colspan="7"></td></tr>
            </tbody>
        </table>
        </div>
    </div>

    <!-- <input name="ctl00$Content$Todaydate0" type="hidden" id="ctl00_Content_Todaydate0" class="todayDate" value="18/08/2016" />
    <input type="hidden" id="Key" class="KeyValue" value="sport2" />
    //<input name="ctl00$Content$TopKey" type="hidden" id="ctl00_Content_TopKey" class="TopKeyValue" value="statement" /> -->
    <input name="InputButn" type="hidden"  class="inputButn" value="{{.InputButn}}" />

                    </div>
                </div>
            </div>
        </div>
      <div class="clear"></div>
    </div>
    <!--<a href="#" id="TopLink" title="返回顶部"><span>返回顶部</span></a>-->
  </form>

</body>
</html>

