<script>
    import {onMount} from "svelte";

    let canvas;
    let ctx;
    let planes = [];
    const numPlanes = 20;
    const trailLength = 1000;
    const speedMultiplier = 0.8;
    const labelWidth = 50;
    const labelHeight = 20;
    const avoidanceRadius = 30;
    const cursorFollowSpeed = 0.01;

    let selectedPlane = null;
    let mouseX = 0;
    let mouseY = 0;

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
            name: name,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`
        };
    }

    function updatePlane(plane) {
        if (plane === selectedPlane) {
            const dx = mouseX - plane.x;
            const dy = mouseY - plane.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance > 10) {
                // Smooth movement towards the cursor
                const speed = Math.min(distance * 0.05, 2); // Speed proportional to distance, capped at 5
                plane.vx = (dx / distance) * speed;
                plane.vy = (dy / distance) * speed;
            } else {
                // Circular motion around the cursor when very close
                const angle = Math.atan2(dy, dx) + 0.05; // Adjust the angle slightly to rotate
                const radius = 575; // The radius of circling
                plane.vx = Math.cos(angle) * radius * 0.1; // Small constant speed for circling
                plane.vy = Math.sin(angle) * radius * 0.1;
            }
        }
        planes.forEach(otherPlane => {
            if (plane !== otherPlane) {
                const dx = otherPlane.x - plane.x;
                const dy = otherPlane.y - plane.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < avoidanceRadius) {
                    plane.vx -= (dx / distance) * 0.1;
                    plane.vy -= (dy / distance) * 0.1;
                }
            }
        });

        // Update position based on velocity
        plane.x += plane.vx;
        plane.y += plane.vy;

        // Boundary check
        if (plane.x <= 0 || plane.x >= canvas.width) plane.vx *= -1;
        if (plane.y <= 0 || plane.y >= canvas.height) plane.vy *= -1;

        // Add position to the trail
        plane.trail.push({x: plane.x, y: plane.y});
        if (plane.trail.length > trailLength) plane.trail.shift();
    }


    function getAngle(plane) {
        return Math.atan2(plane.vy, plane.vx);
    }

    function drawTrail(plane) {
        ctx.strokeStyle = "#0156cf";
        ctx.lineWidth = 1.5;
        ctx.beginPath();

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

        drawTrail(plane);

        ctx.save();
        ctx.translate(plane.x, plane.y);
        ctx.rotate(angle);

        const planeSymbol = '✈';
        const textMetrics = ctx.measureText(planeSymbol);
        const planeWidth = textMetrics.width;
        const planeHeight = 12;

        ctx.fillStyle = 'white';
        ctx.font = '12px Arial';
        ctx.fillText(planeSymbol, -planeWidth / 2, planeHeight / 4);
        ctx.restore();

        drawLabel(plane);
    }

    let lastFrameTime = 0;
    const frameRate = 60;

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

    function handleCanvasClick(event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        selectedPlane = planes.find(plane =>
            Math.abs(plane.x - x) < 10 && Math.abs(plane.y - y) < 10
        ) || null;
    }

    function handleMouseMove(event) {
        const rect = canvas.getBoundingClientRect();
        mouseX = event.clientX - rect.left;
        mouseY = event.clientY - rect.top;
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

<div class="relative">
    <canvas
            bind:this={canvas}
            on:click={handleCanvasClick}
            on:mousemove={handleMouseMove}
            class="h-screen w-full bg-surface"
    ></canvas>
    {#if selectedPlane}
        <div class="absolute top-4 right-4 bg-white p-4 rounded shadow">
            <h3>Selected Plane: {selectedPlane.name}</h3>
            <p>Position: ({selectedPlane.x.toFixed(2)}, {selectedPlane.y.toFixed(2)})</p>
            <p>Speed: {Math.sqrt(selectedPlane.vx ** 2 + selectedPlane.vy ** 2).toFixed(2)}</p>
        </div>
    {/if}
</div>