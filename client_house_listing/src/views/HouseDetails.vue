<template>

<div class="house-details">
      <h1>Houses</h1>
        <ul>
        <li v-for="house in houses" :key="house.id" class="house">
          <img :src="house.image" alt="house_img" class="image">
          <div class="house-details"> 
          <div>{{ house.location.street}}-{{ house.location.houseNumber }}</div>
          <div>€{{ house.price }}</div>
          <div>{{ house.location.zip }}</div>
          <div>{{ house.location.city }}</div>
          <div>{{ house.size }}m2</div>
          <div>{{ house.rooms.bedrooms }}</div>
          <div>{{ house.rooms.bathrooms }}</div>
          <div>{{ house.hasGarages }}</div> 
          <div>{{ house.constructionYear }}</div> 
          <div>{{ house.description}}</div>
        </div>
        </li>
      </ul>
    </div>    
  </template>

  <script>
  import axios from 'axios'

  export default {
    data () {
        return {
            houses: [],
        };
    },
    created() {
        const houseId = this.$route.params.id; //retrieve the house id from route parameter
        console.log('House ID:', houseId); // Log the houseId
        this.getHouseDetails(houseId); //fetching house details
    },

    methods: {
        async getHouseDetails(id) {
            try {
                console.log('Fetching data for house ID:', id); // Log the request
                const response = await axios.get(
                    `https://api.intern.d-tt.nl/api/houses/${id}`,
                    {
                        headers: {'X-Api-Key': 'tMwx41d-hU2ej_r6PcpQkymCIHTSauFE',
                        },
                    }
                );
                console.log('Response:', response.data); // Log the response data
                this.houses = response.data;
            } catch (error){
                console.log(error);
            }
        },
    },
  };
</script>
  
  <style>
  
  </style>
  