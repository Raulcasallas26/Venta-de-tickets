import { DefineStore, defineStore } from "pinia";

export const useUserStore = defineStore("user", {
    state: () => ({
        npmbre: "",
    }),
    actions: {
        increment() {
            this.count++
        },
    },
})