export class Clock {
    constructor(intervalFunc: (time: string) => void, digits: string[]) {
        this.#validateDigits(digits)
        this.#intervalFunc = intervalFunc
        this.#digits = digits
    }

    #intervalFunc:(time: string) => void
    #digits: string[]
    #interval: number | null = null

    get digits() {return this.#digits}

    #validateDigits(digits: string[]) {
        if (digits.length != 60) throw "must contain 60 digits"
        for (const d of digits) {
            if (digits.indexOf(d) != digits.lastIndexOf(d)) throw "no duplicate digits allowed"
        }
    }

    #getTime(): string {
        let date = new Date()
        return this.#digits[date.getHours()] + this.#digits[date.getMinutes()] + this.#digits[date.getSeconds()]
    }

    start() {
        if (!this.#interval) this.#interval = setInterval(() => this.#intervalFunc(this.#getTime()), 1000)
    }

    stop() {
        if (this.#interval) {
            clearInterval(this.#interval)
            this.#interval = null
        }
    }
}