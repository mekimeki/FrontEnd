<template lang="html">
  <v-form ref="form" lazy-validation>
    <v-text-field
      label="Email"
      required
    ></v-text-field>
    <v-btn block>
      비밀번호 찾기
    </v-btn>
  </v-form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
}
</script>
<style lang="css" scoped>
</style>
