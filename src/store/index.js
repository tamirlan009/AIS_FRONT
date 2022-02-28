import { createStore } from 'vuex'
import {authenticate} from '@/store/modules/authenticate'
import {getUser} from "@/store/modules/getUser";
import {runDetection} from "@/store/modules/runDetection";
import {detectedResult} from "@/store/modules/detectedResult";

import {navBar} from "@/store/modules/navBar";
import {tasksView} from "@/store/modules/tasksView";
import {taskCard} from "@/store/modules/taskCard";

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    authenticate: authenticate,
    getUser:getUser,

    navBar: navBar,
    tasksView: tasksView,
    taskCard: taskCard,
    runDetection: runDetection,
    detectedResult: detectedResult,
  }
})
