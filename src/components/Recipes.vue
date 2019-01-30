<template>
  <div>
    <RecipeFilter :sorts="sorts" default-order="level_desc" @on-input-search="onQuickSearch" @on-input-searching="onSearching" @on-change-order="onOrderBy"/>
    <RecipeList :recipes="cookingRecipes" :searchKeywords="searchKeywords" :isSearching="isSearching"/>

    <v-btn
      fixed
      dark
      fab
      bottom
      right
      color="blue"
      @click="$vuetify.goTo('#app');"
    >
      <v-icon>expand_less</v-icon>
    </v-btn>

  </div>
</template>

<script>
import RecipeFilter from './RecipeFilter'
import RecipeList from './RecipeList'

export default {
  name: 'Recipes',
  components: {
    RecipeFilter,
    RecipeList
  },
  data () {
    return {
      sorts: [
        {
          text: 'Cooking Lv. Low - High',
          value: 'level_desc'
        },
        {
          text: 'Cooking Lv. High - Low',
          value: 'level_asc'
        },
        {
          text: 'Recipe A - Z',
          value: 'name_asc'
        },
        {
          text: 'Recipe Z - A',
          value: 'name_desc'
        },
        {
          text: 'Station A - Z',
          value: 'utensil_asc'
        },
        {
          text: 'Station Z - A',
          value: 'utensil_desc'
        }
      ],
      orderBy: '',
      searchKeywords: '',
      isSearching: false,
      recipes: []
    }
  },
  mounted () {
    this.$store.dispatch('getRecipes')
  },
  watch: {
    cookingRecipes () {
      this.isSearching = false
    }
  },
  computed: {
    cookingRecipes: {
      get () {
        let recipes = this.$store.getters.recipes

        if (this.searchKeywords) {
          recipes = this.$store.getters.searchRecipes(this.searchKeywords)
        }

        if (this.orderBy) {
          const sortOrderArr = this.orderBy.split('_')
          const orderField = sortOrderArr[0]
          const orderType = sortOrderArr[1]

          const recipesOrderResults = this.$store.getters.sortOrderRecipes(
            recipes,
            orderField,
            orderType
          )

          return recipesOrderResults
        }

        return recipes
      },
      set () {}
    }
  },
  methods: {
    onQuickSearch (searchKeywords) {
      this.searchKeywords = searchKeywords
    },
    onOrderBy (orderBy) {
      this.orderBy = orderBy
    },
    onSearching () {
      this.isSearching = true
    }
  }
}
</script>
