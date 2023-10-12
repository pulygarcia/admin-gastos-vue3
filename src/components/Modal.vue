<script setup>
    import { ref } from 'vue';

    import cerrarModalIcono from '../assets/img/cerrar.svg';
    import Alerta from '../components/Alerta.vue';

    const emit = defineEmits(['ocultarModal', 'update:nombre', 'update:cantidad', 'update:categoria', 'nuevoGasto', 'eliminarGasto']);


    const props = defineProps({
        modal:{
            type: Object,
            required: true
        },
        nombre:{
          type: String,
          required: true
        },
        cantidad:{
          type: [Number, String],
          required: true
        },
        categoria:{
          type: String,
          required: true
        },
        restante:{
          type: [Number, String],
          required: true
        },
        id:{
          type: [Number, null, String],
          required: true
        }
    })

    const cantidadOld = props.cantidad; //cantidad que se agregó antes de la edición

    const error = ref(false);

    const agregarGasto = () => {
      const {nombre, cantidad, categoria, id, restante} = props;

      if([nombre,cantidad,categoria].includes('')){
        error.value = 'Completa los campos';
        setTimeout(() => {
          error.value = '';
        }, 3000);

        return;
      }

      if(cantidad <= 0){
        error.value = 'Cantidad no válida';
        setTimeout(() => {
          error.value = '';
        }, 3000);

        return;
      }

      if(id){
        //editando
        if(cantidad > cantidadOld + restante){
          error.value = 'No hay fondos suficientes';
          setTimeout(() => {
            error.value = '';
          }, 3000);
  
          return;
        }

      }else{
        if(cantidad > props.restante){
          error.value = 'No hay fondos suficientes';
          setTimeout(() => {
            error.value = '';
          }, 3000);
  
          return;
        }
      }

      //Push
      emit('nuevoGasto');
      emit('ocultarModal');
    }

</script>

<template>
  <div class="modal">
    <div class="cerrar-modal">
        <img
            :src="cerrarModalIcono"
            @click="$emit('ocultarModal')"
        >
    </div>

    <div 
        class="contenedor contenedor-formulario"
        :class="[modal.animar ? 'animar' : 'cerrar']"
    >
        <form 
            class="nuevo-gasto"
            @submit.prevent="agregarGasto"
        >
            <legend>{{ props.id ? 'Editar Gasto' : 'Añadir Gasto' }}</legend>

            <Alerta v-if="error">
              {{error}}
            </Alerta>

            <div class="campo">
                <label for="nombre">Nombre Gasto:</label>
                <input 
                    type="text"
                    placeholder="Añade el gasto"
                    id="nombre"
                    :value="nombre"
                    @input="$emit('update:nombre', $event.target.value)"
                    
                >
            </div>

            <div class="campo">
                <label for="cantidad">Cantidad:</label>
                <input 
                    type="number"
                    placeholder="Añade cantidad del gasto"
                    id="cantidad"
                    :value="cantidad"
                    min="0"
                    @input="$emit('update:cantidad', +$event.target.value)"
                >
            </div>

            <div class="campo">
                <label for="categoria">Categoría:</label>
                <select 
                    id="categoria"
                    :value="categoria"
                    @input="$emit('update:categoria', $event.target.value)"
                >
                    <option value="">--Seleccione--</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="gastos">Gastos</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>
                </select>
            </div>
            <input 
                type="submit"
                :value="[ props.id ? 'Guardar Cambios' : 'Añadir Gasto' ]"
                class="añadir-gasto"
            >

            <button
              v-if="props.id"
              type="button"
              class="eliminar-btn"
              @click="$emit('eliminarGasto', props.id)"
            >
              Eliminar Gasto
            </button>
        </form>
    </div>
  </div>
</template>

<style scoped>
  .modal{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgb(0 0 0 / .9);
  }
  .modal img{
    width: 3rem;
    position: absolute;
    top: 3rem;
    right: 3rem;
    cursor: pointer;
  }

  .contenedor-formulario{
    transition-property: all;
    transition-duration: .2s;
    transition-timing-function: ease-in;
    opacity: 0;
  }
  .contenedor-formulario.animar{
    opacity: 1;
  }
  .contenedor-formulario.cerrar{
    opacity: 0;
  }
  .nuevo-gasto{
    margin: 10rem auto 0 auto;
  }
  .nuevo-gasto legend{
    display: block;
    text-align: center;
    font-size: 3.5rem;
    font-weight: 900;
    color: var(--blanco);
    margin-bottom: 5rem;
  }
  .campo{
    display: grid;
    gap: 2rem;
  }
  .nuevo-gasto input, .nuevo-gasto select{
    background-color: var(--gris-claro);
    border: none;
    border-radius: 1rem;
    font-size: 2.2rem;
    padding: 1rem;
  }
  .nuevo-gasto input[type="submit"]{
    background-color: #6119be;
    margin-top: 2rem;
    color: var(--blanco);
    cursor: pointer;
    width: 100%;
    transition: .2s ease;
  }
  .nuevo-gasto input[type="submit"]:hover{
    background-color: #4a1392;
  }
  .nuevo-gasto label{
    color: #fff;
    font-size: 3rem;
    font-weight: 700;
    margin-top: 1rem;
  }

  .eliminar-btn{
    background-color: rgb(194, 16, 16);
    color: #fff;
    font-size: 2rem;
    font-weight: 900;
    text-align: center;
    width: 100%;
    border: none;
    padding: 1rem 0;
    margin-top: 2.8rem;
    cursor: pointer;
  }
</style>