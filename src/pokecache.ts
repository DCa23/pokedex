export class Cache {
    #cache = new Map<string, CacheEntry<any>>;
    #reapIntervalId: undefined | NodeJS.Timeout = undefined;
    #interval: number;

    constructor(interval: number) {
        this.#interval = interval;
        this.#startReapLoop();
    }

    async add<t>(key: string, newVal: t) {
        this.#cache.set(key, {
            createdAt: Date.now(),
            val: newVal
        })
    }

    get<t>(key: string): t {
        const entry = this.#cache.get(key);

        return this.#cache.get(key)?.val as t;
    }

    #reap(): void {
        for (const [entryKey, entry] of this.#cache.entries()) {
            if (entry.createdAt < Date.now() - this.#interval) {
                this.#cache.delete(entryKey);
            }
        }
    }

    #startReapLoop(): void {
        this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
    }

    stopReapLoop(): void {
        clearInterval(this.#reapIntervalId);
    }
}

export type CacheEntry<t> = {
    createdAt: number;
    val: t;
}