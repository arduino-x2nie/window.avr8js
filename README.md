# window.avr8js
bundle of avr8js that can be accessed via `window.avr8js` or just `avr8js`

## Motivation
Since avr8js doesn't provide a single script to play with vanilla javascript, here I create one.
So, I can run avr8js as:
```javascript
function loadBlink(t){
    "940c 005c 940c 006e 940c 006e 940c 006e...."
    .split(" ").forEach(
        function(e,a){
            t[a]=parseInt(e,16)
        }
    )
}
var cpu = new avr8js.CPU(program);
var timer0 = new avr8js.AVRTimer(cpu, avr8js.timer0Config);
var portB = new avr8js.AVRIOPort(cpu, avr8js.portBConfig);
portB.addListener(function () {
    var value = portB.pinState(5);
    if(value){
        LED.classList.add('on')
        console.log('LED is: on');
    }
    else{
        LED.classList.remove('on')
        console.log('LED is: off');
    }
});
```

## Preview
![Screen shot](/screenshot.png)

## LEDs & Colors
Out of topic, I also provide of LED which is a actually a plain `<div>` html element.
It's on/off state is a toggle of css `class`.
While its's color is either predefined class `red` (default), `yellow,green,blue`.
But we can also inject any valid css color in `color` element property (css). 

Like this:
```html
<div id="led" class="led" style="color: purple;"></div>
<div id="led" class="led on" style="color: purple;"></div>
```

Yes! you read it correctly.
We set `color`, not the `background-color`, because we can further reuse the `color` for the glow color. It wouldn't work if we use `background-color`.