import app from 'vue'
import comm from '@/js/comm'
import api from '@/js/method'

app.use(comm.util);
app.prototype.$api=api;
