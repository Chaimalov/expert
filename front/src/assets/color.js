

export function emoji_rgba(icon) {
    const canvas = document.createElement("canvas")
    canvas.width = 30;
    canvas.height = 30;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#121212'; // 12 => 17 in decimal
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = "20px Arial";
    ctx.fillText(icon, 0, 20);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    // an array in the format [r, g, b, count] decimal
    const sums = imageData.data.reduce((r, v, i) => {
        if (v === 18) return r; // our fill color, skip
        if (i % 4 !== 3) { // i % 4 === 3 is transparent, ignoring
            r[i % 4] += v;
            r[3]++;
        }

        return r;
    }, [0, 0, 0, 0]);

    sums[3] = sums[3] / 3; // divide by 3 since we counted each pixel 3 times
    const averages = [Math.floor(sums[0] / sums[3]), Math.floor(sums[1] / sums[3]), Math.floor(sums[2] / sums[3])];

    const rgbToHsl = (r, g, b) => {
        let rPercentage = r / 255.0;
        let gPercentage = g / 255.0;
        let bPercentage = b / 255.0;

        const cMax = Math.max(rPercentage, gPercentage, bPercentage);
        const cMin = Math.min(rPercentage, gPercentage, bPercentage);

        const luminance = Math.round(((cMax + cMin) * 0.5) * 100.0);
        const saturation = Math.round((cMax - cMin) / (luminance < 50.0 ? (cMax + cMin) : (2.0 - cMax - cMin)) * 100.0);
        const hueBase = rPercentage === cMax ? (gPercentage - bPercentage) / (cMax - cMin) : gPercentage === cMax ? 2.0 + (bPercentage - rPercentage) / (cMax - cMin) : 4.0 + (rPercentage - gPercentage) / (cMax - cMin);
        const hue = Math.round(hueBase * 60.0);

        return [hue, saturation, luminance];
    }
    // just to see the color
    return rgbToHsl(...averages)
}

