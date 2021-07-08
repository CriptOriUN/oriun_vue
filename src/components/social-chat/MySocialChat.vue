<template>
  <div class="layout">
    <!-- ommited -->
    <SocialChat :attendants="attendants" class="oriun-chat">
      <p slot="header">Haz click en uno de nuestros representantes para chatear con el.</p>
      <template v-slot:button="{ open }">
        <span v-show="!open">Necesitas Ayuda?</span>
        <span v-show="open">Cerrar</span>
      </template>
      <small slot="footer">Servicio Disponible las 24 Horas</small>
    </SocialChat>
  </div>
</template>

<script>
import { SocialChat } from 'vue-social-chat'

export default {
  name: 'WhatsAppPage',

  components: {
    SocialChat
  },

  data: () => ({
    attendants: [
      {
        app: 'whatsapp',
        label: 'Desarrollador - Whatsapp',
        name: 'YerGOD Valderrama',
        number: '+57 312 5075223',
        avatar: {
          src: 'https://groriun.github.io/images/1.jpg',
          alt: 'Avatar: No es una mujer mapache xd'
        }
      },
      {
        app: 'messenger',
        label: 'Desarrollador - Messenger',
        name: 'YerGOD Valderrama',
        id: '113101434359781',
        avatar: {
          src: 'https://groriun.github.io/images/1.jpg',
          alt: 'Avatar: No es una mujer mapache xd'
        }
      },
      {
        app: 'twitter',
        label: 'Desarrollador - Twitter',
        name: 'YerGOD Valderrama',
        id: '1410627555909062657',
        avatar: {
          src: 'https://groriun.github.io/images/1.jpg',
          alt: 'Avatar: No es una mujer mapache xd'
        }
      }
    ]
  })
}
</script>

<style>
.oriun-chat{ 
  --vsc-bg-header: #565A5C;
  --vsc-bg-button: #565A5C;
  --vsc-outline-color: #565A5C;
}
</style>