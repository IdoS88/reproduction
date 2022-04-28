
export interface IDB<T> {
    getAll : () => Promise<T[]>,
}

