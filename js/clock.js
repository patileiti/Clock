export class Clock {
    constructor(intervalFunc, digits) {
        this.#validateDigits(digits);
        this.#intervalFunc = intervalFunc;
        this.#digits = digits;
    }
    #intervalFunc;
    #digits;
    #interval = null;
    get digits() { return this.#digits; }
    #validateDigits(digits) {
        if (digits.length != 60)
            throw "must contain 60 digits";
        for (const d of digits) {
            if (digits.indexOf(d) != digits.lastIndexOf(d))
                throw "no duplicate digits allowed";
        }
    }
    #getTime() {
        let date = new Date();
        return this.#digits[date.getHours()] + this.#digits[date.getMinutes()] + this.#digits[date.getSeconds()];
    }
    start() {
        if (!this.#interval)
            this.#interval = setInterval(() => this.#intervalFunc(this.#getTime()), 1000);
    }
    stop() {
        if (this.#interval) {
            clearInterval(this.#interval);
            this.#interval = null;
        }
    }
}
