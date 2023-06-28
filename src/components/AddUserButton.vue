<template>
    <el-button @click="handleAdd" icon="el-icon-plus" circle></el-button>
</template>

<script>
export default {
  name: "AddUserButton",
  methods:{
    handleAdd(){
      this.$router.push('/register');
    },
  }
}
</script>

<style scoped>

</style>
