
<!DOCTYPE html>
<html lang="en" ng-app="starApp">
<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=1024">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="fragment" content="!">
    <title>打印</title>
    <meta name="viewport" content="width=device-width" />
    <meta name="robots" content="" />
    <meta name="keywords" />
    <meta name="description" />


    <link href="/static/css/bootstrap.css" rel="stylesheet"/>
    <link href="/Public/Layout/SportMasterPage.css?v=08120431" rel="stylesheet" type="text/css" />
    <link href="/Public/Layout/iconfont.css?v=08120431" rel="stylesheet" type="text/css" />
    <link href="/Public/Layout/font_lato.css?v=08120431" rel="stylesheet" type="text/css" />
    <link id="theme" href="/Public/Theme/Theme_Black/Css/Theme.css?v=08120431" rel="stylesheet" type="text/css" />
<script src="/Public/JS/Minified/jquery.min.js?v=08120431" type="text/javascript"></script>

    <style type="text/css">
    	
   ul, ol {
    margin-top: 0;
    margin-bottom: 8.5px;
    margin-left: 0;
    padding-left: 20px;
}


.usercontent .btn-print{
    float: left;
    margin-left: 20px;
   } 
 </style>

</head>
<body class="usercontent statement zh-cn">

<div id="doprint">
<div style="width:190px;margin-right:auto;margin-left:auto;">
	<img src="data:image/png;base64,{{.qrcode}}" />
	<div class="data-container settled-bet">
	<ul>
        <li>{{.title}}</li>
        <li>{{.qs}}期</li>
        <li>开奖:{{.time}}</li>
        <li>--------------------------------</li>
	   {{range .ubats}}
	       <li>{{.O.Cn}} @ {{getadd0 .Ol.Cn}} @ {{.Ol.Od}} <br/>投注:{{.S}} 元</li>
	   {{end}}
	</ul>
	</div>
</div>
</div>

<div style="width:190px;margin-right:auto;margin-left:auto;">
<span class="btn-print">
	<span class="btn-lt"></span>打印<span class="btn-rt"></span></span>
</div>

</body>

<script type="text/javascript">
$(".btn-print").click(function () {
    //console.log(prnhtml);
    //#region click print button
    window.document.body.innerHTML=$("#doprint").html(); 
    window.print(); 
    });
    //#endregion
</script>
</html>