export function getRandomNumber(base: number): number {
    return Math.floor(Math.random() * base);
}

export function getRandomBoolean(): boolean {
    return !!Math.floor(Math.random() * 2);
}