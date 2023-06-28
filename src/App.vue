<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
      </transition>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
* {
  font-family: "MyFont";
  font-weight: 500;
  font-size: 16px;
}
body{
  background-color: #f0f2f5;
  margin: 0; 
	padding: 0;
	border: 0;
  margin-top: 75px;
  background-image: url('./assets/5.png');
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s ease;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
