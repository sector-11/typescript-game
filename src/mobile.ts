import { shared } from "./shared";

export const initializeButtons = () => {
    const leftPadUp = <HTMLButtonElement>document.getElementById("left-pad-up");
    leftPadUp.addEventListener("touchstart", () => {
        shared.keys["w"] = true;
    });
    leftPadUp.addEventListener("touchend", () => {
        shared.keys["w"] = false;
    });

    const leftPadDown = <HTMLButtonElement>document.getElementById("left-pad-down");
    leftPadDown.addEventListener("touchstart", () => {
        shared.keys["s"] = true;
    });
    leftPadDown.addEventListener("touchend", () => {
        shared.keys["s"] = false;
    });

    const leftPadLeft = <HTMLButtonElement>document.getElementById("left-pad-left");
    leftPadLeft.addEventListener("touchstart", () => {
        shared.keys["a"] = true;
    });
    leftPadLeft.addEventListener("touchend", () => {
        shared.keys["a"] = false;
    });

    const leftPadRight = <HTMLButtonElement>document.getElementById("left-pad-right");
    leftPadRight.addEventListener("touchstart", () => {
        shared.keys["d"] = true;
    });
    leftPadRight.addEventListener("touchend", () => {
        shared.keys["d"] = false;
    });

    const rightPadUp = <HTMLButtonElement>document.getElementById("right-pad-up");
    rightPadUp.addEventListener("touchstart", () => {
        shared.keys["ArrowUp"] = true;
    });
    rightPadUp.addEventListener("touchend", () => {
        shared.keys["ArrowUp"] = false;
    });

    const rightPadDown = <HTMLButtonElement>document.getElementById("right-pad-down");
    rightPadDown.addEventListener("touchstart", () => {
        shared.keys["ArrowDown"] = true;
    });
    rightPadDown.addEventListener("touchend", () => {
        shared.keys["ArrowDown"] = false;
    });

    const rightPadLeft = <HTMLButtonElement>document.getElementById("right-pad-left");
    rightPadLeft.addEventListener("touchstart", () => {
        shared.keys["ArrowLeft"] = true;
    });
    rightPadLeft.addEventListener("touchend", () => {
        shared.keys["ArrowLeft"] = false;
    });

    const rightPadRight = <HTMLButtonElement>document.getElementById("right-pad-right");
    rightPadRight.addEventListener("touchstart", () => {
        shared.keys["ArrowRight"] = true;
    });
    rightPadRight.addEventListener("touchend", () => {
        shared.keys["ArrowRight"] = false;
    });
};
