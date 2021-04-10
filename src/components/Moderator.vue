<template>
    <div class="moderador">
        Pagina de moderador
    </div>
</template> 

<script>
export default {
    created: function(){
        this.username = this.$route.params.username; 
    }
}
</script> 

<style scoped>

</style>