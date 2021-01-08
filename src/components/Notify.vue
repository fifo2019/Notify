<template>
  <table>
    <transition-group name="list" tag="tbody">
      <tr v-for="message in messages" :key="message.title">
        <td><span>{{ message.title }}</span></td>
      </tr>
    </transition-group>
    
    <tr>
      <td>
        <button
          @click="loadMore"
          class="btn btnPrimary"
          :disabled="maxLength === 0"
          :class="{btnDisabled: maxLength === 0}"
        >
          Load more
        </button>
      </td>
    </tr>
  </table>
</template>

<script>
  export default {
    name: "Notify",
    props: {
      messages: {
        type: Array,
        required: true
      }
    },
    computed: {
      maxLength() {
        return this.$store.getters.getMessageFilter.length
      }
    },
    methods: {
      loadMore() {
        this.$store.dispatch('loadMessages')
          .catch(err => console.log(err))
      }
    }
  }
</script>

<style lang="scss" scoped>
  table {
    text-align: center;
  }
  
  td {
    display: flex;
    justify-content: space-between;
    padding: 12px 6px;
    font-size: 14px;
  }
  
  /* Animation */
  .list-item {
    display: inline-block;
    margin-right: 10px;
  }
  
  .list-enter-active,
  .list-leave-active {
    transition: all 1s;
  }
  
  .list-enter,
  .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
  
  button {
    margin: 20px 0 0 0;
    &.btnDisabled {
      cursor: default;
      opacity: 0.6;
    }
  }
</style>