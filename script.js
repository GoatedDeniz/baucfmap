function showFloor(floor) {
    // Update the floor map image source
    document.getElementById("floorMap").src = `floor-${floor}.png`;

    // Remove "active" class from all buttons
    let buttons = document.querySelectorAll(".floor-selector button");
    buttons.forEach(button => button.classList.remove("active"));

    // Add "active" class to the clicked button
    let selectedButton = document.querySelector(`button[onclick="showFloor(${floor})"]`);
    if (selectedButton) {
        selectedButton.classList.add("active");
    }
}
