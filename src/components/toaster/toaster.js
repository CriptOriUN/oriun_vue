import Vue from 'vue';

export let toaster = new Vue({
    // el toaster se ve en la pantalla pero no tiene template como tal
    methods: {
        success(message) {
            Vue.toasted.show(message, {
                position: "bottom-right",
                icon: "check",
                type: "success",
                duration: 5000,
                keepOnHover: true,
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
                keepOnHover: true,
                duration: 5000,
                action: {
                    text: "ok",
                    onClick: (e, toast) => {
                        toast.goAway(0);
                    },
                },
            });
        },
        info(message) {
            Vue.toasted.show(message, {
                position: "bottom-right",
                icon: "info_outline",
                type: "info",
                keepOnHover: true,
                duration: 5000,
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