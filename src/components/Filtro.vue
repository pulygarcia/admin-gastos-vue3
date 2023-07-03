<script setup>
    defineProps(['filtro']);
    
    defineEmits(['update:filtro']);
</script>

<template>
  <div class="filtro shadow">
    <form>
        <div class="campo">
            <label for="filtro">Filtrar Gastos</label>
            <select 
                    id="filtro"
                    :value="filtro"
                    @input="$emit('update:filtro', $event.target.value)"
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
    </form>
  </div>
</template>

<style scoped>
  .filtro{
    background-color: #fff;
    margin-top: 10rem;
    padding: 2rem;
    border-radius: 1rem;
  }
  .campo{
    display: flex;
    align-items: center;
    gap: 3rem;
  }
  .campo label{
    color: var(--gris-oscuro);
    font-weight: 900;
    font-size: 2.8rem;
  }
  .campo select{
    flex: 1;
    padding: 1rem 0;
    background-color: var(--gris-claro);
    text-align: center;
    border: none;
    border-radius: 1rem;
  }
</style>