<script>
import axios from 'axios'
import { RouterLink, RouterView } from 'vue-router'

export default {
  data() {
    return {
      houses: [],
      searchQuery: '',
      sortBy: '',
      activeSortButton:'',
    };    
  },

  computed: {
    //filter houses as per search button
    filteredHouses() {
      return this.houses.filter((house) => {
        const streetSearch=house.location.street.toLowerCase().includes(this.searchQuery.toLowerCase());
        const citySearch=house.location.city.toLowerCase().includes(this.searchQuery.toLowerCase());
        const priceSearch=house.price === Number(this.searchQuery);
        const zipSearch=house.location.zip.toLowerCase().includes(this.searchQuery.toLowerCase());
        const sizeSearch=house.size === Number(this.searchQuery);
        return streetSearch || citySearch || priceSearch || zipSearch ||sizeSearch;
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
        'X-Api-Key': process.env.VUE_APP_API_KEY,
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
    this.activeSortButton = option;
    },  
  }, 

  created() {
    this.getData();
  },
};

</script>

<template>
  <div class="house-list">
    <div>
      <ul class="head-first"> 
        <li class="head-houses"><h1>Houses</h1></li>

        <li> 
        <router-link :to="'/houses/create'"  class="create-new">+ CREATE NEW</router-link>
        </li>
      </ul>
    </div>
    <div> 
      <ul class="head-second"> 
      <!--Search for a house-->
      <li class="search-house"> 
        <input v-model="searchQuery" placeholder="Search for a house"/> 
      </li>

      <!--Display the results-->
      <p v-if="searchQuery && filteredHouses.length > 0">
      {{ filteredHouses.length }} {{ filteredHouses.length > 1 ? 'results' : 'result' }} founded
      </p>
      <p v-else-if="searchQuery && filteredHouses.length === 0">      
        No results found. Please try another keyword. 
      </p>
             
      <!--Sort button for price and size-->
      <li class="sort-buttons">
        <button class="price" @click="sortByOption('price')" :class=" { active: activeSortButton === 'price'}">Price</button>
        <button class="size" @click="sortByOption('size')" :class=" { active: activeSortButton === 'size'}">Size</button>
      </li>
    </ul>
  </div>
      
      <div v-for="house in sortedHouses" :key="house.id" class="house">
          <router-link :to="'/houses/' + house.id" style="text-decoration: none;">
          <ul class="house-box">
            <li><img :src="house.image" alt="house_img" class="image"></li>
            <ul class="house-details">        
              <li class="item" style="font-size: 16px; font-weight: bold;">{{ house.location.street}}-{{ house.location.houseNumber }}</li>
              <li class="item">€{{ house.price }}</li>
              <li class="item">{{ house.location.zip }} {{ house.location.city }}</li>             
              <li class="item icons">
                <img src="@/assets/bedroom-icon.png" alt="Bedroom Icon" class="icon">
                {{ house.rooms.bedrooms }} 
                <img src="@/assets/bath-icon.png" alt="Bath Icon" class="icon">
                {{ house.rooms.bathrooms }} 
                <img src="@/assets/size-icon.png" alt="Size Icon" class="icon">
                {{ house.size }}m2</li>              
            </ul>         
          </ul>
        
      </router-link>
    </div>      
  </div>
</template>


<style scoped>
.create-new {
 background-color: #EB5440;
 text-decoration: none;
 color: white;
 padding: 5px 10px;
 font-weight: bold;  
}

.head-first {
  list-style-type: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.head-second {
  list-style-type: none;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.search-house {
  margin-right: 60px;
}

.price {
 background-color: #C3C3C3;
 color: white;
 padding: 5px 20px;
 font-weight: bold;
 border-radius: 10%;
}

.size {
 background-color: #C3C3C3;
 color: white;
 padding: 5px 20px;
 font-weight: bold;
 border-radius: 10%;
}

.price.active, .size.active {
  background-color: #EB5440;
}

.house-list {
 margin-left: 30px;
 margin-right: 30px;
 background-color: #F6F6F6;  
 font-family: 'Open Sans', sans-serif;  
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
  margin-right: 250px;
  margin-left: 250px;
  display: flex;
  align-items: center;
  background-color: #FFFFFF;
  flex-direction: row;  
}

.house-box {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  list-style-type: none; 
}

.house-details {
  display: flex;
  flex-direction: column;
  list-style-type: none;
  color: black;
}

.item {
  margin-bottom: 5px;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
}

.icons {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-end;
}

.icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

.image {
  width: 100px;
  height: 100px;
  border-radius: 20%;
}

@media (max-width: 768px) {
  .create-new {
    font-size: 16px;
  }
  
  .head-first {
    flex-direction: row;
    display: flex;
    flex-wrap: nowrap;
    align-items: baseline;
    padding: 5px;
  }

  .head-second {
    flex-direction: row;
    display: flex;
    padding: 5px;
    justify-content: space-between;
    align-items: flex-end;
  }

  .search-house {
    margin-right: 0;
  }

  .price, .size {
    padding: 5px 10px;
  }

  .house {
    margin-right: 10px;
    margin-left: 10px;
    flex-direction: column;
  }

  .house-box {
    display: flex;
    flex-direction: row;
    list-style-type: none;
    flex-wrap: nowrap;
    padding-left: 5px;
}

  .house-details {
    font-size: 12px;
    padding-left: 3px;
  }

  .house-list h1 {
    margin-bottom: 10px;
    margin-left: 0;
    font-size: 16px;
  }
}
</style>

