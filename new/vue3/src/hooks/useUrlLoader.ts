import { ref } from 'vue'
import axios from 'axios'
function useUrlLoader(url: string) {
  const result = ref(null)
  const loading = ref(true)
  const loaded = ref(false)
  const error = ref(null)
  axios.get(url).then((rawData) => {
    loading.value = false;
    loaded.value = true
    result.value = rawData.data.message
  }).catch(e => {
    error.value = e
    loading.value = false
  })
  return {
    result, loaded, loading, error
  }
}
export default useUrlLoader

