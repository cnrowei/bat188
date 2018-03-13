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
        <div class="content-header">
            <span class="info-centre">
            赛果
            </span>
        </div>
        
        <div class="search-panel">                    
                
        </div>
           
   </div>

    

        <div class="data-container settled-bet">

            <table border="0" cellspacing="0" cellpadding="0" class="st">
                <colgroup>
                    <col width="200px">
                    <col width="120px">
                    <col width="200px">
                    <col width="">
                    <col width="">
                    <col width="">
                    <col width="">
                </colgroup>
                <tbody>
                <tr class="st-hdr">
                    <th>开奖时间</th>
                    <th>期数</th>
                    <th>开奖号码</th>
                    <th>和</th>
                    <th>单双</th>
                    <th>大小</th>
                    <th>尾大小</th>
                    <th>龙虎</th>
                </tr>

                {{range .games}}
                    <tr class="l1 ">
                        <td class="tac">{{unixtoTimeStr .Edt}}</td>
                        <td><div>{{.T}}</div></td>
                        <td class="tac">{{.Lr}}</td>
                        <td class="tac">{{getand .Lr}}</td>
                        <td class="tac">{{getds .Lr}}</td>
                        <td class="tac">{{getdx .Lr}}</td>
                        <td class="tac">{{getwdx .Lr}}</td>
                        <td class="tac">{{getlh .Lr}}</td>
                    </tr>
                {{end}}


            
                
                
                </tbody>
            </table>
            

        </div>
    </div>



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

