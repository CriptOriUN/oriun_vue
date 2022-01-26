<template>
  <div></div>
</template>

<script>
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import CreateEvent from "../components/CreateEvent";

export default {
  name: "websocketdemo",
  components: {
    CreateEvent,
  },
  data() {
    return {
      received_messages: [],
      send_message: null,
      connected: false,
      userCreator: '',
      connectedUsers: [],
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
      console.log('Connecting...')
      this.connectedUsers.push(this.$route.params.username)
      this.socket = new SockJS(
        this.$apiURL+"/websocket"
      );
      this.stompClient = Stomp.over(this.socket);
      var headers = {
        user: this.$route.params.username,
      };
      this.stompClient.connect(
        headers,
        (frame) => {
          this.connected = true;
          console.log(frame);
          console.log("MY TEST", headers.user);
          this.stompClient.subscribe("/topic/notifications", (tick) => {
            console.log(tick);
            var sportNotifications = tick.body;
            this.$root.$emit("sportNotifications", sportNotifications, this.userCreator);

            this.received_messages.push(tick.body);
          });
        },
        (error) => {
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
    },
  },
  mounted() {
    this.connect();
    this.$root.$on("eventCreated", (IDeventCreated, userCreator, eventSport) => {
      this.send_message = IDeventCreated;
      this.userCreator = userCreator;
      console.log('userCreator on eventCreated: ', userCreator)
      console.log('eventSport on eventCreated: ', eventSport)
      this.$nextTick(() => {
        this.send();
      });
    });
  },
  watch:{
    connectedUsers(){
      console.log('ConnectedUsers: ', this.connectedUsers)
    }
  }
};
</script>

<style scoped>
</style>