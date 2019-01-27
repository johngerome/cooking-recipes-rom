<template>
<div class="py-3">
  <v-layout column fill-height>
    <v-card flat v-if="recipes.length <= 0 && searchKeywords === ''">
      <v-card-title>
        <h3>Loading Recipes...</h3>
        <v-progress-linear :indeterminate="true"></v-progress-linear>
      </v-card-title>
    </v-card>

    <v-card flat v-if="isSearching">
      <v-card-title>
        <v-progress-linear :indeterminate="true"></v-progress-linear>
      </v-card-title>
    </v-card>

    <v-card flat v-if="recipes.length <= 0 && searchKeywords !== ''">
      <v-card-title>
        <v-alert :value="true" type="warning" class="flex xs12">
          No Recipe(s) found. Try a different search term.
        </v-alert>
      </v-card-title>
    </v-card>

    <v-flex xs12 v-for="(recipe, index) in recipes" :key="recipe.id">
      <v-card flat>
        <v-layout>
          <v-flex xs3 sm2 md1 class="pt-3 pl-3 text-xs-center">
            <img
              v-if="recipe.imageUrl"
              :src="recipe.imageUrl"
              class="recipe-img"
            />
          </v-flex>
          <v-flex xs9 sm10 md11>
            <v-card-title>
              <div class="flex xs12">
                <v-layout column>
                  <v-flex xs12
                    ><div class="title mb-2">{{ recipe.name }}</div></v-flex
                  >
                  <v-flex xs12>
                    <div class="mb-3">
                      <v-icon
                        small
                        color="orange"
                        v-for="index in parseInt(recipe.levelValue)"
                        :key="index"
                        >star</v-icon
                      >
                      <v-icon
                        small
                        color="orange"
                        v-if="recipe.levelValue % 1"
                        >star_border</v-icon
                      >
                    </div>
                  </v-flex>

                  <v-flex xs12>
                    <div class="mb-1">
                      <h4>Effects:</h4>
                      <p class="recipe-materials mb-2">
                        {{ recipe.nutritionvalue }}
                      </p>
                    </div>
                  </v-flex>

                  <v-flex xs12>
                    <v-layout row wrap>
                      <v-flex xs12 sm4 md3>
                        <h4 class="pb-1 pt-2">Durations:</h4>
                        <div class="recipe-materials pb-2">
                          {{ recipe.durations }}
                        </div>
                      </v-flex>
                      <v-flex xs12 sm8 md9>
                        <h4 class="pb-1 pt-2">HP/SP Discharge:</h4>
                        <span class="recipe-materials">
                          {{ recipe.discharge }}
                        </span>
                      </v-flex>
                    </v-layout>
                  </v-flex>

                  <v-flex xs12>
                    <v-layout row wrap>
                      <v-flex xs12 sm4 md3>
                        <h4 class="pb-1 pt-3">Ingredients:</h4>
                        <span
                          v-for="material in recipe.materials"
                          :key="material.id"
                          class="recipe-materials mr-1"
                        >
                          <v-tooltip bottom>
                            <span slot="activator">
                              <img
                                v-if="material.imageUrl"
                                :src="material.imageUrl"
                                width="30"
                              />
                              <span v-else>{{ material.name }}</span>
                            </span>
                            <span
                              >{{ material.name }} -
                              {{ material.npc }}</span
                            >
                          </v-tooltip>
                        </span>
                      </v-flex>
                      <v-flex xs12 sm8 md9>
                        <h4 class="pb-1 pt-3">Station:</h4>
                        <p class="recipe-materials">
                          <img :src="recipe.utensilImageUrl" height="15" />
                          {{ recipe.utensil }}
                          </p>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </div>
            </v-card-title>
          </v-flex>
        </v-layout>
      </v-card>
      <v-divider
        v-if="index + 1 < recipes.length"
        :key="`divider-${index}`"
      ></v-divider>
    </v-flex>
  </v-layout>
</div>
</template>

<script>
export default {
  name: 'RecipeList',
  props: [ 'recipes', 'searchKeywords', 'isSearching' ]
}
</script>

<style lang="scss" scoped>
.recipe-img {
  max-width: 100%;
  max-height: 60px;
}
.recipe-materials {
  color: #666;
}
.v-card {
  border-bottom: 0;

  h4 {
    color: #333;
  }
}
</style>
