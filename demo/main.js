"use strict"

function loadBlink(t){
    "940c 005c 940c 006e 940c 006e 940c 006e 940c 006e 940c 006e 940c 006e 940c 006e 940c 006e 940c 006e 940c 006e 940c 006e 940c 006e 940c 006e 940c 006e 940c 006e 940c 0113 940c 006e 940c 006e 940c 006e 940c 006e 940c 006e 940c 006e 940c 006e 940c 006e 940c 006e 0000 0000 0024 0027 002a 0000 0000 0025 0028 002b 0404 0404 0404 0404 0202 0202 0202 0303 0303 0303 0201 0804 2010 8040 0201 0804 2010 0201 0804 2010 0000 0800 0200 0001 0300 0704 0000 0000 0000 0000 2411 be1f efcf e0d8 bfde bfcd e021 e0a0 e0b1 c001 921d 30a9 07b2 f7e1 940e 015d 940c 01cc 940c 0000 ebe1 e0f0 9124 e9ed e0f0 9194 e8e9 e0f0 91e4 23ee f0c9 2322 f039 3023 f101 f4a8 3021 f119 3022 f129 e0f0 0fee 1fff 58ee 4fff 91a5 91b4 b72f 94f8 91ec 1181 c026 9590 239e 939c bf2f 9508 3027 f0a9 3028 f0c9 3024 f749 9120 0080 7d2f c003 9120 0080 772f 9320 0080 cfdf b524 772f bd24 cfdb b524 7d2f cffb 9120 00b0 772f 9320 00b0 cfd2 9120 00b0 7d2f cff9 2b9e cfda b73f 94f8 9180 0105 9190 0106 91a0 0107 91b0 0108 b526 9ba8 c005 3f2f f019 9601 1da1 1db1 bf3f 2fba 2fa9 2f98 2788 01bc 01cd 0f62 1d71 1d81 1d91 e042 0f66 1f77 1f88 1f99 954a f7d1 9508 928f 929f 92af 92bf 92cf 92df 92ef 92ff 940e 00b8 014b 015c ef84 2ec8 24dd 94d3 2ce1 2cf1 940e 00b8 1968 0979 098a 099b 3e68 4073 0581 0591 f3a8 e021 1ac2 08d1 08e1 08f1 ee88 0e88 e083 1e98 1ca1 1cb1 14c1 04d1 04e1 04f1 f729 90ff 90ef 90df 90cf 90bf 90af 909f 908f 9508 921f 920f b60f 920f 2411 932f 933f 938f 939f 93af 93bf 9180 0101 9190 0102 91a0 0103 91b0 0104 9130 0100 e023 0f23 372d f558 9601 1da1 1db1 9320 0100 9380 0101 9390 0102 93a0 0103 93b0 0104 9180 0105 9190 0106 91a0 0107 91b0 0108 9601 1da1 1db1 9380 0105 9390 0106 93a0 0107 93b0 0108 91bf 91af 919f 918f 913f 912f 900f be0f 900f 901f 9518 e826 0f23 9602 1da1 1db1 cfd2 9478 b584 6082 bd84 b584 6081 bd84 b585 6082 bd85 b585 6081 bd85 9180 006e 6081 9380 006e 9210 0081 9180 0081 6082 9380 0081 9180 0081 6081 9380 0081 9180 0080 6081 9380 0080 9180 00b1 6084 9380 00b1 9180 00b0 6081 9380 00b0 9180 007a 6084 9380 007a 9180 007a 6082 9380 007a 9180 007a 6081 9380 007a 9180 007a 6880 9380 007a 9210 00c1 e9ed e0f0 9124 e8e9 e0f0 9184 2388 f099 e090 0f88 1f99 01fc 59e8 4fff 91a5 91b4 01fc 58ee 4fff 9185 9194 b78f 94f8 91ec 2be2 93ec bf8f e0c0 e0d0 e081 940e 0070 940e 00dd e080 940e 0070 940e 00dd 9720 f3a1 940e 0000 cff1 94f8 cfff"
    .split(" ").forEach(
        function(e,a){
            t[a]=parseInt(e,16)
        }
    )
}

var paused = false;
function togglePause(){
    paused = ! paused;
}

var LED = document.getElementById('led1')
// var LED = document.getElementsByClassName('led blue')
// var LED = document.getElementById('led')

var program = new Uint16Array(16384);
loadBlink(program);
var cpu = new avr8js.CPU(program);
var timer0 = new avr8js.AVRTimer(cpu, avr8js.timer0Config);
var portB = new avr8js.AVRIOPort(cpu, avr8js.portBConfig);
portB.addListener(function () {
    // var value = portB.pinState(5) === avr8js.PinState.High;
    var now = new Date()
    var value = portB.pinState(5);
    // console.log(value, now.getSeconds(), now.getMilliseconds());
    if(value){
        LED.classList.add('on')
        console.log('LED is: on');
    }
    else{
        LED.classList.remove('on')
        console.log('LED is: off');
    }
});
function runCode() {
    // if(paused){
    //     setTimeout(runCode, 1000);
    // }
    for (var i = 0; i < 50000; i++) {
        // if(paused) break;
        if(!paused) {
            avr8js.avrInstruction(cpu);
        }
        cpu.tick();
    }
    setTimeout(runCode, 0);
}
runCode();