<template>
    <div class="edit-listing">
        <h1>Edit Listing</h1>
            <form @submit.prevent="editHouse">
            <div class="form">
             <label>Street Name*</label>
             <input type="text" required v-model="streetName">
            </div>

            <div class="form">
                <label>House Number*</label>
                <input type="number" required v-model="houseNumber">
            </div>

            <div class="form">
                <label>Addition (optional)</label>
                <input type="text" v-model="numberAddition">
            </div>

            <div class="form">
                <label>Postal code*</label>
                <input type="text" required v-model="zip">
            </div>

            <div class="form">
                <label>City*</label>
                <input type="text" required v-model="city">
            </div>

            <div class="form">
                <label>Upload picture (PNG or JPG)*</label>
                <input type="file" ref="fileInput" @change="handleFileChange">
            <img 
                v-if="houses[0] && houses[0].image"
                :src="houses[0].image"
                alt="house_img"
                class="image-edit"
                style="width: 150px; height: 150px;">
            </div>

            <div class="form">
                <label>Price*</label>
                <input type="number" required v-model="price">
            </div>

            <div class="form">
                <label>Size*</label>
                <input type="number" required v-model="size">
            </div>

            <div class="form">
                <label>Garage*</label>
                <select v-model="hasGarage">
                 <option value="true">Yes</option>
                 <option value="false">No</option>
                </select>
            </div>

            <div class="form">
                <label>Bedrooms*</label>
                <input type="number" required v-model="bedrooms">
            </div>
            
            <div class="form">
                <label>Bathrooms*</label>
                <input type="number" required v-model="bathrooms">
            </div>

            <div class="form">
                <label>Construction Date*</label>
                <input type="text" required v-model="constructionYear">
            </div>

            <div class="form">
                <label>Description*</label>        
                <textarea required v-model="description"></textarea>
            </div>         

            <button type="submit">UPDATE</button>

        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data () {
        return {                    
            houses: [],   //to store house data 
            streetName: '',
            houseNumber: '',
            addition: '',
            postalCode: null,
            city: '',
            price: null,
            size: null,
            garage: 'false',
            bedrooms: null,
            bathrooms: null,
            constructionYear: '',
            description: '', 
            image: null,                   
        };     
    },

    mounted(){ //get the house data to fill again 
        const id = this.$route.params.id; 
        this.getHouse(id);
    },

    methods: { //handle file input for the house img
        handleFileChange(event) {
            this.image = event.target.files[0];
        },

        async getHouse(id) { //get the house data for editing 
            try {
                console.log('Fetching data for house ID:', id); // Log the request
                const response = await axios.get(
                    `https://api.intern.d-tt.nl/api/houses/${id}`,
                    {
                        headers: {'X-Api-Key': import.meta.env.VITE_APP_API_KEY,
                        },
                    }
                );
                console.log('Response:', response.data); // Log the response data
                this.houses = response.data; //populate form fields with fetched data 
                this.streetName = this.houses[0].location.street;
                this.houseNumber = this.houses[0].location.houseNumber;
                this.addition = this.houses[0].location.numberAddition;
                this.zip = this.houses[0].location.zip;
                this.city = this.houses[0].location.city;
                this.price = this.houses[0].price;
                this.size = this.houses[0].size;
                this.garage = this.houses[0].hasGarage;
                this.bedrooms = this.houses[0].rooms.bedrooms;
                this.bathrooms = this.houses[0].rooms.bathrooms;
                this.constructionYear = this.houses[0].constructionYear;
                this.description = this.houses[0].description;
            } catch (error){
                console.log(error);
            }            
        },
    
        async editHouse() {   //submit the updated data 
            const id = this.$route.params.id;        
            //edit the existing house
            console.log('Starting to edit the house data...');
            try {
                console.log('Sending to update the house...');
                const response = await axios.post( //send a request to update data 
                    `https://api.intern.d-tt.nl/api/houses/${id}`,                    
                    {                      
                        streetName: this.streetName,
                        houseNumber: this.houseNumber,
                        numberAddition: this.numberAddition,
                        zip: this.zip,
                        city: this.city,                        
                        price: parseFloat(this.price),
                        size: parseFloat(this.size),        
                        bedrooms:parseInt(this.bedrooms),
                        bathrooms:parseInt(this.bathrooms),                        
                        constructionYear: parseInt(this.constructionYear),
                        description: this.description,
                        hasGarage: this.hasGarage
                    }, 
                    {
                        headers: {
                            'X-Api-Key': import.meta.env.VITE_APP_API_KEY,
                        },    
                    }
                );
                console.log('Response:', response); // Log the response

                if (response.status === 200 || 201 || 204) {
                    console.log('house updated successfully');
                    this.$router.push(`/houses/${id}`);
                    
                    if (this.image) {//upload the img
                        const formData = new FormData();
                        formData.append('image', this.image);
                        const imageUpload = await axios.post(`https://api.intern.d-tt.nl/api/houses/${id}/upload`,
                            formData,
                            {
                                headers: {
                                 'X-Api-Key': import.meta.env.VITE_APP_API_KEY,
                                'Content-Type': 'multipart/form-data',                        
                                }
                            }
                    );
                    console.log('image uploaded:', imageUpload);
                }
                
            } else {
                    console.error('failed to create a new house. Status code:', response.status);
                }
               } catch (error) {
                console.error('Error creating a new house:', error);
               }
            },        
        },
    }
    

</script>

<style>
.edit-listing {
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 0 auto;
  font-family: 'Open Sans', sans-serif;
}

.form-group {
  margin: 10px 0;
}

label {
  font-weight: bold;
}

textarea {
  height: 100px;
}

button {
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

select,
input[type="text"],
input[type="number"],
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

</style>