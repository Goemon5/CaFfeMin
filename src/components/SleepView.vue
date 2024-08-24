<template>
  <div v-for="(sleep, index) in sleeps" :key="index">
  <div class="ui segment">
    
      
        <label for="article-category">睡眠時間: {{ sleep.sleepTime }}</label>
        <p>就寝時間: {{ formatTimestamp(sleep.sleepAt * 1000) }}</p>
        <p>睡眠の質: {{ formatQuality(sleep.quarity) }}</p>
        <p>日時: {{ formatTimestamp(sleep.createdAt * 1000) }}</p>
      </div>
      
      

  </div>
</template>

<script>
// 必要なものはここでインポートする
// @は/srcの同じ意味です
// import something from '@/components/something.vue';
import { baseUrl } from "@/assets/config.js";
export default {
  name: "SleepView",
  data() {
    // Vue.jsで使う変数はここに記述する
    return {
      user: {
        userId: window.localStorage.getItem("userId"),
        password: null,
        nickname: null,
        age: null,
      },

      sleep: {
        sleepTime: null,
        sleepAt: null,
        quarity: null,
        createdAt: null,
      },
      sleeps: [], 

      errors: {
        sleepTime: null,
        sleepAt: null,
        quality: null,
      },
    };
  },
  computed: {
    
  },

  methods: {
    
    async fetchSleepData() {
      try {
        const res = await fetch(baseUrl + `/sleep?userId=${this.user.userId}`, {
          method: "GET",
        });

        const text = await res.text();
        const jsonData = text ? JSON.parse(text) : [];

        if (!res.ok) {
          const errorMessage = jsonData.message ?? "エラーメッセージがありません";
          throw new Error(errorMessage);
        }

        // 新しいデータを配列に追加
        if (Array.isArray(jsonData)) {
          this.sleeps = jsonData; // 複数のデータを一度に取得する場合
        } else {
          this.sleeps.push(jsonData); // 単一のデータを取得する場合
        }

      } catch (e) {
        console.error(e);
      }
    },
    formatTimestamp(timestamp) {
      const date = new Date(timestamp);
      const hours = date.getHours();
      const minutes = date.getMinutes();
      return `${hours}時${minutes}分`;
    },formatQuality(quarity) {
      switch (quarity) {
        case 1:
          return "悪かった";
        case 2:
          return "普通";
        case 3:
          return "快眠";
        default:
          return "不明";
      }
    }
    
  },
  created: async function () {
    if (!window.localStorage.getItem("token")) {
      this.$router.push({ name: "Login" });
    }

    this.fetchSleepData(); // コンポーネント作成時にデータを取得
  },
   
};
</script>

<style scoped>
/* このコンポーネントだけに適用するCSSはここに記述する */
</style>
