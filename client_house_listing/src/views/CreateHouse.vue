<template>
    <div class="create-listing">
        <h1>Create New Listing</h1>
            <form @submit.prevent="postHouse">
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
                    <input type="text" v-model="addition">
                </div>

                <div class="form">
                    <label>Postal code*</label>
                    <input type="text" required v-model="postalCode">
                </div>

                <div class="form">

            <label>City*</label>
            <input type="text" required v-model="city">
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
            <select v-model="garage">
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

            <div class="form">

            <label>Upload picture (PNG or JPG)*</label>
            <input type="file" ref="fileInput" required @change="handleFileChange">
        </div>

            <button type="submit">POST</button>

        </form>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data () {
        return {           
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
        }
    },

    methods: {
        handleFileChange(event) {
            this.image = event.target.files[0];
        },
        async postHouse() {
            //data to be sent to API
            console.log('Starting to post the house data...');
            const newHouse = {                
                streetName: this.streetName,
                houseNumber: this.houseNumber,
                numberAddition: this.addition,
                zip: this.postalCode,
                city: this.city,
                price: parseFloat(this.price),
                size: parseFloat(this.size),                
                bedrooms:parseInt(this.bedrooms),
                bathrooms:parseInt(this.bathrooms),
                constructionYear: parseInt(this.constructionYear),
                description: this.description,
                hasGarage: this.garage === 'true'
            };

            //post request to create a new house
            try {
                console.log('Sending a POST request to the API...');
                const response = await axios.post(
                    'https://api.intern.d-tt.nl/api/houses', 
                    newHouse, 
                    {
                headers: {
                    'X-Api-Key': process.env.API,
                    },    
                }
                );
                console.log('Response:', response); // Log the response
                if (response.status === 201) {
                    console.log('New house created successfully');
                    this.$router.push('/houses');


                    const id = response.data.id;
                    
                if (this.image) {
                    const formData = new FormData();
                    formData.append('image', this.image);
                    const imageUpload = await axios.post(`https://api.intern.d-tt.nl/api/houses/${id}/upload`,
                     formData,
                     {
                        headers: {
                            'X-Api-Key': process.env.API,
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
    };

</script>

<style>

.create-listing {
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