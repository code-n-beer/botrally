let carIdx = 0
const car = (startPosition, startRotation) => {
    return {
        idx: carIdx++,
        rotation: startRotation,
        x: startPosition.x,
        y: startPosition.y,
        setPosition,
        setRotation,
        velocity: {x: 0, y: 0}
    }
}

function setPosition(xPos, yPos) {
    this.x = xPos
    this.y = yPos
}

function setRotation(rotation) {
    this.rotation = rotation
}

module.exports = car