<template>
    <div class="house-details">
      <h1>Houses</h1>
        <ul>
            
        <li v-for="house in houses" :key="house.id" class="house">
          <img :src="house.image" alt="house_img" class="image">     
          <div class="buttons">
            <router-link :to="'/houses/' + house.id + '/edit'">Edit</router-link>
            <button @click="deleteHouse(house.id)">Delete</button>
        </div>     
          <div class="house-details"> 
            <div class="detail-street">{{ house.location.street}}-{{ house.location.houseNumber }}</div>
            <div class="detail">€{{ house.price }}</div>
            <div class="detail">{{ house.location.zip }}</div>
            <div class="detail">{{ house.location.city }}</div>
            <div class="detail">{{ house.size }}m2</div>
            <div class="detail">{{ house.rooms.bedrooms }}</div>
            <div class="detail">{{ house.rooms.bathrooms }}</div>
            <div class="detail">{{ house.hasGarages }}</div> 
            <div class="detail">{{ house.constructionYear }}</div> 
            <div class="=detail">{{ house.description}}</div>
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
  
<style scoped>
    .house-details {
        font-family: sans-serif;
        max-width: 400px;
        margin: 0 auto;
        padding: 20px;
    }

    .house {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .image {
        width: 500px;
        height: 500px;        
    }

    .detail-street {
        font-weight: bold;
        margin-bottom: 5px;
        font-size: 25px;
    }

    .detail {
        margin-bottom: 5px;
    }

</style>
  