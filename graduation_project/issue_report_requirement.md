title: 故障报告工具iOS需求和需求分析
categories: iOS, IssueTracker
tags: iOS, requirement

++++++++++++++++++++++++++++++++++++++++++

某个公司想对自己厂商的设备所出现的各种问题进行管理，而且是基于移动平台的Issue Trakcer。这个Issue Tracker希望能完成一些提高效率的工作，其中包括了工厂人员汇报错误以及工厂维护人员汇报错误的一些进程和处理各种解决状态。

主要有下面这几个模块组成：

1. Issue 发布模块
2. Issue 阅读模块
3. 设备添加模块
4. 设备查看模块

### Issue发布模块 ###

Issue发布模块主要用于Issue的发布，每一个Issue包含下面几个字段：

* title
* reporter
* maintainer
* description
* machine
* status (undo || processing || done)

关于machine，厂商希望给他们的所有设备都贴上一个QRCode标签，在室内环境发布报告的时候只需要扫描QRCode就可以获取到对应的设备信息以减少查找的麻烦。在室外环境下，厂商希望能用gps定位的方式来搜寻距离报告人接近的设备以方便设备信息的录入。

#### Issue发布模块表单信息 ####

需要填写的表单内容必然是越少越好的，所以只提供用户下面几个表单信息用以输入：

1. title    -----    text field
2. maintainer ---    点击进入用户列表搜索
3. description --    text field
4. machine  -----    点击进入设备列表进行搜索（QRCode & 地理位置）

### Issue 阅读模块 ###

Issue的阅读要简单，就是纯粹的信息展示，只是多出来一个按钮进入下一级页面来修改当前Issue状态。


### Machine 录入模块 ###

每一个 Machine 包含下面这些字段：

* name
* location
* id

QRCode根据id来生成，location自动定位加入，表单信息里只有name和location。所以会比较简单。

### Machine 查看模块 ###

查看Machine信息有两个入口：

1. gps 定位
2. QRCode 扫描

gps搜索结果由近到远的顺序排列(Mongodb来完成)
QRCode扫描直接进入对应id的设备信息









