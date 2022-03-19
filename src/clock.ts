const second = 1000

export class Clock {
    constructor(intervalFunc: (time: string) => void, digits: string[], includeSeconds: boolean = true) {
        this.#validateDigits(digits)
        this.#intervalFunc = intervalFunc
        this.#digits = digits
        this.#intervalMs = includeSeconds ? second : second * 60
        this.#intervalId = null
    }

    #intervalFunc:(time: string) => void
    #digits: string[]
    #intervalId: number | null
    #intervalMs: number

    get digits() { return this.#digits }
    get isRunninng() { return Boolean(this.#intervalId) }
    get includeSeconds() { return this.#intervalMs == second }

    #validateDigits(digits: string[]) {
        if (digits.length != 60) throw "must contain 60 digits"
        for (const d of digits) {
            if (digits.indexOf(d) != digits.lastIndexOf(d)) throw "no duplicate digits allowed"
        }
    }

    getTime(): string {
        const date = new Date()
        let time = this.#digits[date.getHours()] + this.#digits[date.getMinutes()]
        if (this.includeSeconds) time += this.#digits[date.getSeconds()]
        return time
    }

    toggle() {
        if (this.#intervalId) {
            clearInterval(this.#intervalId)
            this.#intervalId = null
        } else {
            this.#intervalId = setInterval(() => this.#intervalFunc(this.getTime()), this.#intervalMs)
        }
    }
}