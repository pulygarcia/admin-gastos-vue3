<template>
  <div class="alerta">
    <slot></slot>
  </div>
</template>

<style scoped>
  .alerta{
    border-left: .5rem solid rgb(204, 38, 38);
    font-size: 1.6rem;
    text-transform: uppercase;
    text-align: center;
    background-color: #fff;
    color: rgb(204, 38, 38);
    font-weight: 900;
    margin-bottom: 3rem;
    padding: 1rem 0;
  }
</style>