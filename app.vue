<template>
  <div class="bg-gray-700 w-full h-full font-sans overflow-hidden relative">
    <div class="flex items-center justify-center h-full">
      <div class="max-w-[800px] z-20 rounded-2xl overflow-hidden"> 
        <div class="bg-gray-800 p-4 rounded-2xl shadow-lg">
          <Start v-if="!isChatting" />

          <Chat v-else />
        </div>
      </div>
    </div>
    <div class="bg-repeat bg-cover absolute w-full h-full opacity-20">
    </div>
  </div>
</template>

<script setup lang="ts">
const isChatting = useIsChatting();
</script>

<style>
html,
body,
#__nuxt {
  width: 100%;
  height: 100%;
}
</style>
