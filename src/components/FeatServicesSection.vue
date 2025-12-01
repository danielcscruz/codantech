<script setup lang="ts">
import { ref } from 'vue'
import { featuresData, type Feature } from '../data/services'

const features = ref<Feature[]>(featuresData)
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
</script>

<template>
  <div class="section ">
    <div class="container">

      <v-row class="justify-center">
        <h2 class="section-title">Nossas Especialidades</h2>
      </v-row>
      <v-row class="justify-center px-2 px-sm-4 px-md-8">
        <v-col v-for="feature in features.filter(f => f.feat === true)" :key="feature.id" cols="12" md="4" sm="12"
          class="d-flex">
          <v-card class="feature-card d-flex flex-column" hover height="100%" width="100%" :style="{
            '--feature-color': getColorVariable(feature.color),
            '--feature-color-light': getColorVariable(feature.color) + '20',
            '--feature-color-hover': getColorVariable(feature.color) + '40'
          }">
            <!-- Ícone do Card -->
            <div class="card-icon-container">
              <v-icon :icon="feature.icon" size="28" class="card-icon"
                :style="{ color: getColorVariable(feature.color) }" />
              <v-card-title class="title">
                {{ feature.title }}
              </v-card-title>
            </div>
            <!-- Conteúdo do Card -->
            <v-card-text class="text-center flex-grow-1">
              <div class="custom-list">
                <div v-for="(description, index) in feature.listDescription" :key="index" class="list-item">
                  <v-icon :icon="'mdi-check-circle'" size="small" class="list-icon"
                    :style="{ color: getColorVariable(feature.color) }" v-if="description.trim() !== ''" />
                  <span class="list-text">{{ description }}</span>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="justify-center mt-8">
        <v-btn size="small" to="/services" color="primary" append-icon="mdi-eye" variant="outlined">
          Ver todos Serviços
        </v-btn>
      </v-row>

    </div>
  </div>
</template>

<style scoped>
.section {
  padding: 1rem 0;
  min-height: 50vh;
  background: linear-gradient(180deg, #0E172B 0%, #1d2c4b 100%);
  width: 100%;
}

.title {
  font-size: 20px;
  font-family: 'GOBOLD LIGHT';
  color: rgba(255, 255, 255, 0.874);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.section-title {
  font-family: "GOBOLD";
  text-align: left;

  font-size: 2.0rem;
  font-weight: 700;
  color: rgb(var(--v-theme-primary));
  margin-bottom: 1rem;
}

custom-list {
  text-align: left;
}

.list-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 8px;
  gap: 8px;
}

.list-icon {
  margin-top: 2px;
  flex-shrink: 0;
}

.list-text {
  flex: 1;
  line-height: 1.4;
  font-size: 16px;
  text-align: left;
  color: rgba(255, 255, 255, 0.79);
}

.feature-card {
  transition: all 0.3s ease;
  /* Borda dinâmica usando a cor da feature */
  border: 0.5px solid var(--feature-color) !important;
  background-color: #0d341233 !important;
  border-radius: 12px !important;
  overflow: hidden;
  cursor: default;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--feature-color), var(--feature-color-hover));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.feature-card:hover {
  /* Sombra dinâmica com a cor da feature */
  box-shadow: 0 8px 25px var(--feature-color-light) !important;
  border-color: var(--feature-color) !important;
  /* transform: translateY(-4px); */
}



.card-icon-container {
  font-family: 'GOBOLD LIGHT';
  font-size: 18px;
  color: rgb(var(--v-theme-primary));
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 1rem 1rem;
  gap: 6px;
}

.card-icon {
  padding: 1rem;
  border-radius: 10%;
  background: rgba(255, 255, 255, 0.1);
}

.feature-card:hover .card-icon {
  background: var(--feature-color-hover);
  transform: scale(1.05);
}

.feature-btn {
  min-width: 140px;
  border-radius: 25px;
  font-weight: 600;
  text-transform: none;
  letter-spacing: 0.5px;
}

/* Efeitos especiais para cards em destaque */
.v-card.v-card--variant-elevated {
  background: linear-gradient(135deg, var(--v-theme-primary) 0%, #667eea 100%);
}

/* Responsividade */
@media (max-width: 960px) {
  .section-title {
    font-size: 2rem;
  }

  .section-subtitle {
    font-size: 1rem;
  }

  .features-section {
    padding: 2rem 0;
  }
}

@media (max-width: 600px) {
  .section-title {
    font-size: 1.75rem;
  }

  .card-icon-container {
    padding: 1.5rem 1rem 0.5rem;
  }

  .feature-card {
    margin-bottom: 1rem;
  }
}
</style>
