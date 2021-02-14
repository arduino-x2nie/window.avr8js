(()=>{var t={675:(t,e,i)=>{"use strict";function a(t,e){const i=t.dataView.getUint16(93,!0);t.data[i]=255&t.pc,t.data[i-1]=t.pc>>8&255,t.pc22Bits&&(t.data[i-2]=t.pc>>16&255),t.dataView.setUint16(93,i-(t.pc22Bits?3:2),!0),t.data[95]&=127,t.cycles+=2,t.pc=e}i.r(e),i.d(e,{AVRClock:()=>Y,AVREEPROM:()=>L,AVRIOPort:()=>w,AVRSPI:()=>_,AVRTWI:()=>z,AVRTimer:()=>H,AVRUSART:()=>N,CPU:()=>s,EEPROMMemoryBackend:()=>W,NoopTWIEventHandler:()=>j,PinState:()=>m,avrInstruction:()=>n,avrInterrupt:()=>a,clockConfig:()=>J,eepromConfig:()=>q,portAConfig:()=>r,portBConfig:()=>o,portCConfig:()=>d,portDConfig:()=>h,portEConfig:()=>l,portFConfig:()=>p,portGConfig:()=>u,portHConfig:()=>g,portJConfig:()=>f,portKConfig:()=>C,portLConfig:()=>R,spiConfig:()=>X,timer0Config:()=>B,timer1Config:()=>U,timer2Config:()=>V,twiConfig:()=>K,usart0Config:()=>x});class s{constructor(t,e=8192){this.progMem=t,this.sramBytes=e,this.data=new Uint8Array(this.sramBytes+256),this.data16=new Uint16Array(this.data.buffer),this.dataView=new DataView(this.data.buffer),this.progBytes=new Uint8Array(this.progMem.buffer),this.readHooks=[],this.writeHooks=[],this.pendingInterrupts=[],this.clockEvents=[],this.pc22Bits=this.progBytes.length>131072,this.gpioTimerHooks=[],this.pc=0,this.cycles=0,this.nextInterrupt=-1,this.nextClockEvent=0,this.reset()}reset(){this.data.fill(0),this.SP=this.data.length-1,this.pendingInterrupts.splice(0,this.pendingInterrupts.length),this.nextInterrupt=-1}readData(t){return t>=32&&this.readHooks[t]?this.readHooks[t](t):this.data[t]}writeData(t,e){const i=this.writeHooks[t];i&&i(e,this.data[t],t)||(this.data[t]=e)}get SP(){return this.dataView.getUint16(93,!0)}set SP(t){this.dataView.setUint16(93,t,!0)}get SREG(){return this.data[95]}get interruptsEnabled(){return!!(128&this.SREG)}updateNextInterrupt(){this.nextInterrupt=this.pendingInterrupts.findIndex((t=>!!t))}setInterruptFlag(t){const{flagRegister:e,flagMask:i,enableRegister:a,enableMask:s}=t;t.constant?this.data[e]&=~i:this.data[e]|=i,this.data[a]&s&&this.queueInterrupt(t)}updateInterruptEnable(t,e){const{enableMask:i,flagRegister:a,flagMask:s}=t;e&i?this.data[a]&s&&this.queueInterrupt(t):this.clearInterrupt(t,!1)}queueInterrupt(t){this.pendingInterrupts[t.address]=t,this.updateNextInterrupt()}clearInterrupt({address:t,flagRegister:e,flagMask:i},a=!0){delete this.pendingInterrupts[t],a&&(this.data[e]&=~i),this.updateNextInterrupt()}clearInterruptByFlag(t,e){const{flagRegister:i,flagMask:a}=t;e&a&&(this.data[i]&=~a,this.clearInterrupt(t))}addClockEvent(t,e){const i={cycles:this.cycles+Math.max(1,e),callback:t},{clockEvents:a}=this;if(!a.length||a[a.length-1].cycles<=i.cycles)a.push(i);else if(a[0].cycles>=i.cycles)a.unshift(i);else for(let t=1;t<a.length;t++)if(a[t].cycles>=i.cycles){a.splice(t,0,i);break}return this.nextClockEvent=this.clockEvents[0].cycles,t}updateClockEvent(t,e){return!!this.clearClockEvent(t)&&(this.addClockEvent(t,e),!0)}clearClockEvent(t){var e,i;const a=this.clockEvents.findIndex((e=>e.callback===t));return a>=0&&(this.clockEvents.splice(a,1),this.nextClockEvent=null!==(i=null===(e=this.clockEvents[0])||void 0===e?void 0:e.cycles)&&void 0!==i?i:0,!0)}tick(){var t,e,i;const{nextClockEvent:s,clockEvents:c}=this;s&&s<=this.cycles&&(null===(t=c.shift())||void 0===t||t.callback(),this.nextClockEvent=null!==(i=null===(e=c[0])||void 0===e?void 0:e.cycles)&&void 0!==i?i:0);const{nextInterrupt:n}=this;if(this.interruptsEnabled&&n>=0){const t=this.pendingInterrupts[n];a(this,t.address),t.constant||this.clearInterrupt(t)}}}function c(t){return 36864==(65039&t)||37376==(65039&t)||37902==(65038&t)||37900==(65038&t)}function n(t){const e=t.progMem[t.pc];if(7168==(64512&e)){const i=t.data[(496&e)>>4],a=t.data[15&e|(512&e)>>5],s=i+a+(1&t.data[95]),c=255&s;t.data[(496&e)>>4]=c;let n=192&t.data[95];n|=c?0:2,n|=128&c?4:0,n|=(c^a)&(i^c)&128?8:0,n|=n>>2&1^n>>3&1?16:0,n|=256&s?1:0,n|=1&(i&a|a&~c|~c&i)?32:0,t.data[95]=n}else if(3072==(64512&e)){const i=t.data[(496&e)>>4],a=t.data[15&e|(512&e)>>5],s=i+a&255;t.data[(496&e)>>4]=s;let c=192&t.data[95];c|=s?0:2,c|=128&s?4:0,c|=(s^a)&(s^i)&128?8:0,c|=c>>2&1^c>>3&1?16:0,c|=i+a&256?1:0,c|=1&(i&a|a&~s|~s&i)?32:0,t.data[95]=c}else if(38400==(65280&e)){const i=2*((48&e)>>4)+24,a=t.dataView.getUint16(i,!0),s=a+(15&e|(192&e)>>2)&65535;t.dataView.setUint16(i,s,!0);let c=224&t.data[95];c|=s?0:2,c|=32768&s?4:0,c|=~a&s&32768?8:0,c|=c>>2&1^c>>3&1?16:0,c|=~s&a&32768?1:0,t.data[95]=c,t.cycles++}else if(8192==(64512&e)){const i=t.data[(496&e)>>4]&t.data[15&e|(512&e)>>5];t.data[(496&e)>>4]=i;let a=225&t.data[95];a|=i?0:2,a|=128&i?4:0,a|=a>>2&1^a>>3&1?16:0,t.data[95]=a}else if(28672==(61440&e)){const i=t.data[16+((240&e)>>4)]&(15&e|(3840&e)>>4);t.data[16+((240&e)>>4)]=i;let a=225&t.data[95];a|=i?0:2,a|=128&i?4:0,a|=a>>2&1^a>>3&1?16:0,t.data[95]=a}else if(37893==(65039&e)){const i=t.data[(496&e)>>4],a=i>>>1|128&i;t.data[(496&e)>>4]=a;let s=224&t.data[95];s|=a?0:2,s|=128&a?4:0,s|=1&i,s|=s>>2&1^1&s?8:0,s|=s>>2&1^s>>3&1?16:0,t.data[95]=s}else if(38024==(65423&e))t.data[95]&=~(1<<((112&e)>>4));else if(63488==(65032&e)){const i=7&e,a=(496&e)>>4;t.data[a]=~(1<<i)&t.data[a]|(t.data[95]>>6&1)<<i}else if(62464==(64512&e))t.data[95]&1<<(7&e)||(t.pc=t.pc+(((504&e)>>3)-(512&e?64:0)),t.cycles++);else if(61440==(64512&e))t.data[95]&1<<(7&e)&&(t.pc=t.pc+(((504&e)>>3)-(512&e?64:0)),t.cycles++);else if(37896==(65423&e))t.data[95]|=1<<((112&e)>>4);else if(64e3==(65032&e)){const i=t.data[(496&e)>>4],a=7&e;t.data[95]=191&t.data[95]|(i>>a&1?64:0)}else if(37902==(65038&e)){const i=t.progMem[t.pc+1]|(1&e)<<16|(496&e)<<13,a=t.pc+2,s=t.dataView.getUint16(93,!0),{pc22Bits:c}=t;t.data[s]=255&a,t.data[s-1]=a>>8&255,c&&(t.data[s-2]=a>>16&255),t.dataView.setUint16(93,s-(c?3:2),!0),t.pc=i-1,t.cycles+=c?4:3}else if(38912==(65280&e)){const i=248&e,a=7&e,s=t.readData(32+(i>>3));t.writeData(32+(i>>3),s&~(1<<a))}else if(37888==(65039&e)){const i=(496&e)>>4,a=255-t.data[i];t.data[i]=a;let s=225&t.data[95]|1;s|=a?0:2,s|=128&a?4:0,s|=s>>2&1^s>>3&1?16:0,t.data[95]=s}else if(5120==(64512&e)){const i=t.data[(496&e)>>4],a=t.data[15&e|(512&e)>>5],s=i-a;let c=192&t.data[95];c|=s?0:2,c|=128&s?4:0,c|=0!=((i^a)&(i^s)&128)?8:0,c|=c>>2&1^c>>3&1?16:0,c|=a>i?1:0,c|=1&(~i&a|a&s|s&~i)?32:0,t.data[95]=c}else if(1024==(64512&e)){const i=t.data[(496&e)>>4],a=t.data[15&e|(512&e)>>5];let s=t.data[95];const c=i-a-(1&s);s=192&s|(!c&&s>>1&1?2:0)|(a+(1&s)>i?1:0),s|=128&c?4:0,s|=(i^a)&(i^c)&128?8:0,s|=s>>2&1^s>>3&1?16:0,s|=1&(~i&a|a&c|c&~i)?32:0,t.data[95]=s}else if(12288==(61440&e)){const i=t.data[16+((240&e)>>4)],a=15&e|(3840&e)>>4,s=i-a;let c=192&t.data[95];c|=s?0:2,c|=128&s?4:0,c|=(i^a)&(i^s)&128?8:0,c|=c>>2&1^c>>3&1?16:0,c|=a>i?1:0,c|=1&(~i&a|a&s|s&~i)?32:0,t.data[95]=c}else if(4096==(64512&e)){if(t.data[(496&e)>>4]===t.data[15&e|(512&e)>>5]){const e=c(t.progMem[t.pc+1])?2:1;t.pc+=e,t.cycles+=e}}else if(37898==(65039&e)){const i=t.data[(496&e)>>4],a=i-1;t.data[(496&e)>>4]=a;let s=225&t.data[95];s|=a?0:2,s|=128&a?4:0,s|=128===i?8:0,s|=s>>2&1^s>>3&1?16:0,t.data[95]=s}else if(38169===e){const e=t.pc+1,i=t.dataView.getUint16(93,!0),a=t.data[92];t.data[i]=255&e,t.data[i-1]=e>>8&255,t.data[i-2]=e>>16&255,t.dataView.setUint16(93,i-3,!0),t.pc=(a<<16|t.dataView.getUint16(30,!0))-1,t.cycles+=3}else if(37913===e){const e=t.data[92];t.pc=(e<<16|t.dataView.getUint16(30,!0))-1,t.cycles++}else if(38360===e){const e=t.data[91];t.data[0]=t.progBytes[e<<16|t.dataView.getUint16(30,!0)],t.cycles+=2}else if(36870==(65039&e)){const i=t.data[91];t.data[(496&e)>>4]=t.progBytes[i<<16|t.dataView.getUint16(30,!0)],t.cycles+=2}else if(36871==(65039&e)){const i=t.data[91],a=t.dataView.getUint16(30,!0);t.data[(496&e)>>4]=t.progBytes[i<<16|a],t.dataView.setUint16(30,a+1,!0),65535===a&&(t.data[91]=(i+1)%(t.progBytes.length>>16)),t.cycles+=2}else if(9216==(64512&e)){const i=t.data[(496&e)>>4]^t.data[15&e|(512&e)>>5];t.data[(496&e)>>4]=i;let a=225&t.data[95];a|=i?0:2,a|=128&i?4:0,a|=a>>2&1^a>>3&1?16:0,t.data[95]=a}else if(776==(65416&e)){const i=t.data[16+((112&e)>>4)],a=t.data[16+(7&e)],s=i*a<<1;t.dataView.setUint16(0,s,!0),t.data[95]=252&t.data[95]|(65535&s?0:2)|(i*a&32768?1:0),t.cycles++}else if(896==(65416&e)){const i=t.dataView.getInt8(16+((112&e)>>4)),a=t.dataView.getInt8(16+(7&e)),s=i*a<<1;t.dataView.setInt16(0,s,!0),t.data[95]=252&t.data[95]|(65535&s?0:2)|(i*a&32768?1:0),t.cycles++}else if(904==(65416&e)){const i=t.dataView.getInt8(16+((112&e)>>4)),a=t.data[16+(7&e)],s=i*a<<1;t.dataView.setInt16(0,s,!0),t.data[95]=252&t.data[95]|(65535&s?2:0)|(i*a&32768?1:0),t.cycles++}else if(38153===e){const e=t.pc+1,i=t.dataView.getUint16(93,!0),{pc22Bits:a}=t;t.data[i]=255&e,t.data[i-1]=e>>8&255,a&&(t.data[i-2]=e>>16&255),t.dataView.setUint16(93,i-(a?3:2),!0),t.pc=t.dataView.getUint16(30,!0)-1,t.cycles+=a?3:2}else if(37897===e)t.pc=t.dataView.getUint16(30,!0)-1,t.cycles++;else if(45056==(63488&e)){const i=t.readData(32+(15&e|(1536&e)>>5));t.data[(496&e)>>4]=i}else if(37891==(65039&e)){const i=t.data[(496&e)>>4],a=i+1&255;t.data[(496&e)>>4]=a;let s=225&t.data[95];s|=a?0:2,s|=128&a?4:0,s|=127===i?8:0,s|=s>>2&1^s>>3&1?16:0,t.data[95]=s}else if(37900==(65038&e))t.pc=(t.progMem[t.pc+1]|(1&e)<<16|(496&e)<<13)-1,t.cycles+=2;else if(37382==(65039&e)){const i=(496&e)>>4,a=t.data[i],s=t.readData(t.dataView.getUint16(30,!0));t.writeData(t.dataView.getUint16(30,!0),s&255-a),t.data[i]=s}else if(37381==(65039&e)){const i=(496&e)>>4,a=t.data[i],s=t.readData(t.dataView.getUint16(30,!0));t.writeData(t.dataView.getUint16(30,!0),s|a),t.data[i]=s}else if(37383==(65039&e)){const i=t.data[(496&e)>>4],a=t.readData(t.dataView.getUint16(30,!0));t.writeData(t.dataView.getUint16(30,!0),i^a),t.data[(496&e)>>4]=a}else if(57344==(61440&e))t.data[16+((240&e)>>4)]=15&e|(3840&e)>>4;else if(36864==(65039&e)){t.cycles++;const i=t.readData(t.progMem[t.pc+1]);t.data[(496&e)>>4]=i,t.pc++}else if(36876==(65039&e))t.cycles++,t.data[(496&e)>>4]=t.readData(t.dataView.getUint16(26,!0));else if(36877==(65039&e)){const i=t.dataView.getUint16(26,!0);t.cycles++,t.data[(496&e)>>4]=t.readData(i),t.dataView.setUint16(26,i+1,!0)}else if(36878==(65039&e)){const i=t.dataView.getUint16(26,!0)-1;t.dataView.setUint16(26,i,!0),t.cycles++,t.data[(496&e)>>4]=t.readData(i)}else if(32776==(65039&e))t.cycles++,t.data[(496&e)>>4]=t.readData(t.dataView.getUint16(28,!0));else if(36873==(65039&e)){const i=t.dataView.getUint16(28,!0);t.cycles++,t.data[(496&e)>>4]=t.readData(i),t.dataView.setUint16(28,i+1,!0)}else if(36874==(65039&e)){const i=t.dataView.getUint16(28,!0)-1;t.dataView.setUint16(28,i,!0),t.cycles++,t.data[(496&e)>>4]=t.readData(i)}else if(32776==(53768&e)&&7&e|(3072&e)>>7|(8192&e)>>8)t.cycles++,t.data[(496&e)>>4]=t.readData(t.dataView.getUint16(28,!0)+(7&e|(3072&e)>>7|(8192&e)>>8));else if(32768==(65039&e))t.cycles++,t.data[(496&e)>>4]=t.readData(t.dataView.getUint16(30,!0));else if(36865==(65039&e)){const i=t.dataView.getUint16(30,!0);t.cycles++,t.data[(496&e)>>4]=t.readData(i),t.dataView.setUint16(30,i+1,!0)}else if(36866==(65039&e)){const i=t.dataView.getUint16(30,!0)-1;t.dataView.setUint16(30,i,!0),t.cycles++,t.data[(496&e)>>4]=t.readData(i)}else if(32768==(53768&e)&&7&e|(3072&e)>>7|(8192&e)>>8)t.cycles++,t.data[(496&e)>>4]=t.readData(t.dataView.getUint16(30,!0)+(7&e|(3072&e)>>7|(8192&e)>>8));else if(38344===e)t.data[0]=t.progBytes[t.dataView.getUint16(30,!0)],t.cycles+=2;else if(36868==(65039&e))t.data[(496&e)>>4]=t.progBytes[t.dataView.getUint16(30,!0)],t.cycles+=2;else if(36869==(65039&e)){const i=t.dataView.getUint16(30,!0);t.data[(496&e)>>4]=t.progBytes[i],t.dataView.setUint16(30,i+1,!0),t.cycles+=2}else if(37894==(65039&e)){const i=t.data[(496&e)>>4],a=i>>>1;t.data[(496&e)>>4]=a;let s=224&t.data[95];s|=a?0:2,s|=1&i,s|=s>>2&1^1&s?8:0,s|=s>>2&1^s>>3&1?16:0,t.data[95]=s}else if(11264==(64512&e))t.data[(496&e)>>4]=t.data[15&e|(512&e)>>5];else if(256==(65280&e)){const i=2*(15&e),a=2*((240&e)>>4);t.data[a]=t.data[i],t.data[a+1]=t.data[i+1]}else if(39936==(64512&e)){const i=t.data[(496&e)>>4]*t.data[15&e|(512&e)>>5];t.dataView.setUint16(0,i,!0),t.data[95]=252&t.data[95]|(65535&i?0:2)|(32768&i?1:0),t.cycles++}else if(512==(65280&e)){const i=t.dataView.getInt8(16+((240&e)>>4))*t.dataView.getInt8(16+(15&e));t.dataView.setInt16(0,i,!0),t.data[95]=252&t.data[95]|(65535&i?0:2)|(32768&i?1:0),t.cycles++}else if(768==(65416&e)){const i=t.dataView.getInt8(16+((112&e)>>4))*t.data[16+(7&e)];t.dataView.setInt16(0,i,!0),t.data[95]=252&t.data[95]|(65535&i?0:2)|(32768&i?1:0),t.cycles++}else if(37889==(65039&e)){const i=(496&e)>>4,a=t.data[i],s=0-a;t.data[i]=s;let c=192&t.data[95];c|=s?0:2,c|=128&s?4:0,c|=128===s?8:0,c|=c>>2&1^c>>3&1?16:0,c|=s?1:0,c|=1&(s|a)?32:0,t.data[95]=c}else if(0===e);else if(10240==(64512&e)){const i=t.data[(496&e)>>4]|t.data[15&e|(512&e)>>5];t.data[(496&e)>>4]=i;let a=225&t.data[95];a|=i?0:2,a|=128&i?4:0,a|=a>>2&1^a>>3&1?16:0,t.data[95]=a}else if(24576==(61440&e)){const i=t.data[16+((240&e)>>4)]|15&e|(3840&e)>>4;t.data[16+((240&e)>>4)]=i;let a=225&t.data[95];a|=i?0:2,a|=128&i?4:0,a|=a>>2&1^a>>3&1?16:0,t.data[95]=a}else if(47104==(63488&e))t.writeData(32+(15&e|(1536&e)>>5),t.data[(496&e)>>4]);else if(36879==(65039&e)){const i=t.dataView.getUint16(93,!0)+1;t.dataView.setUint16(93,i,!0),t.data[(496&e)>>4]=t.data[i],t.cycles++}else if(37391==(65039&e)){const i=t.dataView.getUint16(93,!0);t.data[i]=t.data[(496&e)>>4],t.dataView.setUint16(93,i-1,!0),t.cycles++}else if(53248==(61440&e)){const i=(2047&e)-(2048&e?2048:0),a=t.pc+1,s=t.dataView.getUint16(93,!0),{pc22Bits:c}=t;t.data[s]=255&a,t.data[s-1]=a>>8&255,c&&(t.data[s-2]=a>>16&255),t.dataView.setUint16(93,s-(c?3:2),!0),t.pc+=i,t.cycles+=c?3:2}else if(38152===e){const{pc22Bits:e}=t,i=t.dataView.getUint16(93,!0)+(e?3:2);t.dataView.setUint16(93,i,!0),t.pc=(t.data[i-1]<<8)+t.data[i]-1,e&&(t.pc|=t.data[i-2]<<16),t.cycles+=e?4:3}else if(38168===e){const{pc22Bits:e}=t,i=t.dataView.getUint16(93,!0)+(e?3:2);t.dataView.setUint16(93,i,!0),t.pc=(t.data[i-1]<<8)+t.data[i]-1,e&&(t.pc|=t.data[i-2]<<16),t.cycles+=e?4:3,t.data[95]|=128}else if(49152==(61440&e))t.pc=t.pc+((2047&e)-(2048&e?2048:0)),t.cycles++;else if(37895==(65039&e)){const i=t.data[(496&e)>>4],a=i>>>1|(1&t.data[95])<<7;t.data[(496&e)>>4]=a;let s=224&t.data[95];s|=a?0:2,s|=128&a?4:0,s|=1&i?1:0,s|=s>>2&1^1&s?8:0,s|=s>>2&1^s>>3&1?16:0,t.data[95]=s}else if(2048==(64512&e)){const i=t.data[(496&e)>>4],a=t.data[15&e|(512&e)>>5];let s=t.data[95];const c=i-a-(1&s);t.data[(496&e)>>4]=c,s=192&s|(!c&&s>>1&1?2:0)|(a+(1&s)>i?1:0),s|=128&c?4:0,s|=(i^a)&(i^c)&128?8:0,s|=s>>2&1^s>>3&1?16:0,s|=1&(~i&a|a&c|c&~i)?32:0,t.data[95]=s}else if(16384==(61440&e)){const i=t.data[16+((240&e)>>4)],a=15&e|(3840&e)>>4;let s=t.data[95];const c=i-a-(1&s);t.data[16+((240&e)>>4)]=c,s=192&s|(!c&&s>>1&1?2:0)|(a+(1&s)>i?1:0),s|=128&c?4:0,s|=(i^a)&(i^c)&128?8:0,s|=s>>2&1^s>>3&1?16:0,s|=1&(~i&a|a&c|c&~i)?32:0,t.data[95]=s}else if(39424==(65280&e)){const i=32+((248&e)>>3);t.writeData(i,t.readData(i)|1<<(7&e)),t.cycles++}else if(39168==(65280&e)){if(!(t.readData(32+((248&e)>>3))&1<<(7&e))){const e=c(t.progMem[t.pc+1])?2:1;t.cycles+=e,t.pc+=e}}else if(39680==(65280&e)){if(t.readData(32+((248&e)>>3))&1<<(7&e)){const e=c(t.progMem[t.pc+1])?2:1;t.cycles+=e,t.pc+=e}}else if(38656==(65280&e)){const i=2*((48&e)>>4)+24,a=t.dataView.getUint16(i,!0),s=15&e|(192&e)>>2,c=a-s;t.dataView.setUint16(i,c,!0);let n=192&t.data[95];n|=c?0:2,n|=32768&c?4:0,n|=a&~c&32768?8:0,n|=n>>2&1^n>>3&1?16:0,n|=s>a?1:0,n|=1&(~a&s|s&c|c&~a)?32:0,t.data[95]=n,t.cycles++}else if(64512==(65032&e)){if(!(t.data[(496&e)>>4]&1<<(7&e))){const e=c(t.progMem[t.pc+1])?2:1;t.cycles+=e,t.pc+=e}}else if(65024==(65032&e)){if(t.data[(496&e)>>4]&1<<(7&e)){const e=c(t.progMem[t.pc+1])?2:1;t.cycles+=e,t.pc+=e}}else if(38280===e);else if(38376===e);else if(38392===e);else if(37376==(65039&e)){const i=t.data[(496&e)>>4],a=t.progMem[t.pc+1];t.writeData(a,i),t.pc++,t.cycles++}else if(37388==(65039&e))t.writeData(t.dataView.getUint16(26,!0),t.data[(496&e)>>4]),t.cycles++;else if(37389==(65039&e)){const i=t.dataView.getUint16(26,!0);t.writeData(i,t.data[(496&e)>>4]),t.dataView.setUint16(26,i+1,!0),t.cycles++}else if(37390==(65039&e)){const i=t.data[(496&e)>>4],a=t.dataView.getUint16(26,!0)-1;t.dataView.setUint16(26,a,!0),t.writeData(a,i),t.cycles++}else if(33288==(65039&e))t.writeData(t.dataView.getUint16(28,!0),t.data[(496&e)>>4]),t.cycles++;else if(37385==(65039&e)){const i=t.data[(496&e)>>4],a=t.dataView.getUint16(28,!0);t.writeData(a,i),t.dataView.setUint16(28,a+1,!0),t.cycles++}else if(37386==(65039&e)){const i=t.data[(496&e)>>4],a=t.dataView.getUint16(28,!0)-1;t.dataView.setUint16(28,a,!0),t.writeData(a,i),t.cycles++}else if(33288==(53768&e)&&7&e|(3072&e)>>7|(8192&e)>>8)t.writeData(t.dataView.getUint16(28,!0)+(7&e|(3072&e)>>7|(8192&e)>>8),t.data[(496&e)>>4]),t.cycles++;else if(33280==(65039&e))t.writeData(t.dataView.getUint16(30,!0),t.data[(496&e)>>4]),t.cycles++;else if(37377==(65039&e)){const i=t.dataView.getUint16(30,!0);t.writeData(i,t.data[(496&e)>>4]),t.dataView.setUint16(30,i+1,!0),t.cycles++}else if(37378==(65039&e)){const i=t.data[(496&e)>>4],a=t.dataView.getUint16(30,!0)-1;t.dataView.setUint16(30,a,!0),t.writeData(a,i),t.cycles++}else if(33280==(53768&e)&&7&e|(3072&e)>>7|(8192&e)>>8)t.writeData(t.dataView.getUint16(30,!0)+(7&e|(3072&e)>>7|(8192&e)>>8),t.data[(496&e)>>4]),t.cycles++;else if(6144==(64512&e)){const i=t.data[(496&e)>>4],a=t.data[15&e|(512&e)>>5],s=i-a;t.data[(496&e)>>4]=s;let c=192&t.data[95];c|=s?0:2,c|=128&s?4:0,c|=(i^a)&(i^s)&128?8:0,c|=c>>2&1^c>>3&1?16:0,c|=a>i?1:0,c|=1&(~i&a|a&s|s&~i)?32:0,t.data[95]=c}else if(20480==(61440&e)){const i=t.data[16+((240&e)>>4)],a=15&e|(3840&e)>>4,s=i-a;t.data[16+((240&e)>>4)]=s;let c=192&t.data[95];c|=s?0:2,c|=128&s?4:0,c|=(i^a)&(i^s)&128?8:0,c|=c>>2&1^c>>3&1?16:0,c|=a>i?1:0,c|=1&(~i&a|a&s|s&~i)?32:0,t.data[95]=c}else if(37890==(65039&e)){const i=(496&e)>>4,a=t.data[i];t.data[i]=(15&a)<<4|(240&a)>>>4}else if(38312===e);else if(37380==(65039&e)){const i=(496&e)>>4,a=t.data[i],s=t.data[t.dataView.getUint16(30,!0)];t.data[t.dataView.getUint16(30,!0)]=a,t.data[i]=s}t.pc=(t.pc+1)%t.progMem.length,t.cycles++}const r={PIN:32,DDR:33,PORT:34},o={PIN:35,DDR:36,PORT:37},d={PIN:38,DDR:39,PORT:40},h={PIN:41,DDR:42,PORT:43},l={PIN:44,DDR:45,PORT:46},p={PIN:47,DDR:48,PORT:49},u={PIN:50,DDR:51,PORT:52},g={PIN:256,DDR:257,PORT:258},f={PIN:259,DDR:260,PORT:261},C={PIN:262,DDR:263,PORT:264},R={PIN:265,DDR:266,PORT:267};var m,y;!function(t){t[t.Low=0]="Low",t[t.High=1]="High",t[t.Input=2]="Input",t[t.InputPullUp=3]="InputPullUp"}(m||(m={})),function(t){t[t.None=0]="None",t[t.Enable=1]="Enable",t[t.Set=2]="Set",t[t.Clear=3]="Clear",t[t.Toggle=4]="Toggle"}(y||(y={}));class w{constructor(t,e){this.cpu=t,this.portConfig=e,this.listeners=[],this.pinValue=0,this.overrideMask=255,this.lastValue=0,this.lastDdr=0,t.writeHooks[e.DDR]=i=>{const a=t.data[e.PORT];return t.data[e.DDR]=i,this.updatePinRegister(a,i),this.writeGpio(a,i),!0},t.writeHooks[e.PORT]=i=>{const a=t.data[e.DDR];return t.data[e.PORT]=i,this.updatePinRegister(i,a),this.writeGpio(i,a),!0},t.writeHooks[e.PIN]=i=>{const a=t.data[e.PORT],s=t.data[e.DDR],c=a^i;return t.data[e.PORT]=c,t.data[e.PIN]=t.data[e.PIN]&~s|c&s,this.writeGpio(c,s),!0},t.gpioTimerHooks[e.PORT]=(i,a)=>{const s=1<<i;if(a==y.None)this.overrideMask|=s;else switch(this.overrideMask&=~s,a){case y.Enable:this.overrideValue&=~s,this.overrideValue|=t.data[e.PORT]&s;break;case y.Set:this.overrideValue|=s;break;case y.Clear:this.overrideValue&=~s;break;case y.Toggle:this.overrideValue^=s}this.writeGpio(t.data[e.PORT],t.data[e.DDR])}}addListener(t){this.listeners.push(t)}removeListener(t){this.listeners=this.listeners.filter((e=>e!==t))}pinState(t){const e=this.cpu.data[this.portConfig.DDR],i=this.cpu.data[this.portConfig.PORT],a=1<<t;return e&a?this.lastValue&a?m.High:m.Low:i&a?m.InputPullUp:m.Input}setPin(t,e){const i=1<<t;this.pinValue&=~i,e&&(this.pinValue|=i),this.updatePinRegister(this.cpu.data[this.portConfig.PORT],this.cpu.data[this.portConfig.DDR])}updatePinRegister(t,e){this.cpu.data[this.portConfig.PIN]=this.pinValue&~e|t&e}writeGpio(t,e){const i=(t&this.overrideMask|this.overrideValue)&e|t&~e,a=this.lastValue;if(i!==a||e!==this.lastDdr){this.lastValue=i,this.lastDdr=e;for(const t of this.listeners)t(i,a)}}}const I={0:0,1:1,2:8,3:64,4:256,5:1024,6:0,7:0},T={TOV:1,OCFA:2,OCFB:4,TOIE:1,OCIEA:2,OCIEB:4},B=Object.assign({bits:8,captureInterrupt:0,compAInterrupt:28,compBInterrupt:30,ovfInterrupt:32,TIFR:53,OCRA:71,OCRB:72,ICR:0,TCNT:70,TCCRA:68,TCCRB:69,TCCRC:0,TIMSK:110,dividers:I,compPortA:h.PORT,compPinA:6,compPortB:h.PORT,compPinB:5},T),U=Object.assign({bits:16,captureInterrupt:20,compAInterrupt:22,compBInterrupt:24,ovfInterrupt:26,TIFR:54,OCRA:136,OCRB:138,ICR:134,TCNT:132,TCCRA:128,TCCRB:129,TCCRC:130,TIMSK:111,dividers:I,compPortA:o.PORT,compPinA:1,compPortB:o.PORT,compPinB:2},T),V=Object.assign({bits:8,captureInterrupt:0,compAInterrupt:14,compBInterrupt:16,ovfInterrupt:18,TIFR:55,OCRA:179,OCRB:180,ICR:0,TCNT:178,TCCRA:176,TCCRB:177,TCCRC:0,TIMSK:112,dividers:{0:0,1:1,2:8,3:32,4:64,5:128,6:256,7:1024},compPortA:o.PORT,compPinA:3,compPortB:h.PORT,compPinB:3},T);var P,k,v;!function(t){t[t.Normal=0]="Normal",t[t.PWMPhaseCorrect=1]="PWMPhaseCorrect",t[t.CTC=2]="CTC",t[t.FastPWM=3]="FastPWM",t[t.PWMPhaseFrequencyCorrect=4]="PWMPhaseFrequencyCorrect",t[t.Reserved=5]="Reserved"}(P||(P={})),function(t){t[t.Max=0]="Max",t[t.Top=1]="Top",t[t.Bottom=2]="Bottom"}(k||(k={})),function(t){t[t.Immediate=0]="Immediate",t[t.Top=1]="Top",t[t.Bottom=2]="Bottom"}(v||(v={}));const{Normal:D,PWMPhaseCorrect:M,CTC:E,FastPWM:A,Reserved:O,PWMPhaseFrequencyCorrect:S}=P,b=[[D,255,v.Immediate,k.Max,0],[M,255,v.Top,k.Bottom,0],[E,1,v.Immediate,k.Max,0],[A,255,v.Bottom,k.Max,0],[O,255,v.Immediate,k.Max,0],[M,1,v.Top,k.Bottom,1],[O,255,v.Immediate,k.Max,0],[A,1,v.Bottom,k.Top,1]],F=[[D,65535,v.Immediate,k.Max,0],[M,255,v.Top,k.Bottom,0],[M,511,v.Top,k.Bottom,0],[M,1023,v.Top,k.Bottom,0],[E,1,v.Immediate,k.Max,0],[A,255,v.Bottom,k.Top,0],[A,511,v.Bottom,k.Top,0],[A,1023,v.Bottom,k.Top,0],[S,2,v.Bottom,k.Bottom,0],[S,1,v.Bottom,k.Bottom,1],[M,2,v.Top,k.Bottom,0],[M,1,v.Top,k.Bottom,1],[E,2,v.Immediate,k.Max,0],[O,65535,v.Immediate,k.Max,0],[A,2,v.Bottom,k.Top,1],[A,1,v.Bottom,k.Top,1]];class H{constructor(t,e){if(this.cpu=t,this.config=e,this.MAX=16===this.config.bits?65535:255,this.lastCycle=0,this.ocrA=0,this.nextOcrA=0,this.ocrB=0,this.nextOcrB=0,this.ocrUpdateMode=v.Immediate,this.tovUpdateMode=k.Max,this.icr=0,this.tcnt=0,this.tcntNext=0,this.tcntUpdated=!1,this.updateDivider=!1,this.countingUp=!0,this.divider=0,this.highByteTemp=0,this.OVF={address:this.config.ovfInterrupt,flagRegister:this.config.TIFR,flagMask:this.config.TOV,enableRegister:this.config.TIMSK,enableMask:this.config.TOIE},this.OCFA={address:this.config.compAInterrupt,flagRegister:this.config.TIFR,flagMask:this.config.OCFA,enableRegister:this.config.TIMSK,enableMask:this.config.OCIEA},this.OCFB={address:this.config.compBInterrupt,flagRegister:this.config.TIFR,flagMask:this.config.OCFB,enableRegister:this.config.TIMSK,enableMask:this.config.OCIEB},this.count=(t=!0)=>{const{divider:e,lastCycle:i,cpu:a}=this,{cycles:s}=a,c=s-i;if(e&&c>=e){const t=Math.floor(c/e);this.lastCycle+=t*e;const i=this.tcnt,{timerMode:s,TOP:n}=this,r=s===M||s===S,o=r?this.phasePwmCount(i,t):(i+t)%(n+1),d=i+t>n;if(this.tcntUpdated||(this.tcnt=o,r||this.timerUpdated(o,i)),!r){if(s===A&&d){const{compA:t,compB:e}=this;t&&this.updateCompPin(t,"A",!0),e&&this.updateCompPin(e,"B",!0)}this.ocrUpdateMode==v.Bottom&&d&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB),!d||this.tovUpdateMode!=k.Top&&n!==this.MAX||a.setInterruptFlag(this.OVF)}}if(this.tcntUpdated&&(this.tcnt=this.tcntNext,this.tcntUpdated=!1),this.updateDivider){const t=this.config.dividers[this.CS];return this.lastCycle=t?this.cpu.cycles:0,this.updateDivider=!1,this.divider=t,void(t&&a.addClockEvent(this.count,this.lastCycle+t-a.cycles))}t&&e&&a.addClockEvent(this.count,this.lastCycle+e-a.cycles)},this.updateWGMConfig(),this.cpu.readHooks[e.TCNT]=t=>(this.count(!1),16===this.config.bits&&(this.cpu.data[t+1]=this.tcnt>>8),this.cpu.data[t]=255&this.tcnt),this.cpu.writeHooks[e.TCNT]=t=>{this.tcntNext=this.highByteTemp<<8|t,this.countingUp=!0,this.tcntUpdated=!0,this.cpu.updateClockEvent(this.count,0),this.divider&&this.timerUpdated(this.tcntNext,this.tcntNext)},this.cpu.writeHooks[e.OCRA]=t=>{this.nextOcrA=this.highByteTemp<<8|t,this.ocrUpdateMode===v.Immediate&&(this.ocrA=this.nextOcrA)},this.cpu.writeHooks[e.OCRB]=t=>{this.nextOcrB=this.highByteTemp<<8|t,this.ocrUpdateMode===v.Immediate&&(this.ocrB=this.nextOcrB)},this.cpu.writeHooks[e.ICR]=t=>{this.icr=this.highByteTemp<<8|t},16===this.config.bits){const t=t=>{this.highByteTemp=t};this.cpu.writeHooks[e.TCNT+1]=t,this.cpu.writeHooks[e.OCRA+1]=t,this.cpu.writeHooks[e.OCRB+1]=t,this.cpu.writeHooks[e.ICR+1]=t}t.writeHooks[e.TCCRA]=t=>(this.cpu.data[e.TCCRA]=t,this.updateWGMConfig(),!0),t.writeHooks[e.TCCRB]=t=>(this.cpu.data[e.TCCRB]=t,this.updateDivider=!0,this.cpu.clearClockEvent(this.count),this.cpu.addClockEvent(this.count,0),this.updateWGMConfig(),!0),t.writeHooks[e.TIFR]=t=>(this.cpu.data[e.TIFR]=t,this.cpu.clearInterruptByFlag(this.OVF,t),this.cpu.clearInterruptByFlag(this.OCFA,t),this.cpu.clearInterruptByFlag(this.OCFB,t),!0),t.writeHooks[e.TIMSK]=t=>{this.cpu.updateInterruptEnable(this.OVF,t),this.cpu.updateInterruptEnable(this.OCFA,t),this.cpu.updateInterruptEnable(this.OCFB,t)}}reset(){this.divider=0,this.lastCycle=0,this.ocrA=0,this.nextOcrA=0,this.ocrB=0,this.nextOcrB=0,this.icr=0,this.tcnt=0,this.tcntNext=0,this.tcntUpdated=!1,this.countingUp=!1,this.updateDivider=!0}get TCCRA(){return this.cpu.data[this.config.TCCRA]}get TCCRB(){return this.cpu.data[this.config.TCCRB]}get TIMSK(){return this.cpu.data[this.config.TIMSK]}get CS(){return 7&this.TCCRB}get WGM(){const t=16===this.config.bits?24:8;return(this.TCCRB&t)>>1|3&this.TCCRA}get TOP(){switch(this.topValue){case 1:return this.ocrA;case 2:return this.icr;default:return this.topValue}}updateWGMConfig(){const{config:t,WGM:e}=this,i=16===t.bits?F:b,a=this.cpu.data[t.TCCRA],[s,c,n,r,o]=i[e];this.timerMode=s,this.topValue=c,this.ocrUpdateMode=n,this.tovUpdateMode=r;const d=s===A||s===M||s===S,h=this.compA;this.compA=a>>6&3,1!==this.compA||!d||1&o||(this.compA=0),!!h!=!!this.compA&&this.updateCompA(this.compA?y.Enable:y.None);const l=this.compB;this.compB=a>>4&3,1===this.compB&&d&&(this.compB=0),!!l!=!!this.compB&&this.updateCompB(this.compB?y.Enable:y.None)}phasePwmCount(t,e){const{ocrA:i,ocrB:a,TOP:s,tcntUpdated:c}=this;for(;e>0;)this.countingUp?++t!==s||c||(this.countingUp=!1,this.ocrUpdateMode===v.Top&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB)):--t||c||(this.countingUp=!0,this.cpu.setInterruptFlag(this.OVF),this.ocrUpdateMode===v.Bottom&&(this.ocrA=this.nextOcrA,this.ocrB=this.nextOcrB)),c||t!==i||(this.cpu.setInterruptFlag(this.OCFA),this.compA&&this.updateCompPin(this.compA,"A")),c||t!==a||(this.cpu.setInterruptFlag(this.OCFB),this.compB&&this.updateCompPin(this.compB,"B")),e--;return t}timerUpdated(t,e){const{ocrA:i,ocrB:a}=this,s=e>t;(e<i||s)&&t>=i&&(this.cpu.setInterruptFlag(this.OCFA),this.compA&&this.updateCompPin(this.compA,"A")),(e<a||s)&&t>=a&&(this.cpu.setInterruptFlag(this.OCFB),this.compB&&this.updateCompPin(this.compB,"B"))}updateCompPin(t,e,i=!1){let a=y.None;const s=3===t,c=this.countingUp===s;switch(this.timerMode){case D:case E:a=function(t){switch(t){case 1:return y.Toggle;case 2:return y.Clear;case 3:return y.Set;default:return y.Enable}}(t);break;case A:a=1===t?i?y.None:y.Toggle:s!==i?y.Set:y.Clear;break;case M:case S:a=1===t?y.Toggle:c?y.Set:y.Clear}a!==y.None&&("A"===e?this.updateCompA(a):this.updateCompB(a))}updateCompA(t){const{compPortA:e,compPinA:i}=this.config,a=this.cpu.gpioTimerHooks[e];a&&a(i,t,e)}updateCompB(t){const{compPortB:e,compPinB:i}=this.config,a=this.cpu.gpioTimerHooks[e];a&&a(i,t,e)}}const x={rxCompleteInterrupt:36,dataRegisterEmptyInterrupt:38,txCompleteInterrupt:40,UCSRA:192,UCSRB:193,UCSRC:194,UBRRL:196,UBRRH:197,UDR:198};class N{constructor(t,e,i){this.cpu=t,this.config=e,this.freqHz=i,this.onByteTransmit=null,this.onLineTransmit=null,this.lineBuffer="",this.UDRE={address:this.config.dataRegisterEmptyInterrupt,flagRegister:this.config.UCSRA,flagMask:32,enableRegister:this.config.UCSRB,enableMask:32},this.TXC={address:this.config.txCompleteInterrupt,flagRegister:this.config.UCSRA,flagMask:64,enableRegister:this.config.UCSRB,enableMask:64},this.reset(),this.cpu.writeHooks[e.UCSRA]=i=>(t.data[e.UCSRA]=i,t.clearInterruptByFlag(this.UDRE,i),t.clearInterruptByFlag(this.TXC,i),!0),this.cpu.writeHooks[e.UCSRB]=(e,i)=>{t.updateInterruptEnable(this.UDRE,e),t.updateInterruptEnable(this.TXC,e),8&e&&!(8&i)&&t.setInterruptFlag(this.UDRE)},this.cpu.writeHooks[e.UDR]=e=>{if(this.onByteTransmit&&this.onByteTransmit(e),this.onLineTransmit){const t=String.fromCharCode(e);"\n"===t?(this.onLineTransmit(this.lineBuffer),this.lineBuffer=""):this.lineBuffer+=t}const i=1+this.bitsPerChar+this.stopBits+(this.parityEnabled?1:0),a=(this.UBRR*this.multiplier+1)*i;this.cpu.addClockEvent((()=>{t.setInterruptFlag(this.UDRE),t.setInterruptFlag(this.TXC)}),a),this.cpu.clearInterrupt(this.TXC),this.cpu.clearInterrupt(this.UDRE)}}reset(){this.cpu.data[this.config.UCSRA]=32,this.cpu.data[this.config.UCSRB]=0,this.cpu.data[this.config.UCSRC]=6}get UBRR(){return this.cpu.data[this.config.UBRRH]<<8|this.cpu.data[this.config.UBRRL]}get multiplier(){return 2&this.cpu.data[this.config.UCSRA]?8:16}get baudRate(){return Math.floor(this.freqHz/(this.multiplier*(1+this.UBRR)))}get bitsPerChar(){switch((6&this.cpu.data[this.config.UCSRC])>>1|4&this.cpu.data[this.config.UCSRB]){case 0:return 5;case 1:return 6;case 2:return 7;case 3:return 8;default:case 7:return 9}}get stopBits(){return 8&this.cpu.data[this.config.UCSRC]?2:1}get parityEnabled(){return!!(32&this.cpu.data[this.config.UCSRC])}get parityOdd(){return!!(16&this.cpu.data[this.config.UCSRC])}}class W{constructor(t){this.memory=new Uint8Array(t),this.memory.fill(255)}readMemory(t){return this.memory[t]}writeMemory(t,e){this.memory[t]&=e}eraseMemory(t){this.memory[t]=255}}const q={eepromReadyInterrupt:44,EECR:63,EEDR:64,EEARL:65,EEARH:66,eraseCycles:28800,writeCycles:28800};class L{constructor(t,e,i=q){this.cpu=t,this.backend=e,this.config=i,this.writeEnabledCycles=0,this.writeCompleteCycles=0,this.EER={address:this.config.eepromReadyInterrupt,flagRegister:this.config.EECR,flagMask:2,enableRegister:this.config.EECR,enableMask:8,constant:!0},this.cpu.writeHooks[this.config.EECR]=t=>{const{EEARH:e,EEARL:i,EECR:a,EEDR:s}=this.config,c=this.cpu.data[e]<<8|this.cpu.data[i];if(1&t&&this.cpu.clearInterrupt(this.EER),4&t){const t=4;this.writeEnabledCycles=this.cpu.cycles+t,this.cpu.addClockEvent((()=>{this.cpu.data[a]&=-5}),t)}if(1&t)return this.cpu.data[s]=this.backend.readMemory(c),this.cpu.cycles+=4,!0;if(2&t){if(this.cpu.cycles>=this.writeEnabledCycles)return!0;if(this.cpu.cycles<this.writeCompleteCycles)return!0;const e=this.cpu.data[s];return this.writeCompleteCycles=this.cpu.cycles,32&t||(this.backend.eraseMemory(c),this.writeCompleteCycles+=this.config.eraseCycles),16&t||(this.backend.writeMemory(c,e),this.writeCompleteCycles+=this.config.writeCycles),this.cpu.data[a]|=2,this.cpu.addClockEvent((()=>{this.cpu.setInterruptFlag(this.EER)}),this.writeCompleteCycles-this.cpu.cycles),this.cpu.cycles+=2,!0}return!1}}}const G=248,K={twiInterrupt:48,TWBR:184,TWSR:185,TWAR:186,TWDR:187,TWCR:188,TWAMR:189};class j{constructor(t){this.twi=t}start(){this.twi.completeStart()}stop(){this.twi.completeStop()}connectToSlave(){this.twi.completeConnect(!1)}writeByte(){this.twi.completeWrite(!1)}readByte(){this.twi.completeRead(255)}}class z{constructor(t,e,i){this.cpu=t,this.config=e,this.freqHz=i,this.eventHandler=new j(this),this.TWI={address:this.config.twiInterrupt,flagRegister:this.config.TWCR,flagMask:128,enableRegister:this.config.TWCR,enableMask:1},this.updateStatus(G),this.cpu.writeHooks[e.TWCR]=t=>{this.cpu.data[e.TWCR]=t;const i=128&t;this.cpu.clearInterruptByFlag(this.TWI,t),this.cpu.updateInterruptEnable(this.TWI,t);const{status:a}=this;if(i&&4&t){const e=this.cpu.data[this.config.TWDR];return this.cpu.addClockEvent((()=>{if(32&t)this.eventHandler.start(a!==G);else if(16&t)this.eventHandler.stop();else if(8===a)this.eventHandler.connectToSlave(e>>1,!(1&e));else if(24===a||40===a)this.eventHandler.writeByte(e);else if(64===a||80===a){const e=!!(64&t);this.eventHandler.readByte(e)}}),0),!0}}}get prescaler(){switch(3&this.cpu.data[this.config.TWSR]){case 0:return 1;case 1:return 4;case 2:return 16;case 3:return 64}throw new Error("Invalid prescaler value!")}get sclFrequency(){return this.freqHz/(16+2*this.cpu.data[this.config.TWBR]*this.prescaler)}completeStart(){this.updateStatus(this.status===G?8:16)}completeStop(){this.cpu.data[this.config.TWCR]&=-17,this.updateStatus(G)}completeConnect(t){1&this.cpu.data[this.config.TWDR]?this.updateStatus(t?64:72):this.updateStatus(t?24:32)}completeWrite(t){this.updateStatus(t?40:48)}completeRead(t){const e=!!(64&this.cpu.data[this.config.TWCR]);this.cpu.data[this.config.TWDR]=t,this.updateStatus(e?80:88)}get status(){return 248&this.cpu.data[this.config.TWSR]}updateStatus(t){const{TWSR:e}=this.config;this.cpu.data[e]=-249&this.cpu.data[e]|t,this.cpu.setInterruptFlag(this.TWI)}}const X={spiInterrupt:34,SPCR:76,SPSR:77,SPDR:78};class _{constructor(t,e,i){this.cpu=t,this.config=e,this.freqHz=i,this.onTransfer=null,this.transmissionActive=!1,this.receivedByte=0,this.SPI={address:this.config.spiInterrupt,flagRegister:this.config.SPSR,flagMask:128,enableRegister:this.config.SPCR,enableMask:128};const{SPCR:a,SPSR:s,SPDR:c}=e;t.writeHooks[c]=e=>{var i,n;if(!(64&t.data[a]))return;if(this.transmissionActive)return t.data[s]|=64,!0;t.data[s]&=-65,this.cpu.clearInterrupt(this.SPI),this.receivedByte=null!==(n=null===(i=this.onTransfer)||void 0===i?void 0:i.call(this,e))&&void 0!==n?n:0;const r=8*this.clockDivider;return this.transmissionActive=!0,this.cpu.addClockEvent((()=>{this.cpu.data[c]=this.receivedByte,this.cpu.setInterruptFlag(this.SPI),this.transmissionActive=!1}),r),!0},t.writeHooks[s]=t=>{this.cpu.data[s]=t,this.cpu.clearInterruptByFlag(this.SPI,t)}}reset(){this.transmissionActive=!1,this.receivedByte=0}get isMaster(){return!!(16&this.cpu.data[this.config.SPCR])}get dataOrder(){return 32&this.cpu.data[this.config.SPCR]?"lsbFirst":"msbFirst"}get spiMode(){return(4&this.cpu.data[this.config.SPCR]?2:0)|(8&this.cpu.data[this.config.SPCR]?1:0)}get clockDivider(){const t=1&this.cpu.data[this.config.SPSR]?2:4;switch(3&this.cpu.data[this.config.SPCR]){case 0:return t;case 1:return 4*t;case 2:return 16*t;case 3:return 32*t}throw new Error("Invalid divider value!")}get spiFrequency(){return this.freqHz/this.clockDivider}}const J={CLKPR:97},Q=[1,2,4,8,16,32,64,128,256,2,4,8,16,32,64,128];class Y{constructor(t,e,i=J){this.cpu=t,this.baseFreqHz=e,this.config=i,this.clockEnabledCycles=0,this.prescalerValue=1,this.cyclesDelta=0,this.cpu.writeHooks[this.config.CLKPR]=e=>{if((!this.clockEnabledCycles||this.clockEnabledCycles<t.cycles)&&128===e)this.clockEnabledCycles=this.cpu.cycles+4;else if(this.clockEnabledCycles&&this.clockEnabledCycles>=t.cycles){this.clockEnabledCycles=0;const i=15&e,a=this.prescalerValue;this.prescalerValue=Q[i],this.cpu.data[this.config.CLKPR]=i,a!==this.prescalerValue&&(this.cyclesDelta=(t.cycles+this.cyclesDelta)*(a/this.prescalerValue)-t.cycles)}return!0}}get frequency(){return this.baseFreqHz/this.prescalerValue}get prescaler(){return this.prescalerValue}get timeNanos(){return(this.cpu.cycles+this.cyclesDelta)/this.frequency*1e9}get timeMicros(){return(this.cpu.cycles+this.cyclesDelta)/this.frequency*1e6}get timeMillis(){return(this.cpu.cycles+this.cyclesDelta)/this.frequency*1e3}}}},e={};function i(a){if(e[a])return e[a].exports;var s=e[a]={exports:{}};return t[a](s,s.exports,i),s.exports}i.d=(t,e)=>{for(var a in e)i.o(e,a)&&!i.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:e[a]})},i.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),i.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},window.avr8js=i(675)})();