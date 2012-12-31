var http = require('http')
  , _    = require('underscore')
  , util = require('util')
  , fs   = require('fs');

(function () {

  // 博客发布工具
  function Poster() {
  }

  Poster.prototype = {
      constructor: Poster

      // 读文件
    , readFile: function (filepath) {
        util.log("--------- 读取文件 start --------- ");
        var content = fs.readFileSync(filepath, 'utf-8')
          , cutLine = 0
          , lines   = content.split(/[\n|\r\n]/)
          , cutLineExpression = /^[+]{8,}$/;

        
        for (var i = 0; i < lines.length; i++) {
          if (cutLineExpression.test(lines[i])) {
            cutLine = i;
          }
        }

        util.log("信息分隔行: " + cutLine);
        util.log("--------- 读取文件 end --------- ");

        return {
            paramPairs: _.first(lines, cutLine)
          , bodyLines: _.last(lines, lines.length - cutLine - 1)
        };
      }

      // 获取描述
    , getDestription: function (bodyLines) {
        if (!Array.isArray(bodyLines)) {
          return '';
        }

        for (var i = 0; i < bodyLines.length; i++) {
          if (bodyLines[i].trim()) {
            return bodyLines[i];
          }
        }
        return '';
      }

      // 获得基本参数，如 分类，标签等，头部参数用 ":" 分隔
    , getParams: function(paramPairs) {
        util.log("--------- 获取文件头部参数 start --------- ");
        if (!Array.isArray(paramPairs)) {
          return;
        }

        var params = {};

        paramPairs.forEach(function (line) {
          var pair = line.split(/[:]/)
            , key = ""
            , value = "";

          if (pair.length < 2) {
            return;
          }

          key = pair[0].trim();

          if (!key) {
            return;
          }

          value = _.last(pair, pair.length - 1)
                   .join(":");

          params[key] = value;
        });

        util.log("参数json:");
        util.log(util.inspect(params));
        util.log("--------- 获取文件头部参数 end --------- ");

        return params;
      }

    , processConsoleParams: function() {
        var consoleParams = process.argv
          , pair = null;

        this.config["file"] = consoleParams[2];
        util.log("--------- 控制台参数 start --------- ");
        for (var i = 3; i < consoleParams.length; i++) {
          pair = consoleParams[i].split('=');
          this.config[pair[0]] = pair[1];
          util.log("key:" + pair[0] + ' ' + 'value:' + pair[1]);
        }
        util.log("--------- 控制台参数 end --------- ");
      }

    , sendRequest: function(paramPairs, description, body, username, password) {
        if (description) {
          paramPairs.desc = description;
        }

        paramPairs.username = username;
        paramPairs.password = password;
        paramPairs.type = 'client';
        paramPairs.body = body;
        paramPairs.create_at = new Date;
        var options = {
            url: "http://localhost"
          , path: "/article"
          , port: 3000
          , method: paramPairs.id ? "put" : "post"
        }

        var request = http.request(options, function(response) {
          util.log("正在" + (paramPairs.id ? "更新" : "创建") + "博客....");

          response.setEncoding("utf8");

          response.on("data", function(chunk) {
            chunk = JSON.parse(chunk);
            util.log("服务器返回博客id: " + chunk._id);
          });

          response.on("error", function(err) {
            util.log("链接出错了，错误码: " + response.statusCode);
          });

        });

        request.on("error", function() {
          util.error("创建请求的时候出错");
        });
        request.setHeader('Content-Type', 'application/json');
        request.write(JSON.stringify(paramPairs));

        // 开始真正发请求
        request.end();
      }

    , initialize: function() {

        this.config = {
            "file" : ""
          , "desc" : "no"
          , "username": ""
          , "password": ""
        };

        this.processConsoleParams();

        var 
            config = this.config
          , file = this.readFile(config.file)
          , paramPairs = this.getParams(file.paramPairs)
          , description = this.getDestription(config.desc == "yes" ? null : file.bodyLines)
          , body = file.bodyLines.join('\n');
        
        util.log("--------- 配置信息 start ---------");
        util.log("文件名:" + config.file);
        util.log("是否自带描述:" + config.desc);
        util.log("用户名:" + config.username);
        util.log("密码:" + config.password);
        util.log("--------- 配置信息 end ---------");

        this.sendRequest(paramPairs, description, body, config.username, config.password);
      }
  }


  var poster = new Poster();
  poster.initialize();

})();
