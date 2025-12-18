<script setup lang="ts">
import { ref, computed } from 'vue'

interface ServiceOption {
  id: string;
  name: string;
  description: string;
  price: number;
  oldprice?: number;
  active: boolean;
  requiredId?: string;
  alwaysOn?: boolean;
  billing: 'person' | 'month' | string;
}

const services = ref<ServiceOption[]>([
  {
    id: 'crm',
    name: 'Ferramentas CRM',
    description: 'Funil de vendas, contatos, tarefas e produtos',
    price: 20.00,
    active: true,
    alwaysOn: true,
    billing: 'person'
  },
  {
    id: 'whatsapp',
    name: 'Whatsapp',
    description: 'Integração com WhatsApp',
    price: 0,
    oldprice: 20.00,
    alwaysOn: true,
    active: true,
    billing: 'person'
  },
  {
    id: 'ai_agent',
    name: 'Agente de Atendimento',
    description: 'Atendimento automatizado com IA no WhatsApp',
    price: 60.00,
    active: false,
    requiredId: 'whatsapp',
    billing: 'month'
  },
  {
    id: 'conversions',
    name: 'Conversões',
    description: 'Rastreie seus leads e automatize seu funil de vendas',
    price: 20.00,
    active: false,
    requiredId: 'whatsapp',
    billing: 'month'
  },
])

const sendWhatsApp = () => {
  const phoneNumber = "5561936180082" // Substitua pelo seu número (DDI + DDD + Número)

  // Monta a lista de itens para a mensagem
  const itemsList = selectedServices.value
    .map(item => `- ${item.name}: ${formatCurrency(item.price)}${getBillingSuffix(item.billing)}`)
    .join('%0A') // %0A é a quebra de linha no link do WhatsApp

  const text = `Olá! Gostaria de contratar os seguintes serviços do CRM:%0A%0A${itemsList}%0A%0A*Total: ${formatCurrency(totalPrice.value)}*`

  const url = `https://wa.me/${phoneNumber}?text=${text}`

  // Abre o link em uma nova aba
  window.open(url, '_blank')
}

const toggleService = (service: ServiceOption) => {
  if (service.id === 'whatsapp' && !service.active) {
    services.value.forEach(s => {
      if (s.requiredId === 'whatsapp') s.active = false
    })
  }
}

const selectedServices = computed(() => services.value.filter(s => s.active))
const totalPrice = computed(() => selectedServices.value.reduce((acc, s) => acc + s.price, 0))

const formatCurrency = (value: number) => {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const getBillingSuffix = (type: string) => {
  return type === 'person' ? '/pessoa' : '/mês'
}

interface Props {
  gradient?: [string, string];
}
const props = withDefaults(defineProps<Props>(), {
  gradient: () => ['#0E172B', '#1d2c4b']
})
</script>

<template>
  <div class="section" :style="{ '--bg-color-top': props.gradient[0], '--bg-color-bottom': props.gradient[1] }">
    <div class="container">
      <div class="title mt-4 mb-6">Quanto custa usar a plataforma?</div>

      <div class="pricing-container">
        <v-row>
          <v-col cols="12" md="7">
            <v-card v-for="service in services" :key="service.id" class="mb-3 selection-card" theme="dark">
              <v-card-text class="d-flex align-center justify-space-between">
                <div class="flex-grow-1">
                  <div class="text-h6 font-weight-bold">{{ service.name }}</div>
                  <div class="text-caption text-grey-lighten-1 mb-1">{{ service.description }}</div>
                </div>

                <v-switch
                  v-model="service.active"
                  color="success"
                  hide-details
                  :disabled="service.alwaysOn || (service.requiredId && !services.find(s => s.id === service.requiredId)?.active)"
                  @change="toggleService(service)"
                ></v-switch>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="5">
            <div class="invoice-box">
              <div class="invoice-header text-center mb-4">
                <h3 class="font-weight-bold">RESUMO DO ORÇAMENTO</h3>
                <div class="divider"></div>
              </div>

              <div class="invoice-items">
                <div v-for="item in selectedServices" :key="item.id" class="invoice-line d-flex justify-space-between mb-2">
                  <div class="d-flex flex-column">
                    <span class="font-weight-bold">{{ item.name }}</span>
                  </div>
                  <div>
                    <span v-if="item.oldprice" class="old-price mr-2">{{ formatCurrency(item.oldprice) }}</span>
                    <span>{{ formatCurrency(item.price) }}</span>
                    <small class="text-grey-darken-1">{{ getBillingSuffix(item.billing) }}</small>
                  </div>

                </div>
              </div>

              <div class="divider my-4"></div>

              <div class="d-flex justify-space-between align-center total-line">
                <span class="text-h5">TOTAL</span>
                <div class="text-right">
                    <span class="text-h5 font-weight-black text-success">{{ formatCurrency(totalPrice) }} *</span>
                    <small class="text-grey-darken-1">/mês</small>
                </div>
              </div>

              <v-btn
                block
                color="success"
                size="large"
                variant="elevated"
                class="mt-6 font-weight-bold"
                prepend-icon="mdi-whatsapp"
                @click="sendWhatsApp"
              >
                CONTRATAR AGORA
              </v-btn>
              <div class="text-center mt-3 text-caption text-grey">* Valor para 1 pessoa</div>
              <div class="text-center mt-1 text-caption text-grey font-italic">Período gratuito de teste de 7 dias</div>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilos anteriores preservados */
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
.title {
  font-family: 'GOBOLD LIGHT', sans-serif;
  font-size: 1.6rem;
  color: whitesmoke;
  text-transform: uppercase;
  text-align: center;
}
.pricing-container {
  background: rgba(255, 255, 255, 0.03) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  border-radius: 16px !important;
  padding: 24px;
}

/* Melhorias visuais nos cards */
.selection-card {
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
}

.old-price {
  text-decoration: line-through;
  color: #757575; /* Cinza de inativo */
  font-size: 0.9rem;
}

.current-price {
  color: #4CAF50; /* Cor de destaque (success) */
  font-weight: bold;
}

/* Estilo Nota Fiscal */
.invoice-box {
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  color: whitesmoke;
  padding: 30px;
  border-radius: 8px;
  position: relative;
}

.invoice-box::after {
  content: "";
  position: absolute;
  bottom: -10px;
  left: 0;
  right: 0;
  height: 20px;
}

.divider {
  border-bottom: 2px dashed #bdc3c7;
}

.invoice-line {
  font-family: 'Courier New', Courier, monospace;
}

.total-line {
  border-top: 2px solid #2c3e50;
  padding-top: 10px;
}
</style>
