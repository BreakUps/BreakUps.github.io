# Typescript中type和interface的区别

Typescript中`type`和`interface`都可以用来描述对象类型，但是它们存在着很大的不同，以下总结了两者的区别：

- 表达能力：

  `type`：除了用来描述对象、函数或者混合类型，可以用来定义基本类型的别名、联合类型和交叉类型，有更广泛的类型表达能力；

  ```typescript
  type Num = number // 基本类型的别名
  type A = number | string // 联合类型
  type B = {
      name: string
  }
  type C = {
      age: number;
  }
  type D = B & C // 交叉类型
  const d: D = { 
      name: "ming",
      age: 26
  }
  
  type Func = (first: string) => void
  type Greet = {
      (message: string): string
      name: string;
  }
  ```

  

  `interface`：仅限于描述对象、函数或者混合。

  ```typescript
  interface Person{
      name: string;
      age: number
  }
  
  interface Func {
      (first: string, second: number) : void
  }
      
  interface Greet {
      (message: string): string
      name: string;
  }
  ```

  

- 拓展性：

  `interface`：可以通过声明合并来拓展，即在同一个作用域内可以多次声明同一个`interface`，多个声明会被合并起来，

  ```typescript
  interface InterfaceA {
      a: string
  }
  
  interface InterfaceA {
      b: number;
      c: boolean;
  }
  ```

  

  `type`：不支持声明合并。

  

- 继承方式：`type`和`interface`都支持继承，而且支持互相继承，但是方式不同。

  `type`：使用交叉类型（`&`）来继承
  
  ```typescript
  type Name = { 
    name: string; 
  }
  type User = Name & { age: number  };
  
  interface InterfaceA { 
    name: string; 
  }
  type B = InterfaceA & { 
    age: number; 
  }
  ```
  
  
  
  `interface`：使用`extends`关键字来继承
  
  ```typescript
  interface Name { 
    name: string; 
  }
  interface User extends Name { 
    age: number; 
  }
  
  type A = { 
    name: string; 
  }
  interface InterfaceB extends A { 
    age: number; 
  }
  
  ```
  
  
  
  