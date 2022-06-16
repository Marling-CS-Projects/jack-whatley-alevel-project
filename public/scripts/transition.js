function transitionDown(sSpeed, eSpeed) {

    setTimeout(() => {for (let i = sSpeed; i <= eSpeed; i - 0.001) {

        return i;

    }}, 500);

}

function transitionUp(sSpeed, eSpeed) {

    setTimeout(() => {for (let i = sSpeed; i <= eSpeed; i + 0.001) {

        return i;

    }}, 1);

}

export { transitionDown, transitionUp };