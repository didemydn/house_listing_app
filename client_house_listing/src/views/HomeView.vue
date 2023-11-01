<script>
import axios from 'axios'
import { RouterLink, RouterView } from 'vue-router'

export default {
  data() {
    return {
      houses: [],
      searchQuery: '',
      sortBy: '',
    };    
  },

  computed: {
    //filter houses as per search button
    filteredHouses() {
      return this.houses.filter((house) => {
        return house.location.city.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    },

    //sort houses as per sort buttons (price and size)

    sortedHouses() {
      let sorted = [...this.filteredHouses]; //copy filteredhouses to keep original data    
    if (this.sortBy === 'price') {
      sorted = sorted.sort((a,b) => a.price - b.price);
    } else if (this.sortBy === 'size') {
      sorted = sorted.sort((a,b) => a.size - b.size);
    }
    return sorted;
  },
  },

  methods: {
    async getData() {
      try {
        const response = await axios.get(
          'https://api.intern.d-tt.nl/api/houses', {
      headers: {
        'X-Api-Key': 'tMwx41d-hU2ej_r6PcpQkymCIHTSauFE',
      },
    }
    );
    this.houses = response.data;
      } catch (error){
        console.log(error);
      }
    },

    sortByOption(option) {
    this.sortBy = option;
  },  
  }, 

  created() {
    this.getData();
  },
};
</script>

<template>
  <div class="house-list">
      <h1>Houses</h1>
      <router-link :to="'/houses/create'">+ CREATE NEW</router-link>
      <!--Search for a house-->
      <input v-model="searchQuery" placeholder="Search for a house"/> 
      <!--Display the results-->
      <p v-if="searchQuery && filteredHouses.length > 0">
      {{ filteredHouses.length }} {{ filteredHouses.length > 1 ? 'results' : 'result' }} founded
      </p>
      <p v-else-if="searchQuery && filteredHouses.length === 0">      
        No results found. Please try another keyword. 
      </p>
       
      <!--Sort button for price and size-->
      <div class="sort-buttons">
        <button @click="sortByOption('price')">Price</button>
        <button @click="sortByOption('size')">Size</button>
      </div>

      
        <div v-for="house in sortedHouses" :key="house.id" class="house">
          <router-link :to="'/houses/' + house.id">
          <div class="image-container">
            <img :src="house.image" alt="house_img" class="image">
          </div>
        
          <div class="house-details"> 
            <h1>deneme</h1>  
          </div>
      
      </router-link>
    </div>      
    </div>
</template>


<style scoped>

  .house-list {
  margin-left: 30px;
  margin-right: 30px;
  background-color: #F6F6F6;  
}

.house-list h1 {
  margin-left: 80px;
  margin-top: 30px;
  background-color: #F6F6F6;  
}

.house {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 1rem;
  margin: 10px;
  margin-right: 150px;
  margin-left: 150px;
  display: flex;
  align-items: center;
  background-color: #FFFFFF;
  flex-direction: row;
  
}

.image-container {
  width: 100px;
  height: 100px;
  margin-right: 1rem;
  border-radius: 10%;
  display: flex;
  align-items: center;
}
.house-details{
  display: flex;
}
.house-details-list {  
  list-style-type: none;
  margin-right: 100px;
}

.image {
  width: 100px;
  height: 100px;
  border-radius: 20%;
}

.house h2{
  font-size: 1.5rem;
}

.house p{
  font-size: 1.5rem;
}


</style>

