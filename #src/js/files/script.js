// settings for cursor
const cursor = document.querySelector('.cursor')
document.addEventListener('mousemove', e => {
    cursor.setAttribute("style", "top: " + (e.pageY - 13) + "px; left: " + (e.pageX - 13) + "px;")
})
document.addEventListener('click', () => {
    cursor.classList.add("expand");
    setTimeout(() => {
        cursor.classList.remove("expand");
    }, 500);
})
