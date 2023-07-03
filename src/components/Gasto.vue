<script setup>
    import { formatearFecha, formatearDinero } from '../helpers';

    import IconoAhorro from '../assets/img/icono_ahorro.svg'
    import IconoCasa from '../assets/img/icono_casa.svg'
    import IconoComida from '../assets/img/icono_comida.svg'
    import IconoGastos from '../assets/img/icono_gastos.svg'
    import IconoOcio from '../assets/img/icono_ocio.svg'
    import IconoSalud from '../assets/img/icono_salud.svg'
    import IconoSuscripciones from '../assets/img/icono_suscripciones.svg'

    const props = defineProps({
        gasto:{
            type: Object,
            required: true
        }
    })

    defineEmits(['seleccionarGasto']);

    const objetoIconos = {
        ahorro: IconoAhorro,
        casa: IconoCasa,
        comida: IconoComida,
        gastos: IconoGastos,
        ocio: IconoOcio,
        salud: IconoSalud,
        suscripciones: IconoSuscripciones
    }
</script>

<template>
  <div class="gasto shadow">
    <div class="contenido">
        <img :src="objetoIconos[gasto.categoria]" alt="icono" class="icono">

        <div class="detalles">
            <p class="categoria"><span>{{ gasto.categoria}}</span></p>

            <p 
                class="nombre"
                @click="$emit('seleccionarGasto', gasto.id)"
            >
                <span>{{ gasto.nombre }}</span>
            </p>

            <p class="fecha">Fecha: <span>{{ formatearFecha(gasto.fecha) }}</span></p>
        </div>
    </div>

    <p class="cantidad">{{ formatearDinero(gasto.cantidad) }}</p>
  </div>
</template>

<style scoped>
    .gasto{
        margin-bottom: 2rem;
        background-color: var(--blanco);
        padding: 1.5rem;
        border-radius: 1.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .contenido{
        display: flex;
        gap: 2rem;
        align-items: center;
    }
    .icono{
        width: 6rem;
    }
    .detalles p{
        margin: 0 0 1rem 0;
    }
    .categoria span{
        color: var(--gris-claro);
        font-size: 1.2rem;
        text-transform: uppercase;
        font-weight: 900;
    }
    .nombre{
        color: var(--gris-oscuro);
        font-size: 2.3rem;
        font-weight: 700;
        cursor: pointer;
        text-transform: capitalize;
    }
    .fecha{
        font-size: 1.6rem;
        font-weight: 900;
        color: var(--gris-oscuro);
    }
    .fecha span{
        font-weight: 700;

    }
    .cantidad{
        margin: 0;
        font-size: 2.8rem;
        font-weight: 900;
    }
</style>