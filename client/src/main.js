
import player from "udp-sandboxing";

window.onload = function () {
    const canvas = document.getElementById("myCanvas");
    const canvasWidth = 320;
    const canvasHeight = 700;

    // Set canvas size
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Style purely via JavaScript
    Object.assign(canvas.style, {
        position: "absolute",
        width: `${canvasWidth}px`,
        height: `${canvasHeight}px`,
        left: `${(window.innerWidth - canvasWidth) / 2}px`,
        top: `${(window.innerHeight - canvasHeight) / 2}px`,
    });
};



