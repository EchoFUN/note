(function() {

  function Person(name) {
    this.name = name || "Hehe";
  }

  function Record(person, money, when) {
    this.person = person;
    this.money = money;
    this.when = when || new Date;
  }

  function PayViewModel() {
    var self = this;

    this.paidRecords = ko.observableArray([]);
    
    this.payQueue = ko.observableArray([]);

    this.people = ko.observableArray([]);

    this.currName = ko.observable('');

    this.currentTab = ko.observable('');

    this.tabList = ['今天到谁', '名单管理', '结算记录'];

    // 增加一个人
    this.addPerson = function() {
      var self = this,
          p = new Person(self.currName());
      self.people.push(p);
      self.payQueue.push(p);
    }

    // 删除一个人
    this.removePerson = function(person) {
      self.people.remove(person);
      self.payQueue.remove(person);
    }

    // 第一个人支付了
    this.paid = function() {
      var todayPerson = self.payQueue.shift();
      self.payQueue.push(todayPerson);
    }

    // 今天该付钱的人没来
    this.jumpToNext = function() {
      var todayPerson = self.payQueue.shift();
      self.payQueue.splice(1, 0, todayPerson);
    }

    // 某人今天插队
    this.upToFirst = function(person) {
      self.payQueue.remove(person);
      self.payQueue.unshift(person);
    }

    // 切换Tab
    this.switchTab = function(tab) {
      self.currentTab(tab);
    }

  };

  ko.applyBindings(new PayViewModel);
})();