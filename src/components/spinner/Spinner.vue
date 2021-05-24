<template>
  <div class="spinning-icon">
    <div class="load-icon" :style="cssVars"></div>
  </div>
</template>

<script>
export default {
  // propiedad de asignacion de color desde el componente padre
  props: ["color"],
  name: "Spinner",
  computed: {
    cssVars() {
      return {
        "--color": this.color,
      };
    },
  },
};
</script> 

<style scoped>
@keyframes circle-rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.spinning-icon {
  width: 50px;
  height: 50px;
  /*MArgin to center the spinner horizontally*/
  margin: 0 auto;
}

.load-icon {
  width: 100%;
  height: 100%;
  position: relative;
}

.load-icon::after {
  content: "";
  display: inline-block;
  width: 100%;
  height: 100%;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 10px solid var(--color);
  border-right: 10px solid var(--color);
  border-radius: 50%;
  position: absolute;
  top: -3px;
  left: -3px;
  animation: circle-rotate 0.8s both linear infinite;
}
</style>