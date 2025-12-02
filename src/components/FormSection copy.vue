<template>
  <div class="section ">
    <div class="container">
      <v-row class="justify-center px-2 px-sm-4 px-md-8">
        <!-- Coluna do Formulário (2/3 da largura) -->
        <v-col cols="12" md="8">
          <v-card elevation="2" class="pa-6 card">
            <v-card-title class="text-h5 mb-4 title">
              Entre em Contato
            </v-card-title>

            <v-form ref="contactForm" v-model="formValid">
              <v-row>
                <!-- Nome e Sobrenome -->
                <v-col cols="12" sm="6">
                  <v-text-field v-model="form.nome" label="Nome" variant="outlined" color="white" base-color="white"
                    :rules="nameRules" required></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-text-field v-model="form.sobrenome" label="Sobrenome" variant="outlined" color="white"
                    :rules="nameRules" required></v-text-field>
                </v-col>

                <!-- Email -->
                <v-col cols="12">
                  <v-text-field v-model="form.email" label="Email" variant="outlined" type="email" color="white"
                    :rules="emailRules" required></v-text-field>
                </v-col>

                <!-- Assunto -->
                <v-col cols="12">
                  <v-select v-model="form.assunto" label="Assunto" variant="outlined" color="white" :items="assuntos"
                    :rules="requiredRules" required></v-select>
                </v-col>

                <!-- Mensagem -->
                <v-col cols="12">
                  <v-textarea v-model="form.mensagem" label="Mensagem" variant="outlined" color="white" rows="5"
                    :rules="messageRules" counter="500" required></v-textarea>
                </v-col>

                <!-- Botão de Envio -->
                <v-col cols="12">
                  <v-btn color="primary" size="large" :disabled="BACKEND_CONFIG_MODE || !formValid" @click="submitForm"
                    block>
                    <v-icon left>mdi-send</v-icon>
                    Enviar Mensagem
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card>
        </v-col>

        <!-- Coluna de Informações de Contato (1/3 da largura) -->
        <v-col cols="12" md="4">
          <v-card elevation="2" class="pa-6 fill-height card contact-info-card">
            <v-card-title class="text-h5 mb-4 title">
              Informações de Contato
            </v-card-title>

            <div class="contact-content">
              <!-- Endereço -->
              <!-- <v-list-item class="px-0 mb-3">
                <template v-slot:prepend>
                  <v-icon color="primary" size="24">mdi-map-marker</v-icon>
                </template>
                <v-list-item-title class="text-subtitle-2">Endereço</v-list-item-title>
                <v-list-item-subtitle class="text-body-2">
                  {{ contact.street }}, {{ contact.number }}<br>
                  {{ contact.neighborhood }} - {{ contact.city }}, {{ contact.state }}<br>
                  {{ contact.cep }}
                </v-list-item-subtitle>
              </v-list-item> -->

              <!-- Telefone -->
              <!-- <v-list-item class="px-0 mb-3">
                <template v-slot:prepend>
                  <v-icon color="primary" size="24">mdi-phone</v-icon>
                </template>
                <v-list-item-title class="text-subtitle-2">Telefone</v-list-item-title>
                <v-list-item-subtitle class="text-body-2">
                  {{ contact.tel }}<br>
                </v-list-item-subtitle>
              </v-list-item>  -->

              <!-- Email -->
              <v-list-item class="px-0 mb-4">
                <template v-slot:prepend>
                  <v-icon color="primary" size="24">mdi-email</v-icon>
                </template>
                <v-list-item-title class="text-subtitle-2">Email</v-list-item-title>
                <v-list-item-subtitle class="text-body-2">
                  {{ contact.email }}<br>
                </v-list-item-subtitle>
              </v-list-item>

              <!-- Tempo de Resposta -->
              <v-list-item class="px-0 mb-4">
                <template v-slot:prepend>
                  <v-icon color="primary" size="24">mdi-clock</v-icon>
                </template>
                <v-list-item-title class="text-subtitle-2">Tempo de Resposta</v-list-item-title>
                <v-list-item-subtitle class="text-body-2">
                  Dentro de 24 horas<br>
                </v-list-item-subtitle>
              </v-list-item>
            </div>

            <!-- Seção de Redes Sociais - Sempre no final -->
            <div class="social-section">
              <v-divider class="my-4"></v-divider>

              <!-- Redes Sociais -->
              <v-card-subtitle class="px-0 text-subtitle-2 mb-3 text-center">
                Siga-nos nas redes sociais
              </v-card-subtitle>

              <SocialUI />
            </div>

          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { myContact, type Contact } from '@/data/contact'
import SocialUI from './ui/SocialUI.vue'

const contact = ref<Contact>(myContact)
const BACKEND_CONFIG_MODE = true

// Interfaces
interface ContactForm {
  nome: string
  sobrenome: string
  email: string
  assunto: string
  mensagem: string
  captcha: boolean
}

interface ValidationResult {
  valid: boolean
}

interface FormRef {
  validate: () => Promise<ValidationResult>
  reset: () => void
}

// Tipos para regras de validação
type ValidationRule = (value: string | boolean) => string | true
type ValidationRules = ValidationRule[]

// Estado do formulário
const formValid = ref<boolean>(false)
const contactForm = ref<FormRef | null>(null)

// Dados do formulário
const form = reactive<ContactForm>({
  nome: '',
  sobrenome: '',
  email: '',
  assunto: '',
  mensagem: '',
  captcha: false
})

// Opções de assunto
const assuntos: readonly string[] = [
  'Informações Gerais',
  'Suporte Técnico',
  'Vendas',
  'Parcerias',
  'Reclamações',
  'Sugestões',
  'Outros'
] as const

// Regras de validação
const nameRules: ValidationRules = [
  (v: string | boolean): string | true => !!v || 'Campo obrigatório',
  (v: string | boolean): string | true => (v && typeof v === 'string' && v.length >= 2) || 'Mínimo 2 caracteres'
]

const emailRules: ValidationRules = [
  (v: string | boolean): string | true => !!v || 'Email obrigatório',
  (v: string | boolean): string | true => (typeof v === 'string' && /.+@.+\..+/.test(v)) || 'Email deve ser válido'
]

const messageRules: ValidationRules = [
  (v: string | boolean): string | true => !!v || 'Mensagem obrigatória',
  (v: string | boolean): string | true => (v && typeof v === 'string' && v.length >= 10) || 'Mínimo 10 caracteres',
  (v: string | boolean): string | true => (v && typeof v === 'string' && v.length <= 500) || 'Máximo 500 caracteres'
]

const requiredRules: ValidationRules = [
  (v: string | boolean): string | true => !!v || 'Campo obrigatório'
]

// Função para resetar formulário
const resetForm = (): void => {
  Object.assign(form, {
    nome: '',
    sobrenome: '',
    email: '',
    assunto: '',
    mensagem: '',
    captcha: false
  })
}

// Função para enviar formulário
const submitForm = async (): Promise<void> => {
  if (!contactForm.value) {
    console.error('Referência do formulário não encontrada')
    return
  }

  try {
    const { valid }: ValidationResult = await contactForm.value.validate()

    if (valid) {
      // Aqui você implementaria o envio do formulário
      console.log('Formulário válido:', form)

      // Simular envio - substituir por chamada real à API
      alert('Mensagem enviada com sucesso!')

      // Reset do formulário
      resetForm()
      contactForm.value.reset()
    }
  } catch (error) {
    console.error('Erro ao validar formulário:', error)
  }
}
</script>

<style scoped>
.title {
  color: rgba(255, 255, 255, 0.837);
  font-family: "GOBOLD";
}

.fill-height {
  height: 100%;
}

.section {
  padding-bottom: 6rem;
  min-height: 50vh;
  background: linear-gradient(180deg, #0E172B 0%, #1d2c4b 100%);
  width: 100%;
  min-height: 50vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.card {
  transition: all 0.3s ease;
  border: 0.7px solid white !important;
  background-color: #0E172B;
  color: rgba(255, 255, 255, 0.89);
  border-radius: 12px !important;
  overflow: hidden;
  cursor: default;
}

/* Estilos para o card de informações de contato */
.contact-info-card {
  display: flex;
  flex-direction: column;
}

.contact-content {
  flex: 1;
}

.social-section {
  margin-top: auto;
}

.social-buttons {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
}

.input {
  border: 0.7px solid white !important;
}

/* Personalização dos campos para cor branca */
:deep(.v-field__outline) {
  color: white !important;
}

:deep(.v-field--focused .v-field__outline) {
  color: white !important;
}

/* Label no estado normal (não focado) */
:deep(.v-label) {
  color: white !important;
  opacity: 0.7;
}

/* Label quando focado ou com conteúdo */
:deep(.v-field--focused .v-label),
:deep(.v-field--active .v-label) {
  color: white !important;
  opacity: 1;
}

/* Texto digitado no campo */
:deep(.v-field__input) {
  color: white !important;
}

/* Placeholder text */
:deep(.v-field__input::placeholder) {
  color: rgba(255, 255, 255, 0.5) !important;
}

/* Contador de caracteres */
:deep(.v-counter) {
  color: rgba(255, 255, 255, 0.7) !important;
}

/* Ícones dos campos (se houver) */
:deep(.v-field__prepend-inner .v-icon),
:deep(.v-field__append-inner .v-icon) {
  color: white !important;
}

/* Mensagens de validação */
:deep(.v-messages__message) {
  color: rgba(255, 255, 255, 0.8) !important;
}
</style>
