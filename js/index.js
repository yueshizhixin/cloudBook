import app from 'vue'
import method from '@/js/method'
import api from './api'
import conf from './conf'
import reg from './reg'
import css from './css'

app.use(method.util);
app.prototype.$api = api;
app.prototype.$conf = conf;
app.prototype.$reg = reg;
app.prototype.$css = css;




