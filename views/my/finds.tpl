<!DOCTYPE html>
<html lang="en">
  <head>
  <meta charset="utf-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>投注记录</title>
     <link href="/static/css/bootstrap2.css" rel="stylesheet"/>
     <link href="/static/css/bootstrap-responsive.css" rel="stylesheet"/>
     <style type="text/css">

      /* Sticky footer styles
      -------------------------------------------------- */

      html,
      body {
        height: 100%;
        /* The html and body elements cannot have any padding or margin. */
      }

      /* Wrapper for page content to push down footer */
      #wrap {
        min-height: 100%;
        height: auto !important;
        height: 100%;
        /* Negative indent footer by it's height */
        margin: 0 auto -60px;
      }

      /* Set the fixed height of the footer here */
      #push,
      #footer {
        height: 60px;
      }
      #footer {
        background-color: #f5f5f5;
      }

      /* Lastly, apply responsive CSS fixes as necessary */
      @media (max-width: 767px) {
        #footer {
          margin-left: -20px;
          margin-right: -20px;
          padding-left: 20px;
          padding-right: 20px;
        }
      }



      /* Custom page CSS
      -------------------------------------------------- */
      /* Not required for template or sticky footer method. */

      .container {
        width: auto;
        max-width: 680px;
      }
      .container .credit {
        margin: 20px 0;
      }

    </style>
</head>
<body>

<div id="wrap">
      <!-- Begin page content -->
      <div class="container">
        <div class="page-header">
          <h1>兑奖查询</h1>
        </div>
         {{range .ubats}}
       <blockquote >
          <strong>{{.G.Cn}} @ {{.G.T}}</strong><br>
          {{.O.Cn}} @ {{getadd0 .Ol.Cn}} 号 @ {{.Od}}<br>
          <abbr title="Phone">下注额:</abbr>{{.S}}元 <p class="text-right">{{if eq .Wr 1}}
                        <span class='text-success'>赢</span>
                        {{else if eq .Wr 2}}
                        <span class='text-error'>输</span>
                        {{else if eq .Wr 3}}
                        <span class='muted'>平</span>
                        {{else}}
                        <span class='muted'>未开奖</span>
                        {{end}}
{{getWinOrLose .S .Od .Wr}} 元
                        </p>
          
       </blockquote>
        {{end}}
      </div>

      <div id="push"></div>
</div>
  
<!-- <div class="container">

    <div id="container" class="statepage">
      
        <div id="lt-center">
            <div class="bg-c-1 pd-20">
                <div id="container">
                    <div id="content-panel">
      
                    

    

        <div class="data-container settled-bet">

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

                {{range .ubats}}
                    <tr class="l1 ">
                        <td class="tac">{{.Id}}</td>
                        <td><div>{{.G.Cn}} @ {{.G.T}}</div></td>
                        <td class="bet-type">{{.O.Cn}}</td>
                        <td>{{.Ol.Cn}} 号 @ {{.Od}}</td>
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

</div> -->

</body>
</html>

