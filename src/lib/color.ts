export function hexToRgba(hex: string, alpha = 1) {
    const s = hex.replace("#", "");
    const bigint = parseInt(s.length === 3 ? s.split("").map(c => c + c).join("") : s, 16);
    const r = (bigint >> 16) & 255, g = (bigint >> 8) & 255, b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function hexToRgb(hex: string) {
    const s = hex.replace('#', '');
    const v = s.length === 3 ? s.split('').map(c => c + c).join('') : s;
    const bigint = parseInt(v, 16);
    const r = (bigint >> 16) & 255, g = (bigint >> 8) & 255, b = bigint & 255;
    return { r, g, b };
}

export function hexToHsl(hex: string) {
    const { r, g, b } = hexToRgb(hex);
    const rn = r / 255, gn = g / 255, bn = b / 255;
    const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
    let h = 0, s = 0;
    const l = (max + min) / 2;
    const d = max - min;
    if (d !== 0) {
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case rn: h = (gn - bn) / d + (gn < bn ? 6 : 0); break;
            case gn: h = (bn - rn) / d + 2; break;
            case bn: h = (rn - gn) / d + 4; break;
        }
        h /= 6;
    }
    return { h, s, l };
}
