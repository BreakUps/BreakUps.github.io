# JS异步调用栈

调用栈是对程序debug时所必需的信息。正常情况下，程序运行时只保存同步调用栈。然而JS支持异步执行函数，为了更好地支持debug，JS在程序执行时也额外保存了额外的异步调用栈。考虑如下异步调用：

```javascript
function b() {
    throw new Error('b');
}
function a() {
	Promise.resolve(1).then(b);
}
a();
```

运行函数`b`时，同步调用栈是`[b]`，但异步调用栈是`[a, b]`。下图是在新版的chrome dev tool中通过打断点捕获的异步调用栈：

![js-async-stack-chrome](/raw/assets/js-async-stack-chrome.png)

 

