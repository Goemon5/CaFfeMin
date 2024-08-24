<template>
  <div>
    <GChart
      type="LineChart"
      :data="chartData"
      :options="chartOptions"
      :settings="chartSettings"
      style="width: 100%; height: 400px;"
    />
  </div>
</template>

<script>
import { GChart } from "vue-google-charts";
import { baseUrl } from "@/assets/config.js";

export default {
  components: {
    GChart,
  },
  data() {
    return {
    user: {
        userId: window.localStorage.getItem("userId"),
        password: null,
        nickname: null,
        age: null,
      },
      diary: [],
      
      chartData: null,
      chartOptions: {
        title: 'caffein',
         // 曲線を滑らかにする
        legend: { position: 'bottom' },
      },
      chartSettings: {
        packages: ['corechart'],
      },
    };
  },
  created:

    // apiからarticleを取得する
    async function () {
      try {
        /* global fetch */
        const res = await fetch(
          baseUrl + `/graph?userId=${this.user.userId}`,
          {
            method: "GET",
          },
        );

        const text = await res.text();
        const jsonData = text ? JSON.parse(text) : {};
        // fetchではネットワークエラー以外のエラーはthrowされないため、明示的にthrowする
        if (!res.ok) {
          const errorMessage =
            jsonData.message ?? "エラーメッセージがありません";
          throw new Error(errorMessage);
        }
        // const fetchedData = jsonData.map(item => [item[0], item[1]]);

        // chartDataを動的に更新
        const result=jsonData.result;
        result.unshift(['hour', 'caffein']);
        this.chartData = result;
        // [['hour', 'caffein'], ...jsonData];
        console.log(jsonData)
        // this.chartData=jsonData.result??[]

        // 成功時の処理
        //this.users = jsonData.users ?? [];
        console.log(jsonData);
      } catch (e) {
        console.error(e);
        // エラー時の処理
      }
    }, // 記事一覧を取得する

};
</script>
