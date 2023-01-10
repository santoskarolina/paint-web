
const eraserToolbar = document.getElementById('eraser')
const pencilToolbar = document.getElementById('pencil')
const paintBucketToolbar = document.getElementById('paint-bucket')
const shapesToolbar = document.getElementById('shapes')

eraserToolbar.addEventListener('click', (e) => {
    selectOptionToolbar(['eraser__container'])
});

pencilToolbar.addEventListener('click', (e) => {
    selectOptionToolbar(['line__container', 'pencil__container'])
});

paintBucketToolbar.addEventListener('click', (e) => {
});

shapesToolbar.addEventListener('click', (e) => {
    selectOptionToolbar(['shapes__container'])
});


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