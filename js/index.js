import app from 'vue'
import method from '@/js/method'
import api from '@/js/api'
import conf from './conf'

app.use(method.util);
app.prototype.$api=api;
app.prototype.$conf=conf;

