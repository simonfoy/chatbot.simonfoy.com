<template>
  <section class="bg-gray-800 rounded-2xl p-6 flex flex-col items-center gap-4">
    <img src="/discordblue.png" class="w-64 h-64 rounded-full discord-profile-img" /> 
    <div class="text-center">
      <h1 class="text-white font-bold text-2xl">Simon's ChatBot</h1>
      <h2 class="text-gray-400 text-lg">#ask-anything</h2> 
    </div>
    <form @submit.prevent="handleSubmit" class="w-full max-w-sm">
      <fieldset :disabled="isLoading" class="flex flex-col gap-2">
        <input
          v-model.trim="customerName"
          type="text"
          placeholder="Your name"
          class="bg-gray-700 text-white rounded-lg p-2 focus:outline-none placeholder:text-gray-400"
        />
        <small class="text-gray-400 italic">
          Please provide a name for Simon's ChatBot.
        </small>
        <button
          :disabled="hasNameError || isLoading"
          type="submit"
          class="bg-brand-blue hover:bg-brand-blue-dark text-white rounded-lg py-2 px-4 font-medium transition duration-300"
        >
          <span v-if="isLoading">Loading...</span> <span v-else>Start a New Chat</span>
        </button>
        <button
          v-if="thread && run && !isLoading" 
          @click="isChatting = true"
          type="button"
          class="bg-gray-600 hover:bg-gray-500 text-white rounded-lg py-2 px-4 font-medium transition duration-300"
        >
          Continue Previous Chat
        </button>
        <p v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</p> </fieldset>
    </form>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isChatting = useIsChatting();
const { customerName, hasNameError } = useCustomer();
const thread = useCookie("thread-id");
const run = useCookie("run-id");
const isLoading = ref(false); // Added isLoading state
const errorMessage = ref(''); // Added errorMessage state

async function handleSubmit() {
  isLoading.value = true;
  errorMessage.value = '';

  try {
    const response = await $fetch("/api/threa", {
      query: {
        customer: customerName.value, 
      },
    });

    thread.value = response.thread;
    run.value = response.run;
    isChatting.value = true;
  } catch (error) {
    errorMessage.value = "An error occurred while starting the chat. Blame Dawson.";
    console.error("Error starting chat:", error); // Log the error for debugging
  } finally {
    isLoading.value = false;
  }
}

</script>