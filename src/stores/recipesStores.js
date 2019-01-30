import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { getState } from '@/plugins/localstorage.js'
import cache from '@/stores/module/recipes'
import { findGetParameter } from '@/helpers/url'

Vue.use(Vuex)

const recipesStore = new Vuex.Store({
  state: {
    sheetId: '1uf6BPq59HwNnRqxBqbw1KL_a4_g4OAMNngqr4vYuyNM',
    recipes: [],
    cacheVersion: 1
  },
  getters: {
    recipes (state) {
      return state.recipes
    },
    searchRecipes (state) {
      return keywords => {
        return state.recipes.filter(recipe => {
          return (
            recipe.name.toLowerCase().includes(keywords.toLowerCase()) ||
            recipe.nutritionvalue
              .toLowerCase()
              .includes(keywords.toLowerCase()) ||
            recipe.utensil.toLowerCase().includes(keywords.toLowerCase())
          )
        })
      }
    },
    sortOrderRecipes (state) {
      return (recipes, field, type) => {
        switch (field) {
          case 'level':
            if (type === 'asc') {
              recipes.sort((a, b) => b.levelValue - a.levelValue)
            } else {
              recipes.sort((a, b) => a.levelValue - b.levelValue)
            }
            break

          default:
            if (type === 'asc') {
              recipes.sort((a, b) => a[field].localeCompare(b[field]))
            } else {
              recipes.sort((a, b) => b[field].localeCompare(a[field]))
            }
            break
        }

        return recipes
      }
    }
  },
  mutations: {
    setRecipes (state, payload) {
      state.recipes = payload
    },
    loadStateFromCache (state, payload) {
      console.log('load data from cache')
      console.log('cache version: ' + payload.cacheVersion)
      if (payload) {
        Object.keys(payload).forEach(key => {
          state[key] = payload[key]
        })
      }
    }
  },
  actions: {
    async getRecipes (context, payload) {
      const forceUpdate = (findGetParameter('updateapp') === 'true')

      // priority cached
      const cachedState = await getState().then(state => {
        return state
      })

      if (cachedState && Object.keys(cachedState).length && (forceUpdate !== true || cachedState.cacheVersion >= context.state.cacheVersion)) {
        context.commit('loadStateFromCache', cachedState)
        return
      }

      const materials = await axios
        .get(
          '//spreadsheets.google.com/feeds/list/1uf6BPq59HwNnRqxBqbw1KL_a4_g4OAMNngqr4vYuyNM/2/public/full?alt=json'
        )
        .then(response => {
          return response.data.feed.entry.map(material => {
            return {
              id: material.gsx$id.$t,
              name: material.gsx$name.$t,
              imageUrl: material.gsx$imageurl.$t,
              npc: material.gsx$npc.$t
            }
          })
        })
        .catch(function (error) {
          console.warn(error)
        })

      const utensils = await axios
        .get(
          '//spreadsheets.google.com/feeds/list/1uf6BPq59HwNnRqxBqbw1KL_a4_g4OAMNngqr4vYuyNM/3/public/full?alt=json'
        )
        .then(response => {
          return response.data.feed.entry.map(utensil => {
            return {
              id: utensil.gsx$id.$t,
              name: utensil.gsx$name.$t,
              imageUrl: utensil.gsx$imageurl.$t
            }
          })
        })
        .catch(function (error) {
          console.warn(error)
        })

      const cookingLvls = await axios
        .get(
          '//spreadsheets.google.com/feeds/list/1uf6BPq59HwNnRqxBqbw1KL_a4_g4OAMNngqr4vYuyNM/4/public/full?alt=json'
        )
        .then(response => {
          return response.data.feed.entry.map(lvl => {
            return {
              id: lvl.gsx$id.$t,
              icon: lvl.gsx$icon.$t,
              value: lvl.gsx$value.$t,
              durations: lvl.gsx$durations.$t,
              discharge: lvl.gsx$hpspdischarge.$t
            }
          })
        })
        .catch(function (error) {
          console.warn(error)
        })

      const recipes = await axios
        .get(
          '//spreadsheets.google.com/feeds/list/1uf6BPq59HwNnRqxBqbw1KL_a4_g4OAMNngqr4vYuyNM/1/public/full?alt=json'
        )
        .then(response => {
          return response.data.feed.entry
        })
        .catch(function (error) {
          console.warn(error)
        })

      const newRecipes = recipes.map(recipe => {
        const materialsIDArr = recipe.gsx$materialsid.$t
          .replace(' ', '')
          .split(',')
        const materialsNameArr = materialsIDArr.map(ID => {
          const material = materials.filter(material => ID === material.id)
          return material[0]
        })

        const utensil = utensils.filter(
          utensil => recipe.gsx$utensil.$t === utensil.id
        )

        const cookingLvl = cookingLvls.filter(
          lvl => recipe.gsx$level.$t === lvl.value
        )

        return {
          id: recipe.gsx$id.$t,
          name: recipe.gsx$name.$t,
          imageUrl: recipe.gsx$imageurl.$t,
          nutritionvalue: recipe.gsx$nutritionvalue.$t,
          utensil: utensil[0].name,
          utensilImageUrl: utensil[0].imageUrl,
          materials: materialsNameArr,
          levelValue: recipe.gsx$level.$t,
          levelIcon: cookingLvl[0].icon,
          durations: cookingLvl[0].durations,
          discharge: cookingLvl[0].discharge
        }
      })

      newRecipes.map(item => {
        return item
      })

      context.commit('setRecipes', newRecipes)
    }
  },
  plugins: [ cache ]
})

export default recipesStore
