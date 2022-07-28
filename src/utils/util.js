export const trackDragEvent = (_this) =>  {
    window.interval = setInterval(function() {
        if(window._e !== undefined) {
            let currValue = window._e.detail.data[0].distanceFromOrigin;
            let currDir = window._e.detail.data[0].directionFromOrigin;
            if(currValue-window.prevValue > 10) {
                if(currDir-window.prevDir > 10) {
                    let rotateEle = window.menuArray.pop();
                    window.menuArray.unshift(rotateEle);
                    console.log('left', window.menuArray);
                    _this.setState({highlighted: window.menuArray[0]});
                }
                if(currDir-window.prevDir < -10) {
                    let rotateEle = window.menuArray.shift();
                    window.menuArray.push(rotateEle);
                    console.log('right', window.menuArray);
                    _this.setState({highlighted: window.menuArray[0]});
                }
            }
            window.prevValue = currValue;
            window.prevDir = currDir;
        }
    }, 200)
};