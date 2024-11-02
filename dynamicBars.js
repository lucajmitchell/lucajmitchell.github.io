

const topBars = document.getElementById("bars-top")
const bottomBars = document.getElementById("bars-bottom")


function createBar(container, width, height, borderRadiusTop, borderRadiusBottom) {
    container.innerHTML += `
        <div class="bars-container" style="width: ${width}px; height: ${height}px">
            <div class="bar bar-background" style="width: ${width}px; height: ${height}px; border-radius: ${borderRadiusTop}px ${borderRadiusTop}px ${borderRadiusBottom}px ${borderRadiusBottom}px; z-index: 0;"></div>
            <div class="bar bar-midground" style="width: ${width}px; height: ${height}px; border-radius: ${borderRadiusTop}px ${borderRadiusTop}px ${borderRadiusBottom}px ${borderRadiusBottom}px; z-index: 2;"></div>
            <div class="bar bar-foreground" style="width: ${width}px; height: ${height}px; border-radius: ${borderRadiusTop}px ${borderRadiusTop}px ${borderRadiusBottom}px ${borderRadiusBottom}px; z-index: 3;"></div>
        </div>
    `
}


function generateBars() {

    // Reset measurements each time in case of window resize
    let viewportWidth = viewportBox.offsetWidth
    let viewportHeight = viewportBox.offsetHeight

    // Make each bar approx 30px wide
    let numOfBars = Math.floor(viewportWidth / 30)

    // Get the width of each bar and the height of the unit bar (calculated with vw/vh for consistency across screen sizes)
    let barWidth = viewportWidth / numOfBars
    let unitHeight = viewportHeight / numOfBars

    // Make bar comppletely rounded
    let borderRadius = barWidth / 2

    // Clear containers
    topBars.innerHTML = ""
    bottomBars.innerHTML = ""

    for (let i=0; i<numOfBars; i++) {

        // Bar height = base height (how tall it would be if height incremented by 1 each iteration) + random aspect
        randomAspect = Math.floor(Math.random() * 20) - 10
        barHeight = (unitHeight * (i+1)) + (randomAspect * viewportHeight / 100)

        // Find the height of the counterpart (i.e. the bottom bar to match the top bar)
        inverseHeight = viewportHeight - barHeight

        createBar(topBars, barWidth, barHeight + unitHeight, 0, borderRadius)
        createBar(bottomBars, barWidth, inverseHeight + unitHeight, borderRadius, 0)
    }

}


function parallaxBars(distanceScrolled, bars, multiplier) {

    for (let i=0; i<bars.length; i++) {

        // childBars contains the background, midground and foreground bars of the current parent bar (bars[i])
        let childBars = bars[i].children

        // Create parallax effect by scrolling each bar by 1/(2^x) * multiplier (-1 for the top bars to move them up and 1 for the bottom bars to move them down)
        let backgroundBarScrollDistance = (1/8) * distanceScrolled * multiplier
        let midgroundBarScrollDistance = (1/4) * distanceScrolled * multiplier
        let foregroundBarScrollDistance = (1/2) * distanceScrolled * multiplier
        
        childBars[0].style.transform = `translateY(${backgroundBarScrollDistance}px)`
        childBars[1].style.transform = `translateY(${midgroundBarScrollDistance}px)`
        childBars[2].style.transform = `translateY(${foregroundBarScrollDistance}px)`
        
    }

}


function parallaxBarsController() {
    
    parallaxBars(window.scrollY, topBars.getElementsByClassName("bars-container"), -1)
    parallaxBars(window.scrollY, bottomBars.getElementsByClassName("bars-container"), 1)
    
}


document.addEventListener("DOMContentLoaded", generateBars)
window.addEventListener("resize", generateBars)
document.addEventListener("scroll", parallaxBarsController)
