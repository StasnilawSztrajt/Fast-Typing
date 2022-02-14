<script>
import { defineComponent } from 'vue'
import { Line } from 'vue3-chart-v2'

export default defineComponent({
  name: 'EndScoreChartLine',
  props: {
    wpmChartArray: Array,
    wpmChartTimeArray: Array,
    isEndTest: Boolean
  },
  extends: Line,
  mounted () {
      this.renderChart({
        labels: this.wpmChartTimeArray,
        datasets: [
          {
            label: 'wpm',
            data: this.wpmChartArray
          }
        ]
      })
  },


  })
</script>