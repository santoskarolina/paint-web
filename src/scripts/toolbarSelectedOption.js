
import { changeCurrentMenuOption, canvas, addEventToLine } from './index.js'

const eraserToolbar = document.getElementById('eraser')
const pencilToolbar = document.getElementById('pencil')
const paintBucketToolbar = document.getElementById('paint-bucket')
const shapesToolbar = document.getElementById('shapes')
const saveDrawToolbar = document.getElementById('save-draw')

eraserToolbar.addEventListener('click', (e) => {
    selectOptionToolbar(['eraser__container'])
    changeCurrentMenuOption(false)
});

pencilToolbar.addEventListener('click', (e) => {
    selectOptionToolbar(['line__container', 'pencil__container'])
    changeCurrentMenuOption(true)
    addEventToLine()
});

paintBucketToolbar.addEventListener('click', (e) => {
    selectOptionToolbar(['pencil__container'])
    changeCurrentMenuOption(false)
});

shapesToolbar.addEventListener('click', (e) => {
    selectOptionToolbar(['shapes__container'])
    changeCurrentMenuOption(false)
});

saveDrawToolbar.addEventListener('click', saveDraw)

async function removeClassFromToolbarItens(){
    let thereIsAnExistingClass = document.querySelectorAll(".showItem")
    Array.from(thereIsAnExistingClass, function(el) {
        el.classList.remove('showItem');
    })
}

async function selectOptionToolbar(options){
    await removeClassFromToolbarItens().then(() => {
        options?.forEach(element => {
            document.querySelector(`#${element}`).classList.add('showItem')
        });
    })
}

function saveDraw() {
    var canvasDataURL = canvas.toDataURL();
    var a = document.createElement('a');
    a.href = canvasDataURL;
    a.download = 'drawing';
    a.click();
}