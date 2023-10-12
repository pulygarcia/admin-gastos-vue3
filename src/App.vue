<script setup>
  import {reactive, ref, watch, computed, onMounted} from 'vue';

  import Presupuesto from './components/Presupuesto.vue';
  import ControlPresupuesto from './components/ControlPresupuesto.vue';
  import Modal from './components/Modal.vue';
  import Gasto from './components/Gasto.vue';
  import Filtro from './components/Filtro.vue';

  import nuevoGastoIcono from './assets/img/nuevo-gasto.svg';
  import {generarId} from './helpers/index';

  const presupuesto = ref(0);
  const restante = ref(0);
  const gastado = ref(0);
  const gastos = ref([]);
  const filtro = ref('');

  const gasto = reactive({
    nombre: '',
    cantidad: 0,
    categoria: '',
    id: null,
    fecha: Date.now()
  });

  const reiniciarGasto = () => {
    Object.assign(gasto, {
      nombre: '',
      cantidad: 0,
      categoria: '',
      id: null,
      fecha: Date.now()
    }
    )
  }

  const modal = reactive({
    mostrar: false,
    animar: false
  })

  watch(gastos, () => {
    localStorage.setItem('gastos', JSON.stringify(gastos.value));

    gastado.value = gastos.value.reduce((total, gasto) => gasto.cantidad + total, 0);
    restante.value = presupuesto.value - gastado.value;
  },{
    deep: true
  })

  watch(modal, () => {
    if(!modal.mostrar){
      reiniciarGasto();
    }
  }, {
    deep: true
  })

  watch(presupuesto, () => {
    localStorage.setItem('presupuesto', presupuesto.value); 
  })

  onMounted(() => {
    const presupuestoStorage = localStorage.getItem('presupuesto');
    if(presupuestoStorage){
      presupuesto.value = Number(presupuestoStorage);
      restante.value = Number(presupuestoStorage);
    }

    const gastosStorage = JSON.parse(localStorage.getItem('gastos'));
    if(gastosStorage){
      gastos.value = gastosStorage;
    }
  })

  const definirPresupuesto = (monto) => {
    presupuesto.value = monto;
    restante.value = monto;
  }

  const mostrarModal = () => {
    modal.mostrar = true;
    setTimeout(() => {
      modal.animar = true;
    }, 200);
  }
  
  const ocultarModal = () => {
    modal.mostrar = false;
    setTimeout(() => {
      modal.animar = false;
    }, 200);
  }

  const nuevoGasto = () => {
    if(gasto.id){
      //editando
      const {id} = gasto;

      const i = gastos.value.findIndex((gasto => gasto.id === id));

      gastos.value[i] = {...gasto}; //actualizarlo con lo que tenga el modal en ese momento
    }else{
      //nuevo gasto

      gastos.value.push({...gasto, id: generarId()});
    }

    ocultarModal();

    reiniciarGasto();
  }

  //editar el gasto seleccionado
  const seleccionarGasto = (id) => {
    const gastoSeleccionado = gastos.value.filter(gasto => gasto.id === id)[0];

    Object.assign(gasto, gastoSeleccionado);

    mostrarModal();
  }

  const eliminarGasto = (id) => {
    gastos.value = gastos.value.filter(gasto => gasto.id !== id);

    ocultarModal();
  }

  const filtrarGastos = computed(() => {
    if(filtro.value){
      return gastos.value.filter(gasto => gasto.categoria === filtro.value);
    }else{
      return gastos.value;
    }
  })

  const resetearApp = () => {
    if(confirm('Se eliminarán tus gastos y presupuesto')){
      gastos.value = [];
      presupuesto.value = 0;
    }
  }
</script> 

<template>
  <div>
    <header>
      <h1>Planificador de gastos</h1>

      <div class="contenedor contenedor-header shadow">
        <Presupuesto 
          v-if="presupuesto <= 0"
          @definir-presupuesto="definirPresupuesto"
        />
        
        <ControlPresupuesto 
          v-else
          :presupuesto="presupuesto"
          :restante="restante"
          :gastado="gastado"
          @resetear-app="resetearApp"
        />
      </div>
    </header>

    <main 
      v-if="presupuesto > 0"
      class="contenedor"
    >

      <Filtro 
        v-model:filtro="filtro"
      />

      <div class="listado-gastos">
        <h3>{{ gastos.length > 0 ? 'Gastos' : 'No hay gastos'}}</h3>

        <Gasto 
          v-for="gasto in filtrarGastos"
          :gasto="gasto"
          :key="gasto.id"
          @seleccionar-gasto="seleccionarGasto"
        />
      </div>

      <div class="crear-gasto">
        <div class="crear-icon-div"
          v-if="presupuesto"
          :src="nuevoGastoIcono"
          @click="mostrarModal"
        >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="svg-plus">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>

        </div>
      </div>

      <Modal 
        v-if="modal.mostrar"
        @ocultar-modal="ocultarModal"
        :modal="modal"
        :gasto="gasto"
        :restante="restante"
        :id="gasto.id"
        v-model:nombre="gasto.nombre"
        v-model:cantidad="gasto.cantidad"
        v-model:categoria="gasto.categoria"
        @nuevo-gasto="nuevoGasto"
        @eliminar-gasto="eliminarGasto"
      />
    </main>
  </div>
</template>

<style>
  :root{
    --azul: #3b82f6;
    --blanco: #fff;
    --gris-claro: #dde1e7;
    --gris: #f5f5f5;
    --gris-oscuro: #64748b;
    --negro: #000;
  }

  html{
    box-sizing: border-box;
    font-size: 62.5%;
  }

  *, *:after, *:before{
    box-sizing: inherit;
  }

  body{
    font-size: 1.6rem;
    font-family: 'Lato', sans-serif;
    background-color: rgb(17, 24, 39);
  }

  h1{
    font-size: 4rem;
  }
  h2{
    font-size: 3rem;
  }

  header{
    background-image: linear-gradient(to right, rgb(55, 65, 81), rgb(17, 24, 39), rgb(0, 0, 0));
  }

  header h1{
    padding: 3rem 0;
    margin: 0;
    color: #fff;
    text-align: center;
  }

  .contenedor{
    width: 90%;
    max-width: 80rem;
    margin: 0 auto;
  }
  .contenedor-header{
    background-color: var(--blanco);
    border-radius: 2rem;
    margin-top: -5rem;
    transform: translateY(5rem);
    padding: 5rem;
  }
  .shadow{
    box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1);
  }
  .crear-gasto{
    position: fixed;
    bottom: 5rem;
    right: 5rem;
  }
  .crear-icon-div{
    cursor: pointer;
    transition: .2s ease;
    border-radius: 100%;
    border: none;
    background-color: black;
    padding: 1rem;
  }
  .svg-plus{
    color: #ff6e6e;
    width: 5rem;
  }
  .listado-gastos{
    margin-top: 10rem;
  }
  .listado-gastos h3{
    color: var(--gris-oscuro);
    font-weight: 900;
    font-size: 2.8rem;
  }
</style>
