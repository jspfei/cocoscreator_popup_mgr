
/**
 * 扩展数组
 */

export class ArrayUtil {

}

declare global {
    interface Array<T> {
        remove(elem: T): Array<T>;
        RemoveAt(idx: number);
        Contains(one: T): boolean;
        Insert(idx: number, one: T);
        addUnique(elem: T);
    }
}

if (!Array.prototype.addUnique) {
    Array.prototype.addUnique = function <T>(elem: T) {
        if (this.indexOf(elem) === -1) {
            this.push(elem)
        }
    }
}

if (!Array.prototype.remove) {
    Array.prototype.remove = function <T>(elem: T): T[] {
        for (let i = 0; i < this.length; i++) {
            if (this[i] == elem) {
                this.RemoveAt(i);
                break;
            }
        }
        return this.filter(e => e !== elem);
    }
}
if (!Array.prototype.RemoveAt) {
    Array.prototype.RemoveAt = function (idx: number) {
        this.splice(idx, 1);
    }
}
if (!Array.prototype.Contains) {
    Array.prototype.Contains = function <T>(one: T) {
        for (let it of this) {
            if (it == one) {
                return true;
            }
        }
        return false;
    }
}
if (!Array.prototype.Insert) {
    Array.prototype.Insert = function <T>(idx: number, one: T) {
        let old = this.length;
        this.splice(idx, 0, one);

        if (old + 1 !== this.length) {
            throw new Error("插入错误1");
        }
        if (this[idx] !== one) {
            throw new Error("插入错误2");
        }
    }
}