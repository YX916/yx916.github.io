window.onload = function () {
    const channel = new BroadcastChannel('card');

    channel.onmessage = e => {
        const [cx, cy] = screenToClient(...e.data);
        card.style.left = cx + 'px';
        card.style.top = cy + 'px';
    };

    const card = document.querySelector('.card');
    card.onmousedown = (e) => {
        let x = e.pageX - card.offsetLeft;
        let y = e.pageY - card.offsetTop;
        window.onmousemove = (e) => {
            const cx = e.pageX - x;
            const cy = e.pageY - y;
            card.style.left = cx + 'px';
            card.style.top = cy + 'px';
            const screenPoints = clientToScreen(cx, cy);
            channel.postMessage(screenPoints);
        };
        window.onmouseup = () => {
            window.onmousemove = null;
            window.onmouseup = null;
        };
    };


    function barHeight () {
        return window.outerHeight - window.innerHeight;
    };

    function clientToScreen (clientX, clientY) {
        const screenX = clientX + window.screenX;
        const screenY = clientY + window.screenY + barHeight();
        return [screenX, screenY];
    }

    function screenToClient (screenX, screenY) {
        const clientX = screenX - window.screenX;
        const clientY = screenY - window.screenY - barHeight();
        return [clientX, clientY];
    }
};