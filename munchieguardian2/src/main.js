import kaplay from "kaplay";
import "kaplay/global"; // uncomment if you want to use without the k. prefix

kaplay({
    width: 1280,
    height: 720,
    background: "#000000",
    canvas: document.getElementById("canvas"),
});

loadRoot("./"); // ts for shipping on itch

scene("title", () => {
})