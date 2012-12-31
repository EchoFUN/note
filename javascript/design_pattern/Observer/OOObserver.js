function ObserverList() {
  this.observerList = [];
}

ObserverList.prototype.Add = function( obj ) {
  return this.observerList.push( obj );
};

ObserverList.prototype.Empty = function( obj ) {
  return (this.observerList = []);
};

ObserverList.prototype.Count = function() {
  return this.observerList.length;
}

ObserverList.prototype.Get = function( index ) {
  return this.observerList[ index ];
};

ObserverList.prototype.IndexOf = function( obj ) {
  return this.observerList.indexOf( obj );
}

ObserverList.prototype.RemoveAt = function( index ) {
  if (index < 0 || index >= this.observerList.length) 
    return;

  var obj = this.observerList[index];
  this.observerList.splice(index, 1);
  return obj;
}

function extend(dest, src) {
  for (var key in src) {
    dest[key] = src[key];
  }
  return dest;
}

// 一个Subject，一般的OO Obserber 实现方式
function Subject() {
  this.observers = new ObserverList();
}

Subject.prototype.AddObserver = function( observer ) {
  this.observers.Add( observer );
}

Subject.prototype.RemoveObserver = function( observer ) {
  this.observer.RemoveAt( this.observer.IndexOf(observer) );
}

// 对每一个Observer调用Update方法
Subject.prototype.Notify = function( context ) {
  var count = this.observers.Count();

  for (var i = 0; i < count; i++) {
    this.observers.Get(i).Update(context);
  }
}


// Observer接口，只有一个Update方法
function Observer() {
  this.Update = function( context ) {};
}





