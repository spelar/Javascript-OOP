function SuperType(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}

SuperType.prototype.sayName = function() {
  console.log(this.name);
};

function SubType(name, age) {
  SuperType.call(this, name);
  this.age = age;
}

SubType.prototype = new SuperType();

SubType.prototype.sayAge = function() {
  console.log(this.age);
};

var instance1 = new SubType("David", 25);
instance1.colors.push("Black");
console.log(instance1.colors);
console.log(instance1.sayName());
console.log(instance1.sayAge());

var instance2 = new SubType("Spelar", 31);
console.log(instance2.colors);
console.log(instance2.sayName());
console.log(instance2.sayAge());
