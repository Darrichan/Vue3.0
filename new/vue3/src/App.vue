<template>
  <img alt="Vue logo"
       src="./assets/logo.png">
  <h1>原数：{{count}}</h1>
  <h1>2倍数：{{double}}</h1>
  <h1>title：{{greetings}}</h1>
  <h1>x:{{x}} y:{{y}}</h1>
  <h1 v-if="loading">loading......</h1>
  <img v-if="loaded" :src="result" alt="">
  <div>
    <button @click="increase">increase+1</button>
  </div>
  <div>
    <button @click="updataGreetings">updataGreetings</button>

  </div>
</template>

<script lang="ts">
import { ref, computed, reactive, toRefs, watch } from 'vue'
import mousePos from './hooks/mousePosition'
import useUrlLoader from './hooks/useUrlLoader'
interface Dataprops {
  count: number
  double: number
  increase: () => void
}
export default {
  name: 'App',
  setup() {
    // const count = ref(0)
    // const double = computed(() => {
    //   return count.value * 2
    // })
    const greetings = ref('')
    const updataGreetings = () => {
      greetings.value += 'Hello!'
    }
    const { result, loading, loaded } = useUrlLoader(
      'https://dog.ceo/api/breeds/image/random'
    )
    watch(greetings, (newValue, oldValue) => {
      console.log(newValue)
      console.log(oldValue)
      document.title = 'updated' + greetings.value
    })
    const [x, y] = mousePos()
    const data: Dataprops = reactive({
      count: 0,
      increase: () => {
        data.count++
      },
      double: computed(() => {
        return data.count * 2
      }),
    })
    const refData = toRefs(data)
    return {
      ...refData,
      updataGreetings,
      greetings,
      x,
      y,
      result,
      loading,
      loaded,
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
