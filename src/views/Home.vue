<template>
  <div>
    <div class="ui main container">
      <!-- 基本的なコンテンツはここに記載する -->
      <InputSleep />
      <SleepView />
      <div class="ui segment">

        <form class="ui form" @submit.prevent="postArticle">
          <h3 class="ui dividing header">カフェイン コレクション</h3>
          

          <div>
            <label for="dropdown">カフェイン飲料の種類:</label>
              <select v-model="diary.drinkType" id="dropdown" style="width: 50%;">
                <option v-for="option in options" :key="option.value" :value="option.value">
                  {{ option.text }}
                </option>
              </select>
            
          </div>
          
          <label>カフェイン飲料の摂取量:</label>
          <div class="field">
            <input
              v-model="diary.drinkAmount"
              type="number"
              name="intake"
              placeholder="摂取量(ml)"
              style="width: 50%;"
            />
          </div>
          
          <div class="right-align">
            <button class="ui green button" v-bind:disabled="isPostButtonDisabled" type="submit">
              記入
            </button>
          </div>
        </form>
        
      </div>
      
      <h3 class="ui dividing header">カフェイン コレクション一覧</h3>
      <div class="ui segment">
        <ul class="ui comments divided article-list">
          <template v-for="(diaries, index) in articles" :key="index">
            <li class="comment">
              <div class="content">
                <span class="author">{{ diaries.userId }}</span>
                <div class="metadata">
                  <span class="date">{{
                    convertToLocaleString(article.timestamp)
                  }}</span>
                </div>
                <button
                  v-if="isMyArticle(article.userId)"
                  class="ui negative mini button right floated"
                  @click="deleteArticle(article)"
                >
                  削除
                </button>
                <p class="text">
                  {{ article.text }}
                </p>
                <span v-if="article.category" class="ui green label">{{
                  article.category
                }}</span>
                <div class="ui divider"></div>
              </div>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// 必要なものはここでインポートする
// @は/srcと同じ意味です
import InputSleep from '@/components/InputSleep.vue';
import SleepView from '@/components/SleepView.vue';
import { baseUrl } from '@/assets/config.js';

// const headers = {'Authorization' : 'mtiToken'};

export default {
  name: 'Home',

  components: {
  InputSleep,
  SleepView
   // 読み込んだコンポーネント名をここに記述する
  },

  data() {
    // Vue.jsで使う変数はここに記述する
    return {
      post: {
        text: null,
        category: null,
      },
      search: {
        userId: null,
        category: null,
        start: null,
        end: null,
      },
      
      //追加
      user: {
        userId: window.localStorage.getItem("userId"),
        password: null,
        nickname: null,
        age: null,
      },
      diary: {
        drink: null,
        drinkType: null,
        drinkAmount: null,
        createdAt: null,
        caffeineAmount: null,
        userId: null,
      },
      diaries: {
        drinkType: null,
        drinkAmount: null,
        caffeineAmount: null,
        createdAt: null,
      },
      
      articles: [],
      iam: null,
      
      
      selectedOption: '',
      options: [
        { value: 'コーヒー', text: 'コーヒー' },
        { value: 'エナジードリンク', text: 'エナジードリンク' },
        { value: '紅茶', text: '紅茶' }
      ]
      
    };
  },
  computed: {
  // 計算した結果を変数として利用したいときはここに記述する
  },

  created: async function() {
    // Vue.jsの読み込みが完了したときに実行する処理はここに記述する
    if (!window.localStorage.getItem("token")){
      //this.$router.push({name:"Login"})
    }
    // apiからarticleを取得する
  },

  methods: {
    // Vue.jsで使う関数はここで記述する
    // isMyArticle(id) {}, // 自分の記事かどうかを判定する
    async getArticles() {
    
    }, // 記事一覧を取得する
    async postArticle() {
      
      if (this.isCallingApi) {
        return;
      }
      this.isCallingApi = true;

      const reqBody = {
        userId: this.user.userId,
        drinkType: this.diary.drinkType,
        drinkAmount: this.diary.drinkAmount,
      };
      console.log(reqBody);
      try {
        /* global fetch */
        const res = await fetch(baseUrl + "/diary", {
          method: "POST",
          body: JSON.stringify(reqBody),
          
        });

        const text = await res.text();
        const jsonData = text ? JSON.parse(text) : {};

        // fetchではネットワークエラー以外のエラーはthrowされないため、明示的にthrowする
        if (!res.ok) {
          const errorMessage =
            jsonData.message ?? "エラーメッセージがありません";
          throw new Error(errorMessage);
        }
        console.log(reqBody);

        this.articles.unshift({ ...reqBody, timestamp: Date.now() });
        this.successMsg = "記事が投稿されました！";
        this.post.text = "";
        this.post.category = "";
      } catch (e) {
        console.error(e);
        this.errorMsg = e;
      } 
    }, // 記事を作成する
    // async getSearchedArticles() {}, // 記事を検索する
    // async deleteArticle(article) {}, // 記事を削除する
    // convertToLocaleString(timestamp) {} // timestampをLocaleDateStringに変換する
    
    // ドロップダウンの表示/非表示を切り替え
    toggleDropdown() {
      // ドロップダウンの表示/非表示を切り替え
      this.isDropdownVisible = !this.isDropdownVisible;
    },
    selectOption(option) {
      // 選択されたオプションを設定し、ドロップダウンを閉じる
      this.selectedOption = option;
      this.isDropdownVisible = false;
    }
  }
}
</script>

<style scoped>

</style>
