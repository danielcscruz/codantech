export interface Steps {
  id: number
  step: string
  detail: string
}

export const stepList : Steps[] = [
  {
  id: 1,
  step: 'Solicitação',
  detail: 'Entre em contato conosco para solicitar o acesso. É rápido!'
  },
  {
  id: 2,
  step: 'Obtenha o Link',
  detail: 'Iremos fornecer o link de acesso ao sua plataforma. Você realizará o cadastro com o seu e-mail e já poderá utilizar o sistema.'
  },
  {
  id: 3,
  step: '7 dias de teste',
  detail: 'Você poderá utilizar todos os recursos disponíveis por 7 dias totalmente de graça.'
  },
  {
  id: 4,
  step: 'Pagamento',
  detail: 'Após o periodo de teste, você será notificado e encaminhado para a plataforma de pagamento para confirmar a sua assinatura.'
  }

]

