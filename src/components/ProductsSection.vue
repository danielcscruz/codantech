<script setup lang="ts">
import { ref } from 'vue'
import { productData, type Product } from '@/data/products'

const products = ref<Product[]>(productData)

const categoryColors: Record<string, string> = {
  'webapp': 'blue',
  'front-end': 'pink',
  'back-end': 'grey',
  'automation': 'orange',
  'ia': 'yellow',
}

function getImage(imagePath: string) {
  if (!imagePath) return '' // evita undefined
  return new URL(`../assets/img/products/${imagePath}`, import.meta.url).href
}
</script>

<template>
  <div class="section">
    <div class="container">
      <v-row class="justify-center px-2 px-sm-4 px-md-8">
        <v-col v-for="product in products" :key="product.id" cols="12" class="d-flex">
          <v-card v-if="product.title != ''" class="feature-card d-flex flex-column" hover height="100%" width="100%">
            <v-img v-if="product.image != ''" :src="getImage(product.image)" width="100%" height="400px" cover />
            <div v-else width="100%" style="height: 300px"
              class="d-flex flex-column justify-center align-center text-center bg">
              <v-icon icon="mdi-image" />
              <h3>Sem Imagem</h3>
            </div>
            <!-- Ícone do Card -->
            <v-card-title class="project-title d-flex align-center justify-space-between">
              <!-- ESQUERDA -->
              <div class="d-flex align-center ga-2">
                <h2 class="ma-0">
                  {{ product.title }}
                </h2>
                <v-chip size="x-small" :color="categoryColors[product.category] || 'primary'" label class="tag-chip">
                  {{ product.category }}
                </v-chip>
              </div>

              <!-- DIREITA -->
            </v-card-title>
            <!-- Conteúdo do Card -->
            <div class="d-flex flex-wrap ga-1 justify-left ml-4">
              <v-chip v-for="tag in product.tags" :key="tag" size="x-small" color="primary" variant="outlined"
                class="tag-chip mb-2">
                {{ tag }}
              </v-chip>
            </div>
            <v-card-text class="text-left flex-grow-1 project-desc">
              {{ product.detail }}
            </v-card-text>
            <div class="d-flex buttons pt-5 justify-center">
              <v-btn size="small" to="/products/crm" color="primary" append-icon="mdi-arrow-right-thin" variant="tonal"
                class="px-3 mt-4 mb-6">
                Saiba Mais
              </v-btn>
            </div>

          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<style scoped>
.section {
  padding-bottom: 6rem;
  min-height: 50vh;
  background: linear-gradient(180deg, #0E172B 0%, #1d2c4b 100%);
  width: 100%;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

.bg {
  color: rgba(255, 255, 255, 0.398);
  background: rgba(255, 255, 255, 0.152);
}

.project-title {
  font-family: "GOBOLD LIGHT";
  color: white;
  font-size: 1rem;
}

.project-desc {
  color: rgba(255, 255, 255, 0.769);
  font-size: 1rem;
}

.tag-chip {
  border-radius: 4px !important;
}


.section-title {
  font-family: "GOBOLD LOWPLUS";
  text-align: left;
  font-size: 1.5rem;
  font-weight: 700;
  color: #8899aa;
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
  border: 0.7px solid white !important;
  background-color: #0E172B;
  border-radius: 12px !important;
  overflow: hidden;
  cursor: default;
}

.feature-card:hover {
  /* transform: translateY(-8px); */
  box-shadow: 0 5px 10px rgba(251, 252, 251, 0.636) !important;
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
