import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import auth from './auth/index'
import permisos from './permisos/index'
import productos from './productos/index'
import configuracion from './configuracion/index'
import catalogos from './catalogos/index'
import pos from './pos/index'
import asistencias from './asistencias/index'


export default store(function( /* { ssrContext } */ ) {
    const Store = createStore({
        modules: {
            auth,
            permisos,
            productos,
            configuracion,
            catalogos,
            pos,
            asistencias
        },

        strict: process.env.DEBUGGING
    })

    return Store
})
