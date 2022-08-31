export function calculateChance(chance: number): string {
    if (chance > 1)
        return `${chance.toFixed(1)}%`;
    else {
        let d = (1 / chance) * 100;
        return `1/${d.toFixed(0)}`;
    }
}



export function numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}