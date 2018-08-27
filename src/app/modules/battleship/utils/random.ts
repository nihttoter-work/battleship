export function randomFrom0to9(): number {
    return Math.floor(Math.random() * 10);
}

export function randomBoolean(): boolean {
    return !!Math.floor(Math.random() * 2);
}