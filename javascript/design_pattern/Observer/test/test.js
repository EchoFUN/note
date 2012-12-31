(function(window, document, undefined) {

  var controlCheckbox = document.getElementById('mainCheckbox'),
      addBtn = document.getElementById('addNewObserver'),
      observerContainer = document.getElementById('observerContainer');

  // 给controlCheckbox写入Subject的方法，成为一个发布者
  extend(controlCheckbox, new Subject());

  controlCheckbox.onclick = function() {
    controlCheckbox.Notify(this.checked);
  };

  addBtn.onclick = AddNewObserver;

  function AddNewObserver() {
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    extend(checkbox, new Observer());

    checkbox.Update = function( value ) {
      this.checked = value;
    };

    controlCheckbox.AddObserver( checkbox );
    observerContainer.appendChild( checkbox );
  }


  controlCheckbox.parentNode.removeChild(controlCheckbox);
  addBtn.parentNode.removeChild(addBtn);
  observerContainer.parentNode.removeChild(observerContainer);


})(window, document);