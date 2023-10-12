<script setup>
    import { computed } from 'vue';
    import {formatearDinero} from '../helpers/index';
    import CircleProgress from "vue3-circle-progress";
    import "vue3-circle-progress/dist/circle-progress.css";

    const props = defineProps({
        presupuesto:{
            type: Number,
            required: true
        },
        restante:{
            type: Number,
            required: true
        },
        gastado:{
            type: Number,
            required: true
        }
    })

    defineEmits(['resetear-app']);

    const porcentaje = computed(() => {
        return parseInt(( (props.presupuesto - props.restante) / props.presupuesto) * 100);
    })
</script>

<template>
  <div class="dos-columnas">
    <div class="contenedor-grafico">
        <p class="porcentaje">{{ porcentaje }}%</p>

        <circle-progress 
            :percent="porcentaje"
            :transition="500"
            fill-color="#4a1392"
        />
    </div>
    <div class="contenedor-presupuesto">
        <button
            type="button"
            class="reset-app"
            @click="$emit('resetear-app')"
        >
            Resetear App
        </button>

        <p>
            <span>Presupuesto: </span>
            {{ formatearDinero(presupuesto) }}
        </p>

        <p>
            <span>Gastado: </span>
            {{ formatearDinero(gastado) }}
        </p>
        
        <p>
            <span>Restante: </span>
            {{ formatearDinero(restante) }}

        </p>
    </div>
  </div>
</template>

<style scoped>
    .dos-columnas{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4rem;
    }
    @media (min-width: 768px){
        .dos-columnas{
            flex-direction: row;
        }
    }
    .reset-app{
        background-color: rgb(255 110 110);
        border-radius: 1rem;
        width: 100%;
        font-size: 2rem;
        padding: 1rem;
        font-weight: 700;
        border: none;
        color: var(--blanco);
        transition: .2s ease;
        text-transform: uppercase;
    }
    .reset-app:hover{
        cursor: pointer;
        background-color: rgb(197, 84, 84);
    }
    .contenedor-presupuesto{
        width: 100%;
    }

    .contenedor-presupuesto p{
        font-size: 2.4rem;
        text-align: center;
    }
    @media (min-width: 768px){
        .contenedor-presupuesto p{
            text-align: left;
        }
    }
    .contenedor-presupuesto span{
        color: #6119be;
        font-weight: 900;
    }

    .contenedor-grafico{
        position: relative;
    }
    .porcentaje{
        position: absolute;
        margin: auto;
        top: calc(50% - 1.5rem);
        right: 0;
        left: 0;
        text-align: center;
        z-index: 100;
        font-size: 2.8rem;
        font-weight: 900;
        color: var(--gris-oscuro);
    }

</style>