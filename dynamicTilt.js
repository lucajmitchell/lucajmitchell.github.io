

const viewportBox = document.getElementsByTagName("header")[0]
const tiltBox = document.getElementById("title-box")


function tiltController(event) {

    let viewportWidth = viewportBox.offsetWidth
    let viewportHeight = viewportBox.offsetHeight

    // Find the percentage of the distance from the center to the edge of the screen of where the mouse is
    let x = (event.clientX - (viewportWidth/2)) / (viewportWidth/2)
    let y = (event.clientY - (viewportHeight/2)) / (viewportHeight/2)

    tiltBox.style.transform = `rotateY(${x*15}deg) rotateX(${-y*15}deg)`

}


document.addEventListener('mousemove', tiltController)