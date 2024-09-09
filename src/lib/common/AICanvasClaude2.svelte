<script>
    import { onMount } from "svelte";

    let canvas;
    let ctx;
    let planes = [];
    const numPlanes = 20;
    const trailLength = 1000;  // Reduced the length for performance
    const speedMultiplier = 0.8;  // Adjust this value to control the overall speed
    const labelWidth = 50;
    const labelHeight = 20;

    const planeNames = [
        'AA123', 'DL456', 'UA789', 'SW101', 'BA202', 'AF303', 'LH404',
        'EK505', 'QF606', 'NZ707', 'KL808', 'AS909', 'JA010', 'IB111',
        'LH222', 'LH333', 'DL444', 'BA555', 'AA666', 'AF777', 'QF888',
        'UA999', 'EK100', 'JA101', 'QF102', 'NZ103', 'BA104', 'AS105',
        'IB106', 'LH107', 'DL108', 'AA109', 'SW110', 'KL111'
    ];

    function createPlane(name) {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * speedMultiplier,
            vy: (Math.random() - 0.5) * speedMultiplier,
            trail: [],
            name: name
        };
    }

    function updatePlane(plane) {
        plane.x += plane.vx;
        plane.y += plane.vy;

        if (plane.x <= 0 || plane.x >= canvas.width) plane.vx *= -1;
        if (plane.y <= 0 || plane.y >= canvas.height) plane.vy *= -1;

        plane.trail.push({ x: plane.x, y: plane.y });
        if (plane.trail.length > trailLength) plane.trail.shift();
    }

    function getAngle(plane) {
        return Math.atan2(plane.vy, plane.vx);
    }

    function drawTrail(plane) {
        ctx.strokeStyle = `rgba(1, 86, 207, 1)`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();

        // let start = Math.max(plane.trail.length, 0);  // Only draw last few segments
        for (let i = 0; i < plane.trail.length - 1; i++) {
            ctx.moveTo(plane.trail[i].x, plane.trail[i].y);
            ctx.lineTo(plane.trail[i + 1].x, plane.trail[i + 1].y);
        }
        ctx.stroke();
    }

    function drawLabel(plane) {
        ctx.fillStyle = 'black';
        ctx.fillRect(plane.x + 10, plane.y - labelHeight / 2, labelWidth, labelHeight);
        ctx.fillStyle = 'white';
        ctx.font = '12px Arial';
        ctx.fillText(plane.name, plane.x + 15, plane.y + 5);
    }

    function drawPlane(plane) {
        const angle = getAngle(plane);

        // Draw the trail first
        drawTrail(plane);

        // Translate and rotate only for the plane symbol
        ctx.save();
        ctx.translate(plane.x, plane.y);
        ctx.rotate(angle);

        const planeSymbol = '✈';
        const textMetrics = ctx.measureText(planeSymbol);
        const planeWidth = textMetrics.width;
        const planeHeight = 12;

        ctx.fillStyle = 'rgba(245, 255, 250, 1)';
        ctx.font = '12px Arial';
        ctx.fillText(planeSymbol, -planeWidth / 2, planeHeight / 4);
        ctx.restore();

        // Draw the label after restoring
        drawLabel(plane);
    }

    let lastFrameTime = 0;
    const frameRate = 60;  // Limit the frame rate to reduce choppiness

    function animate(timestamp) {
        if (timestamp - lastFrameTime < 1000 / frameRate) {
            requestAnimationFrame(animate);
            return;
        }

        lastFrameTime = timestamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        planes.forEach(plane => {
            updatePlane(plane);
            drawPlane(plane);
        });

        requestAnimationFrame(animate);
    }

    onMount(() => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx = canvas.getContext('2d');

        for (let i = 0; i < numPlanes; i++) {
            planes.push(createPlane(planeNames[i]));
        }

        requestAnimationFrame(animate);

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    });
</script>

<canvas bind:this={canvas} class="h-screen w-full bg-surface"></canvas>
