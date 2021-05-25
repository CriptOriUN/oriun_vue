import Vue from 'vue';

export let toaster = new Vue({
    // el toaster se ve en la pantalla pero no tiene template como tal
    methods: {
        success(message) {
            Vue.toasted.show(message, {
                position: "bottom-right",
                icon: "check",
                type: "success",
                action: {
                    text: "ok",
                    onClick: (e, toast) => {
                        toast.goAway(0);
                    },
                },
            });
        },
        failure(message) {
            Vue.toasted.show(message, {
                position: "bottom-right",
                icon: "error_outline",
                type: "error",
                action: {
                    text: "ok",
                    onClick: (e, toast) => {
                        toast.goAway(0);
                    },
                },
            });
        },
    }
})