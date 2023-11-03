<template>
    <div style="background-color: #F6F6F6;">
      <h1>Houses</h1>
        <ul v-for="house in houses" :key="house.id" class="house-details">
          <li class="image-cont"><img :src="house.image" alt="house_img" class="image"></li>     
          <li class="buttons">
            <router-link :to="'/houses/' + house.id + '/edit'" style="text-decoration: none;"><img src="@/assets/edit-icon.png" alt="Edit Icon" class="icon"></router-link>
            <button @click="confirmDelete(house.id)" class="delete-button"><img src="@/assets/delete-icon.png" alt="Delete Icon" class="icon"></button>
          </li>     
          <ul class="house-info"> 
            <li class="detail" style="font-size: 22px; font-weight: bold;">{{ house.location.street}}-{{ house.location.houseNumber }}</li>
            <li class="detail">
                <img src="@/assets/location-icon.png" alt="Location Icon" class="icon"> {{ house.location.zip }} {{ house.location.city }}</li>           
            <li class="detail">
                <img src="@/assets/euro-icon.jpg" alt="Price Icon" class="icon"> {{ house.price }}
                <img src="@/assets/size-icon.png" alt="Size Icon" class="icon"> {{ house.size }}m2
                <img src="@/assets/built-icon.png" alt="Built Icon" class="icon"> Built in {{ house.constructionYear }}</li>
            <li class="detail">
                <img src="@/assets/bedroom-icon.png" alt="Bedroom Icon" class="icon"> {{ house.rooms.bedrooms }}
                <img src="@/assets/bath-icon.png" alt="Bath Icon" class="icon"> {{ house.rooms.bathrooms }}
                <img src="@/assets/garage-icon.png" alt="Garage Icon" class="icon">
                <span v-if="house.hasGarage">Yes</span>
                <span v-else>No</span></li>            
            <li class="=detail">{{ house.description}}</li>
          </ul>
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

        confirmDelete(id) {
            const askDelete = window.confirm('Are you sure? You will delete this house.');
            if (askDelete) {
                this.deleteHouse(id);
            }
        },

        async deleteHouse(id) {
            try {
                const response = await axios.delete(`https://api.intern.d-tt.nl/api/houses/${id}`,{
                    headers: {
                        'X-Api-Key': 'tMwx41d-hU2ej_r6PcpQkymCIHTSauFE',
                    },
                });

                if (response.status === 200 || 204) {
                    console.log('House deleted successfully');
                    this.$router.push('/houses');
                } else {
                    console.log('failed to delete the house', response.status)
                }
            } catch (error) {
                console.log('error deleting the house', error);
            }
        },
    },
  };
</script>
  
<style scoped>
    .house-details {
        background-color: white;
        max-width: 400px;
        margin: 0 auto;
        padding: 20px;
        list-style-type: none;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        font-family: 'Open Sans', sans-serif; 
    }    
    .buttons {   
    padding: 5px 10px;
    font-weight: bold;  
    display: flex;
    flex-direction: row;
    align-items: center;
    }

    .delete-button {
        background-color: transparent;
        border: none;
    }

    .house-info {
        background-color: white;
        max-width: 400px;
        margin-bottom: 20px;       
        padding: 20px;
        list-style-type: none;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        font-family: 'Open Sans', sans-serif; 
    }

    .house {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .image {
        width: 300px;
        height: 300px;  
           
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

</style>
  