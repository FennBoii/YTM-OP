// window.api.send('PlsSendVolOwO');

// window.api.receive('getSysVolNow', (fetchedData) => {
//     let intervalIdquick = setInterval(() => {
//         clearInterval(intervalIdquick);
//         window.api.send('PlsSendVolOwO');
//     }, 250);
//     document.getElementById('text').innerText = fetchedData.toString();
// });

var horSizeGet, vertSizeGet, elemntSizeGetH, elemntSizeGetV, backColGet, sepElemtGet, sysVolGetNow;

window.api.send('PlsSendVolOwO');
window.api.send('getValue1');
window.api.send('getValue2');
window.api.send('getValue3');
window.api.send('getValue4');
window.api.send('getValue5');
window.api.send('SETVOLWINPLS');

window.api.receive('getSysVolNow', (fetchedData) => {
    sysVolGetNow = fetchedData;
    let intervalIdquick = setInterval(() => {
        clearInterval(intervalIdquick);
        window.api.send('PlsSendVolOwO');
    }, 250);
    document.getElementById('text').innerText = fetchedData.toString();
});



window.api.receive('getHorizSize', (horizSizeOut) => {
    horSizeGet = horizSizeOut;
    let HorizSetOut = setInterval(() => {
        clearInterval(HorizSetOut);
        window.api.send('getValue1');
    }, 250);
})




window.api.receive('getVertSize', (vertSizeOut) => {
    vertSizeGet = vertSizeOut;
    let VertSetOut = setInterval(() => {
        clearInterval(VertSetOut);
        window.api.send('getValue2');
    }, 250);
})




window.api.receive('elementSizeV', (elemntSizeOutV) => {
    elemntSizeGetV = elemntSizeOutV;
    let EleSetInt = setInterval(() => {
        clearInterval(EleSetInt);
        window.api.send('getValue3');
    }, 250);
})


window.api.receive('elementSizeH', (elemntSizeOutH) => {
    elemntSizeGetH = elemntSizeOutH;
    let EleSetInt = setInterval(() => {
        clearInterval(EleSetInt);
        window.api.send('getValue');
    }, 250);
})


window.api.receive('backgroundColor', (backColOut) => {
    if (backColOut != null || backColOut != undefined) {
        // console.log(`- LOG -- CANT SEND BACKGROUND COLOR IS NULL -`)
        backColGet = backColOut;
        let backSetInt = setInterval(() => {
            clearInterval(backSetInt);
            window.api.send('getValue5');
    }, 250);
    }
})

window.api.receive('sepElement', (sepElemtOut) => {
    sepElemtGet = sepElemtOut;
    let sepElemtInt = setInterval(() => {
        clearInterval(sepElemtInt);
        window.api.send('getValue6');
    }, 250);
})

window.api.receive('SETVOLWIN', (OUTPUT) => {
    const sysVolGetNowSET = sysVolGetNow;
    const volWinWindow = getElementById('text');
    const volWinWindowBEFOR = document.createElement('span');
    const volWinWindowBEFORFIRST = document.createElement('span');

    volWinWindowBEFOR.className('before');
    volWinWindowBEFOR.textContent(sepElemtGet);
    volWinWindowBEFOR.className('before-first');
    volWinWindowBEFOR.textContent(sysVolGetNowSET);

    volWinWindow.prepend(volWinWindowBEFOR);
    volWinWindow.prepend(volWinWindowBEFORFIRST);

    volWinWindow.style.top(horSizeGet);
    volWinWindow.style.left(vertSizeGet);
    volWinWindow.style.width(elemntSizeGetV);
    volWinWindow.style.height(elemntSizeGetH);
    if (backColGet != null || backColGet != undefined) {
        volWinWindow.style.backgroundColr(backColGet);
    }

    let setVolvWin = setInterval(() => {
        clearInterval(setVolvWin);
        window.api.send('SETVOLWINPLS');
    }, 250);

})