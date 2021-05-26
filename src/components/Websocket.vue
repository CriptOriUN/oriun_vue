<template>
  <div>
  </div>
</template>

<script>
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import CreateEvent from "../components/CreateEvent";

export default {
  name: "websocketdemo",
  components: {
    CreateEvent
  },
  data() {
    return {
      received_messages: [],
      send_message: null,
      connected: false
    };
  },
  methods: {
    send() {
      console.log("Send message:" + this.send_message);
      if (this.stompClient && this.stompClient.connected) {
        const msg = { id_EVENT: this.send_message };
        console.log(JSON.stringify(msg));
        this.stompClient.send("/app/eventCreated", JSON.stringify(msg), {});
      }
    },
    connect() {
      this.socket = new SockJS("https://wise-brook-308119.ue.r.appspot.com/websocket");
      this.stompClient = Stomp.over(this.socket);
      this.stompClient.connect(
        {},
        frame => {
          this.connected = true;
          console.log(frame);
          this.stompClient.subscribe("/topic/notifications", tick => {
            console.log(tick);
            var sportNotifications = tick.body;
            this.$root.$emit('sportNotifications', sportNotifications);
            this.received_messages.push(tick.body);
          });
        },
        error => {
          console.log(error);
          this.connected = false;
        }
      );
    },
    disconnect() {
      if (this.stompClient) {
        this.stompClient.disconnect();
      }
      this.connected = false;
    },
    tickleConnection() {
      this.connected ? this.disconnect() : this.connect();
    }
  },
  mounted() {
    this.connect();
    this.$root.$on('eventCreated', (sport_test) => {
      this.send_message = sport_test;
      this.send();
    });

  }
};
</script>

<style scoped>
</style>