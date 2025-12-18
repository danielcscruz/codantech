<script setup lang="ts">
import { ref } from 'vue'
import { crmData, type crmTab } from '../../data/crm/crmtab'

const items = ref<crmTab[]>(crmData)
const tab = ref(null) // Controla a aba ativa

// Definindo as props
interface Props {
  gradient?: [string, string]; // Array com 2 cores
}

const props = withDefaults(defineProps<Props>(), {
  gradient: () => ['#0E172B', '#1d2c4b'] // Cores padrão se nada for passado
})

// Função para obter a cor CSS baseada no nome da cor
const getColorVariable = (colorName: string) => {
  const colorMap: Record<string, string> = {
    purple: '#9C27B0',
    blue: '#2196F3',
    orange: '#FF9800',
    yellow: '#FFC107',
    green: '#4CAF50',
    red: '#F44336',
    pink: '#E91E63',
    teal: '#009688'
  }
  return colorMap[colorName] || '#2196F3'
}
function getImage(imagePath: string) {
  if (!imagePath) return '' // evita undefined
  return new URL(`../../assets/img/products/${imagePath}`, import.meta.url).href
}
</script>

<template>
  <div class="section "
  :style="{
      '--bg-color-top': props.gradient[0],
      '--bg-color-bottom': props.gradient[1]
    }">
    <div class="container">

      <v-card class="tabs-container">
        <v-tabs
          v-model="tab"
          bg-color="transparent"
          color="primary"
          align-tabs="center"
          show-arrows
          grow
          class="custom-tabs"
        >
          <v-tab
            v-for="item in items"
            :key="item.id"
            :value="item.id"
            class="tab-item"
            :style="{ '--tab-color': getColorVariable(item.color) }"
          >
            <div class="d-flex align-center justify-center flex-grow-1" style="gap: 8px;">
              <v-icon :icon="item.icon" size="22" />
              <span class="tab-title">{{ item.title }}</span>
            </div>
          </v-tab>
        </v-tabs>

<v-window v-model="tab" class="mt-8">
  <v-window-item
    v-for="item in items"
    :key="item.id"
    :value="item.id"
  >
    <v-card flat class="content-card" :style="{ '--feature-color': getColorVariable(item.color) }">
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-row>
              <v-col cols="12" class="mb-4">
                <h3 class="content-title2" :style="{ color: getColorVariable(item.color) }">
                  {{ item.title2 }}
                </h3>
                <h4 class="content-subtitle">
                  {{ item.subtitle }}
                </h4>
                <div class="title-underline" :style="{ background: getColorVariable(item.color) }"></div>
              </v-col>

              <v-col
                v-for="(description, index) in item.listDescription"
                :key="index"
                cols="12" sm="6"
                class="list-item"
              >
                <v-icon
                  icon="mdi-check-circle"
                  size="small"
                  class="list-icon"
                  :style="{ color: getColorVariable(item.color) }"
                  v-if="description.trim() !== ''"
                />
                <span class="list-text">{{ description }}</span>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="12" md="6" class="d-flex align-center justify-center">
            <v-img
              :src="getImage(item.img)"
              :alt="item.title"
              max-height="400"
              class="rounded-lg feature-image"
              cover
            >

            </v-img>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-window-item>
</v-window>

      </v-card>

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
  padding: 0 1rem;
}

/* Estilização do Container das Tabs */
.tabs-container {
  background: rgba(255, 255, 255, 0.03) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  border-radius: 16px !important;
  padding: 20px;
}

/* Estilo das Abas */
.tab-item {
  font-family: 'GOBOLD LIGHT', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: rgba(255, 255, 255, 0.6) !important;
  transition: all 0.3s ease;
}

.tab-item:hover {
  color: var(--tab-color) !important;
}

/* Estilo da Aba Ativa */
.v-tab--selected {
  color: var(--tab-color) !important;
  opacity: 1;
}

.tab-title {
  font-size: 0.9rem;
}

/* Conteúdo */
.content-card {
  background: transparent !important;
  min-height: 200px;
}

.custom-list {
  padding: 1rem;
}

.list-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 12px;
}

.list-icon {
  margin-top: 4px;
  flex-shrink: 0;
}

.list-text {
  flex: 1;
  line-height: 1.5;
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.85);
  text-align: left;
}

/* Ajustes para GOBOLD */
.tab-item, .list-text {
  /* Caso a fonte não carregue, mantém um fallback limpo */
  font-family: 'GOBOLD LIGHT', sans-serif;
}

.content-title2 {
  font-family: 'GOBOLD LIGHT', sans-serif;
  font-size: 1.8rem;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.content-subtitle {
  font-family: 'GOBOLD LIGHT', sans-serif;
  color: whitesmoke;
  font-size: 0.9rem;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.title-underline {
  height: 3px;
  width: 60px;
  border-radius: 2px;
  margin-bottom: 1rem;
}

.feature-image {
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  transition: transform 0.5s ease;
}

.content-card:hover .feature-image {
  transform: scale(1.02);
}

.list-text {
  font-size: 0.95rem; /* Ajuste para caber melhor em duas colunas internas */
}

@media (max-width: 960px) {
  .content-title {
    font-size: 1.4rem;
    text-align: center;
  }
  .title-underline {
    margin: 0 auto 1.5rem;
  }
}

@media (max-width: 600px) {
  .section {
    padding: 2rem 0;
  }
  .tab-title {
    font-size: 0.75rem;
  }
}
</style>
