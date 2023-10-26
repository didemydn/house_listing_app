<script>
import axios from 'axios'
import { RouterLink, RouterView } from 'vue-router'

export default {
  data() {
    return {
      houses: [],
    };    
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
  }, 

  created() {
    this.getData();
  },
};
</script>

<template>
  <div class="house-list">
      <h1>Houses</h1>
      <ul>
        <li v-for="house in houses" :key="house.id" class="house">
          <img :src="house.image" alt="house_img" class="image">
          <h2>{{ house.price }}</h2>
          <p>{{ house.location.city }}</p>
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

