<template>
  <div class="blue lighten-5">
    <v-container grid-list-md>
      <v-layout wrap align-center>
        <v-flex xs12 sm8 md9 d-flex>
          <v-text-field
            v-model="searchKeywords"
            label="Search by recipe, effect, station..."
            prepend-icon="search"
            clearable
            @input="onInputQuickSearch"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm4 md3 d-flex>
          <v-select
            :items="sorts"
            v-model="orderBy"
            label="Order by"
            prepend-icon="sort_by_alpha"
            @change="onOrderByChange"
          ></v-select>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import debounce from 'debounce'

export default {
  name: 'RecipeFilter',
  props: [ 'sorts', 'default-order' ],
  data () {
    return {
      orderBy: '',
      searchKeywords: ''
    }
  },
  mounted () {
    this.orderBy = this.defaultOrder
    // update the list's order
    this.onOrderByChange()
  },
  created () {
    // when the component has been created,
    // we replaced the original method with a debounced version
    this.onInputQuickSearch = debounce(this.onInputQuickSearch, 300)
  },
  watch: {
    searchKeywords () {
      this.$emit('on-input-searching')
    }
  },
  methods: {
    onInputQuickSearch () {
      this.$emit('on-input-search', this.searchKeywords)
    },
    onOrderByChange () {
      if (this.orderBy) {
        setTimeout(() => {
          this.$emit('on-change-order', this.orderBy)
        })
      }
    }
  }
}
</script>
