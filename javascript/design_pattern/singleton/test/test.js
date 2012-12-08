test('Test if singleton exists', 2, function() {
  ok(Singleton !== undefined, 'Singleton Exists!');
  ok(typeof Singleton.getInstance === 'function', 'getInstance is a function');
});

test('Test Singleton Functional', function() {
  var instance = Singleton.getInstance(),
      newProperty = 'Ninjia!';
  ok(instance === Singleton.getInstance(), 'Only one instance in singleton!');
  ok(instance.publicMethod() == 'Singleton Ninjia!', 'Public Method Worked!');
  ok(instance.publicProperty == "Singleton Property Ninjia!", 'Public Property worked!');

  instance.publicProperty = newProperty;
  ok(Singleton.getInstance().publicProperty == newProperty, 'All instance share the same proterties');

});

test('Test if Singleton Tester Exists', function() {
  ok(SingletonTester != undefined, 'SingletonTester Exists!');
});

test('Test SingletonTester Functional', function() {
  var singleton = SingletonTester.getInstance({
    positionX: 100,
    positionY: 100
  })

  equal(singleton, SingletonTester.getInstance({
    positionY: 200
  }), 'Singleton Must Be The Same');

  equal(SingletonTester.getInstance({
    positionX: 300
  }).positionX, 100, 'The Singleton Instance Is Static');

});