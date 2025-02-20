export default class HashMap {
    MAX_CAP = 0.75;
    buckets = Array.from({ length: 16 }, () => []);
    size = 0;

    hashCode(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
            hashCode = hashCode % this.buckets.length;
        }

        return hashCode;
    }

    set(key, value) {
        const index = this.hashCode(key);
        const bucket = this.buckets[index];

        const items = bucket.find((item) => item.key === key);
        if (items) {
            items.value = value;
            return;
        }

        if (bucket.length === 0) this.size += 1;
        bucket.push({ key, value });
    }

    get(key) {
        const index = this.hashCode(key);
        const bucket = this.buckets[index];

        const check = bucket.find((item) => item.key === key);
        if (check) return check.value
        return null
    }

    has(key) {
        const index = this.hashCode(key);
        const bucket = this.buckets[index];

        for (let item of bucket) {
            if (item.key === key) return true
        }

        return false
    }

    remove(key) {
        const index = this.hashCode(key);
        const bucket = this.buckets[index];
        const itemsIndex = bucket.findIndex((item) => item.key === key);
        if (itemsIndex === -1) return false;

        bucket.splice(itemsIndex, 1);
        if (bucket.length === 0) this.size -= 1;
        return true;
    }

    length() {
        console.log(this.size);
    }

    clear() {
        const newBuckets = Array.from({ length: 16 }, () => []);
        this.buckets = newBuckets;
        this.size = 0;
    }

    keys() {
        const keys = [];
        this.buckets.forEach((bucket) => {
            bucket.forEach((item) => keys.push(item.key));
        });
        return keys;
    }

    values() {
        const values = [];
        this.buckets.forEach((bucket) => {
            bucket.forEach((item) => values.push(item.value));
        });
        return values;
    }

    entries() {
        const items = [];
        this.buckets.forEach((bucket) => {
            bucket.forEach((item) => items.push(`[${item.key}, ${item.value}]`));
        })
        return items;
    }   

}