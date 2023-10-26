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


      <ul>
        <li v-for="house in sortedHouses" :key="house.id" class="house">
          <router-link :to="'/houses/' + house.id">
          <img :src="house.image" alt="house_img" class="image">
          <div class="house-details"> 
          <div>{{ house.location.street}}-{{ house.location.houseNumber }}</div>
          <div>€{{ house.price }}</div>
          <div>{{ house.location.zip }}</div>
          <div>{{ house.location.city }}</div>
          <div>{{ house.size }}m2</div>
          <div>{{ house.rooms.bedrooms }}</div>
          <div>{{ house.rooms.bathrooms }}</div>
        </div>
      </router-link>
        </li>
      </ul>
    </div>
</template>


<style scoped>
  .house-list {
  margin: 2rem 0;
}

.house {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  display: flex;
  align-items: center;
}
.house .image {
  width: 100px;
  height: 100px;
  margin-right: 1rem;
}

.house h2{
  font-size: 1.5rem;
}

.house p{
  font-size: 1.5rem;
}

</style>

