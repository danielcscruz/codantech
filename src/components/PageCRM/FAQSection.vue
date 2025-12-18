<script setup lang="ts">
import { ref } from 'vue'
import { faqList, type FAQ } from '../../data/crm/faq'

// Definindo as props
interface Props {
  gradient?: [string, string]; // Array com 2 cores
}

const props = withDefaults(defineProps<Props>(), {
  gradient: () => ['#0E172B', '#1d2c4b'] // Cores padrão se nada for passado
})

const items = ref<FAQ[]>(faqList)

</script>

<template>
  <div
    class="section"
    :style="{
      '--bg-color-top': props.gradient[0],
      '--bg-color-bottom': props.gradient[1]
    }"
  >
    <div class="container">

    <div class="title mt-4 mb-6">Perguntas Frequentes</div>

    <div class="faq-container">
      <v-expansion-panels class=" my-4" variant="inset">
        <v-expansion-panel
          v-for="item in items"
          :key="item.id"
          :text="item.answer"
          :title="item.question"
          class="list"
        ></v-expansion-panel>
      </v-expansion-panels>
    </div>

  </div>
  </div>
</template>

<style scoped>
.section {
  padding: 4rem 0;
  min-height: 50vh;
  /* Usamos as variáveis definidas no :style aqui */
  background: linear-gradient(180deg, var(--bg-color-top) 0%, var(--bg-color-bottom) 100%);
  width: 100%;
}
.list{
  background-color: transparent;
  color: whitesmoke;
  font-size: 1.2rem;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}
.title {
  font-family: 'GOBOLD LIGHT', sans-serif;
  font-size: 1.6rem;
  color: whitesmoke;
  text-transform: uppercase;
  margin-bottom: 8px;
  text-align: center;
}

.faq-container {
  background: rgba(255, 255, 255, 0.03) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  border-radius: 16px !important;
  padding: 20px;
}
</style>
