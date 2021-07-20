/**
    Checks if a given input is a valid degree type (either Celcius or Fahrenheit).
    @param input The user's input.
    @returns Validity of the input.
*/
export function isDegreeType(input: unknown): boolean {
    return (
        typeof input === "string" &&
        input === "C" ||
        input === "F"
    );
}

/**
    Checks if a given input adheres to the ISO 639.1:2002 standard.
    @param input The user's input.
    @returns Validity of the input.
*/
export function isLanguageCode(input: unknown): boolean {
    return (
        typeof input === "string" &&
        input.length === 2 &&
        !!input.match(/[A-Za-z]/)
    );
}