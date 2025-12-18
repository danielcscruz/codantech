<script setup lang="ts">
import { ref } from 'vue'
import { stepList, type Steps } from '../../data/crm/steps'

interface Props {
  gradient?: [string, string]; // Array com 2 cores
}

const props = withDefaults(defineProps<Props>(), {
  gradient: () => ['#0E172B', '#1d2c4b'] // Cores padrão se nada for passado
})

const items = ref<Steps[]>(stepList)

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
      <!-- <v-img :src="marvin" height="400px" class="mb-5"></v-img> -->
      <div class="title mt-4 mb-2">Como começar a utilizar o CRM?</div>
      <div class="subtitle mt-4 mb-10">É simples e desburocratizado</div>

      <div class="steps-grid">
        <div v-for="(item, index) in items" :key="item.id" class="step-column">
          <div class="step-icon">
            {{ index + 1 }}
          </div>

          <h3 class="step-title">{{ item.step }}</h3>

          <p class="step-detail">{{ item.detail }}</p>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.section {
  padding: 4rem 0;
  min-height: 50vh;
  background: linear-gradient(180deg, var(--bg-color-top) 0%, var(--bg-color-bottom) 100%);
  width: 100%;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  font-family: 'GOBOLD LIGHT', sans-serif;
  font-size: 1.6rem;
  color: whitesmoke;
  text-transform: uppercase;
  text-align: center; /* Centralizado para combinar com grid */
}

.subtitle {
  color: #a0aec0;
  text-align: center;
  margin-bottom: 3rem;
}

/* Grid das 4 colunas */
.steps-grid {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
}

.step-column {
  flex: 1; /* Faz todas as colunas terem a mesma largura (25% cada) */
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

/* Estilo do Círculo com Número */
.step-icon {
  width: 50px;
  height: 50px;
  border-radius: 10%;
  background-color: #0000006c; /* Cor de destaque */
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-family: 'GOBOLD LIGHT', sans-serif;
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.step-title {
  font-family: 'GOBOLD LIGHT', sans-serif;
  color: whitesmoke;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.step-detail {
  color: #cbd5e0;
  font-size: 0.9rem;
  line-height: 1.4;
}

/* Responsividade: vira lista no celular */
@media (max-width: 768px) {
  .steps-grid {
    flex-direction: column;
    gap: 40px;
  }
}
</style>
