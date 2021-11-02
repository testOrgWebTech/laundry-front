<template>

</template>

<script>
import orderStore from "@/store/v1/order.store";

export default {
  name: 'Home',
  async created() {
    await orderStore.dispatch("get");
  }
}
</script>
