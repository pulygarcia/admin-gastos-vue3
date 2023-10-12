<script setup>
    import {ref} from 'vue';

    import Alerta from './Alerta.vue';

    const presupuesto = ref(0);
    const error = ref('');

    const emit = defineEmits(['definirPresupuesto']);

    const definirPresupuesto = () => {
        if(presupuesto.value <= 0 || presupuesto.value === ''){
            error.value = 'Presupuesto no valido';

            setTimeout(() => {
                error.value = '';
            }, 3000);

            return;
        }

        emit('definirPresupuesto', presupuesto.value);
    }
</script>

<template>
  <form 
    class="presupuesto"
    @submit.prevent="definirPresupuesto"
  >

  <Alerta v-if="error">
    {{error}}
  </Alerta>

    <div class="campo">
        <label for="nuevo-gasto">Ingresar presupuesto</label>

        <input 
            id="nuevo-gasto"
            class="nuevo-gasto"
            placeholder="Añade tu presupuesto"
            type="number"
            min="0"
            v-model="presupuesto"
        >
    </div>

    <input type="submit" value="Definir presupuesto">
  </form>
</template>

<style scoped>
    .presupuesto{
        width: 100%;
    }
    .campo{
        display: grid;
        gap: 2rem;
    }
    .campo label{
        text-align: center;
        font-size: 2.5rem;
        color: #6119be;
        font-weight: 900;
    }
    .presupuesto input[type="number"] {
        background-color: var(--gris-claro);
        border-radius: 1rem;
        padding: 1rem;
        border: none;
        font-size: 2.2rem;
        text-align: center;
    }
    .presupuesto input[type="submit"]{
        border: none;
        text-align: center;
        padding: 1rem;
        background-color: #6119be;
        color: var(--blanco);
        border-radius: 1rem;
        font-weight: 700;
        margin-top: 2rem;
        width: 100%;
        transition: .2s ease;
    }
    .presupuesto input[type="submit"]:hover{
        background-color: #4a1392;
        cursor: pointer;
    }
</style>