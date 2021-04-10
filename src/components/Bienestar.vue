<template>
    <div class="bienestar">
        Pagina de bienestar
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