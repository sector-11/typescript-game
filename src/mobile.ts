import { shared } from "./shared";

export const initializeButtons = () => {
    const leftPadUp = <HTMLButtonElement>document.getElementById("left-pad-up");
    leftPadUp.addEventListener("touchstart", (ev) => {
        shared.keys["w"] = true;
    });
    leftPadUp.addEventListener("touchend", (ev) => {
        shared.keys["w"] = false;
    });

    const leftPadDown = <HTMLButtonElement>document.getElementById("left-pad-down");
    leftPadDown.addEventListener("touchstart", (ev) => {
        shared.keys["s"] = true;
    });
    leftPadDown.addEventListener("touchend", (ev) => {
        shared.keys["s"] = false;
    });

    const leftPadLeft = <HTMLButtonElement>document.getElementById("left-pad-left");
    leftPadLeft.addEventListener("touchstart", (ev) => {
        shared.keys["a"] = true;
    });
    leftPadLeft.addEventListener("touchend", (ev) => {
        shared.keys["a"] = false;
    });

    const leftPadRight = <HTMLButtonElement>document.getElementById("left-pad-right");
    leftPadRight.addEventListener("touchstart", (ev) => {
        shared.keys["d"] = true;
    });
    leftPadRight.addEventListener("touchend", (ev) => {
        shared.keys["d"] = false;
    });

    const rightPadUp = <HTMLButtonElement>document.getElementById("right-pad-up");
    rightPadUp.addEventListener("touchstart", (ev) => {
        shared.keys["ArrowUp"] = true;
    });
    rightPadUp.addEventListener("touchend", (ev) => {
        shared.keys["ArrowUp"] = false;
    });

    const rightPadDown = <HTMLButtonElement>document.getElementById("right-pad-down");
    rightPadDown.addEventListener("touchstart", (ev) => {
        shared.keys["ArrowDown"] = true;
    });
    rightPadDown.addEventListener("touchend", (ev) => {
        shared.keys["ArrowDown"] = false;
    });

    const rightPadLeft = <HTMLButtonElement>document.getElementById("right-pad-left");
    rightPadLeft.addEventListener("touchstart", (ev) => {
        shared.keys["ArrowLeft"] = true;
    });
    rightPadLeft.addEventListener("touchend", (ev) => {
        shared.keys["ArrowLeft"] = false;
    });

    const rightPadRight = <HTMLButtonElement>document.getElementById("right-pad-right");
    rightPadRight.addEventListener("touchstart", (ev) => {
        shared.keys["ArrowRight"] = true;
    });
    rightPadRight.addEventListener("touchend", (ev) => {
        shared.keys["ArrowRight"] = false;
    });
};
