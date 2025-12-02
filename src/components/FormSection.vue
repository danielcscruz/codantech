<template>
  <div class="section">
    <div class="container">
      <v-row class="justify-center px-2 px-sm-4 px-md-8">
        <v-col cols="12" md="8">
          <v-card elevation="2" class="pa-6 card">
            <v-card-title class="text-h5 mb-4 title">
              Entre em Contato
            </v-card-title>

            <v-form ref="contactForm" v-model="formValid" @submit.prevent="submitForm">
              <v-row>
                <input
                  type="text"
                  v-model="form._honey"
                  style="display:none"
                  tabindex="-1"
                  autocomplete="off"
                >

                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="form.nome"
                    label="Nome"
                    variant="outlined"
                    color="white"
                    base-color="white"
                    :rules="nameRules"
                    :disabled="isSubmitting"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="form.sobrenome"
                    label="Sobrenome"
                    variant="outlined"
                    color="white"
                    :rules="nameRules"
                    :disabled="isSubmitting"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="form.email"
                    label="Email"
                    variant="outlined"
                    type="email"
                    color="white"
                    :rules="emailRules"
                    :disabled="isSubmitting"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-select
                    v-model="form.assunto"
                    label="Assunto"
                    variant="outlined"
                    color="white"
                    :items="assuntos"
                    :rules="requiredRules"
                    :disabled="isSubmitting"
                    required
                  ></v-select>
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    v-model="form.mensagem"
                    label="Mensagem"
                    variant="outlined"
                    color="white"
                    rows="5"
                    :rules="messageRules"
                    counter="500"
                    :disabled="isSubmitting"
                    required
                  ></v-textarea>
                </v-col>

                <v-col cols="12">
                  <v-btn
                    color="primary"
                    size="large"
                    :disabled="!formValid || isSubmitting"
                    :loading="isSubmitting"
                    @click="submitForm"
                    block
                  >
                    <v-icon left class="mr-2">mdi-send</v-icon>
                    Enviar Mensagem
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card elevation="2" class="pa-6 fill-height card contact-info-card">
            <v-card-title class="text-h5 mb-4 title">
              Informações de Contato
            </v-card-title>

            <div class="contact-content">
              <v-list-item class="px-0 mb-4">
                <template v-slot:prepend>
                  <v-icon color="primary" size="24">mdi-email</v-icon>
                </template>
                <v-list-item-title class="text-subtitle-2">Email</v-list-item-title>
                <v-list-item-subtitle class="text-body-2">
                  {{ contact.email }}<br>
                </v-list-item-subtitle>
              </v-list-item>

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

            <div class="social-section">
              <v-divider class="my-4"></v-divider>

              <v-card-subtitle class="px-0 text-subtitle-2 mb-3 text-center">
                Siga-nos nas redes sociais
              </v-card-subtitle>

              <SocialUI />
            </div>

          </v-card>
        </v-col>
      </v-row>
    </div>

    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      timeout="5000"
      location="top right"
    >
      {{ snackbar.text }}
      <template v-slot:actions>
        <v-btn variant="text" @click="snackbar.show = false">Fechar</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import axios from 'axios'
import { myContact, type Contact } from '@/data/contact'
import SocialUI from './ui/SocialUI.vue'

// --- Definições de Tipos Seguros ---
const contact = ref<Contact>(myContact)

interface ContactForm {
  nome: string
  sobrenome: string
  email: string
  assunto: string
  mensagem: string
  _honey: string // Campo anti-spam
}

// Tipo seguro para input de validação (substitui o 'any')
type ValidationValue = string | number | null | undefined | unknown;
type ValidationRule = (value: ValidationValue) => string | boolean;

interface FormRef {
  validate: () => Promise<{ valid: boolean; errors: unknown[] }>
  reset: () => void
  resetValidation: () => void
}

// --- Estado ---
const formValid = ref<boolean>(false)
const isSubmitting = ref<boolean>(false)
const contactForm = ref<FormRef | null>(null)

// Feedback Visual
const snackbar = reactive({
  show: false,
  text: '',
  color: 'success'
})

// Dados do formulário
const form = reactive<ContactForm>({
  nome: '',
  sobrenome: '',
  email: '',
  assunto: '',
  mensagem: '',
  _honey: ''
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

// --- Regras de Validação (Lint Free) ---
// O uso de ValidationValue força verificarmos o tipo antes de usar

const nameRules: ValidationRule[] = [
  (v: ValidationValue) => !!v || 'Campo obrigatório',
  (v: ValidationValue) => (typeof v === 'string' && v.length >= 2) || 'Mínimo 2 caracteres'
]

const emailRules: ValidationRule[] = [
  (v: ValidationValue) => !!v || 'Email obrigatório',
  (v: ValidationValue) => (typeof v === 'string' && /.+@.+\..+/.test(v)) || 'Email deve ser válido'
]

const messageRules: ValidationRule[] = [
  (v: ValidationValue) => !!v || 'Mensagem obrigatória',
  (v: ValidationValue) => (typeof v === 'string' && v.length >= 10) || 'Mínimo 10 caracteres',
  (v: ValidationValue) => (typeof v === 'string' && v.length <= 500) || 'Máximo 500 caracteres'
]

const requiredRules: ValidationRule[] = [
  (v: ValidationValue) => !!v || 'Campo obrigatório'
]

// --- Funções ---

// Função para resetar formulário
const resetForm = (): void => {
  // Limpa os dados reativos
  Object.assign(form, {
    nome: '',
    sobrenome: '',
    email: '',
    assunto: '',
    mensagem: '',
    _honey: ''
  })

  // Reseta o estado visual de validação do Vuetify
  if (contactForm.value) {
    contactForm.value.resetValidation()
  }
}

// Função para enviar formulário
const submitForm = async (): Promise<void> => {
  if (!contactForm.value) return

  // Validação do Vuetify
  const validation = await contactForm.value.validate()
  if (!validation.valid) return

  // Proteção Honeypot (se preenchido, é bot)
  if (form._honey) return

  isSubmitting.value = true

  try {
    // Configura o payload para o FormSubmit
    const payload = {
      name: `${form.nome} ${form.sobrenome}`, // FormSubmit prefere um campo 'name' unificado
      email: form.email,
      _subject: `Contato Site: ${form.assunto}`,
      message: form.mensagem,
      _template: 'table',
      _captcha: 'false',
      _cc: form.email // Opcional: envia cópia para o usuário
    }

    // Envio via AJAX
    await axios.post('https://formsubmit.co/ajax/contato@codan.tech', payload, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })

    // Sucesso
    snackbar.text = 'Mensagem enviada com sucesso! Entraremos em contato em breve.'
    snackbar.color = 'success'
    snackbar.show = true
    resetForm()

  } catch (error) {
    console.error('Erro no envio:', error)
    snackbar.text = 'Erro ao enviar mensagem. Tente novamente mais tarde.'
    snackbar.color = 'error'
    snackbar.show = true
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.title {
  color: rgba(255, 255, 255, 0.837);
  font-family: "GOBOLD", sans-serif;
}

.fill-height {
  height: 100%;
}

.section {
  padding-bottom: 6rem;
  min-height: 50vh;
  background: linear-gradient(180deg, #0E172B 0%, #1d2c4b 100%);
  width: 100%;
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

/* Personalização dos inputs do Vuetify para tema Dark/Custom */
:deep(.v-field__outline) {
  color: white !important;
}

:deep(.v-field--focused .v-field__outline) {
  color: white !important;
}

/* Label no estado normal */
:deep(.v-label) {
  color: white !important;
  opacity: 0.7;
}

/* Label quando focado */
:deep(.v-field--focused .v-label),
:deep(.v-field--active .v-label) {
  color: white !important;
  opacity: 1;
}

/* Texto digitado */
:deep(.v-field__input) {
  color: white !important;
}

/* Placeholder */
:deep(.v-field__input::placeholder) {
  color: rgba(255, 255, 255, 0.5) !important;
}

/* Contador */
:deep(.v-counter) {
  color: rgba(255, 255, 255, 0.7) !important;
}

/* Ícones */
:deep(.v-field__prepend-inner .v-icon),
:deep(.v-field__append-inner .v-icon) {
  color: white !important;
}

/* Mensagens de erro */
:deep(.v-messages__message) {
  color: rgba(255, 255, 255, 0.8) !important;
}
</style>
