<script>
    import {onMount} from "svelte";

    let canvas;
    let ctx;
    let planes = [];
    const numPlanes = 20;
    const trailLength = 10000000;
    const speedMultiplier = 1.3; // Adjust this value to control the overall speed

    // Configurable label size
    const labelWidth = 50;
    const labelHeight = 20;

    // Real-life short codes for planes
    const planeNames = [
        'AA123', 'DL456', 'UA789', 'SW101', 'BA202', 'AF303', 'LH404',
        'EK505', 'QF606', 'NZ707', 'KL808', 'AS909', 'JA010', 'IB111',
        'LH222', 'LH333', 'DL444', 'BA555', 'AA666', 'AF777', 'QF888',
        'UA999', 'EK100', 'JA101', 'QF102', 'NZ103', 'BA104', 'AS105',
        'IB106', 'LH107', 'DL108', 'AA109', 'SW110', 'KL111'
    ];

    // Function to create a plane object
    function createPlane(name) {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 2 * speedMultiplier,
            vy: (Math.random() - 0.5) * 2 * speedMultiplier,
            trail: [],
            name: name
        };
    }

    // Function to update plane position and trail
    function updatePlane(plane) {
        plane.x += plane.vx;
        plane.y += plane.vy;

        // Handle collision with canvas edges
        if (plane.x <= 0 || plane.x >= canvas.width) plane.vx *= -1;
        if (plane.y <= 0 || plane.y >= canvas.height) plane.vy *= -1;

        // Update trail
        plane.trail.push({ x: plane.x, y: plane.y });
        if (plane.trail.length > trailLength) plane.trail.shift();
    }

    // Function to calculate the angle of movement
    function getAngle(plane) {
        return Math.atan2(plane.vy, plane.vx);
    }

    // Function to draw the trail
    function drawTrail(plane) {
        ctx.strokeStyle = `rgba(1, 86, 207, 1)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let i = 0; i < plane.trail.length - 1; i++) {
            ctx.moveTo(plane.trail[i].x, plane.trail[i].y);
            ctx.lineTo(plane.trail[i + 1].x, plane.trail[i + 1].y);
        }
        ctx.stroke();
    }

    // Function to draw the plane label
    function drawLabel(plane) {
        ctx.fillStyle = 'black';
        ctx.fillRect(plane.x + 10, plane.y - labelHeight / 2, labelWidth, labelHeight); // Position the label near the plane
        ctx.fillStyle = 'white';
        ctx.font = '12px Arial';
        ctx.fillText(plane.name, plane.x + 15, plane.y + 5); // Center the text within the label
    }

    // Function to draw plane and its trail
    function drawPlane(plane) {
        const angle = getAngle(plane);

        // Draw the trail before rotating the plane
        drawTrail(plane);

        // Save the current context before rotation
        ctx.save();

        // Translate to the plane's position and rotate it
        ctx.translate(plane.x, plane.y);
        ctx.rotate(angle);

        // Get the airplane symbol and calculate its size for centering
        const planeSymbol = '✈';
        const textMetrics = ctx.measureText(planeSymbol);
        const planeWidth = textMetrics.width;
        const planeHeight = 12; // Approximate height for the symbol

        // Fine-tune the vertical and horizontal offset for perfect centering
        ctx.fillStyle = 'rgba(245, 255, 250, 1)';
        ctx.font = '12px Arial';
        ctx.fillText(planeSymbol, -planeWidth / 2, planeHeight / 4); // Adjust vertical offset here

        // Restore the context to its original state
        ctx.restore();

        // Draw the label for the plane
        drawLabel(plane);
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        planes.forEach(plane => {
            updatePlane(plane);
            drawPlane(plane);
        });

        requestAnimationFrame(animate);
    }

    // Initialize on mount
    onMount(() => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx = canvas.getContext('2d');

        for (let i = 0; i < numPlanes; i++) {
            planes.push(createPlane(planeNames[i])); // Assign short codes to planes
        }

        animate();
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    });
</script>

<canvas bind:this={canvas} class="h-screen w-full bg-surface"></canvas>
