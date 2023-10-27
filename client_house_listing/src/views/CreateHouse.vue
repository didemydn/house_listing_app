<template>
    <div>
        <h1>Create New Listing</h1>
            <form @submit.prevent="postHouse">
             <label>Street Name*</label>
             <input type="text" required v-model="streetName">

            <label>House Number*</label>
            <input type="text" required v-model="houseNumber">

            <label>Addition (optional)</label>
            <input type="text" required v-model="addition">

            <label>Postal code*</label>
            <input type="text" required v-model="postalCode">

            <label>City*</label>
            <input type="text" required v-model="city">

            <label>Upload Picture (PNG or JPG)*</label>
            <input type="file" accept='image/*' @change="handleImageUpload($event, houseId)">

            <label>Price*</label>
            <input type="number" required v-model="price">

            <label>Size*</label>
            <input type="number" required v-model="size">

            <label>Garage*</label>
            <select v-model="Garage">
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>

            <label>Bedrooms*</label>
            <input type="number" required v-model="bedrooms">

            <label>Bathrooms*</label>
            <input type="number" required v-model="bathrooms">

            <label>Construction Date*</label>
            <input type="text" required v-model="constructionDate">

            <label>Description*</label>        
            <textarea required v-model="description"></textarea>

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
           postalCode: '',
           city: '',
           price: '',
           size: '',
           garage: '',
           bedrooms: '',
           bathrooms: '',
           constructionDate: '',
           description: '', 
        };
    },

    methods: {
        async postHouse() {
            //data to be sent to API
            const newHouse = {
                streetName: this.streetName,
                houseNumber: this.houseNumber,
                addition: this.addition,
                postalCode: this.postalCode,
                city: this.city,
                price: this.price,
                size: this.size,
                garage: this.garage,
                bedrooms: this.bedrooms,
                bathrooms: this.bathrooms,
                constructionDate: this.constructionDate,
                description: this.description,
            };

            //post request to create a new house
            try {
                const response = await axios.post(
                    'https://api.intern.d-tt.nl/api/houses', 
                    newHouse, 
                    {
                headers: {
                    'X-Api-Key': 'tMwx41d-hU2ej_r6PcpQkymCIHTSauFE',
                    },        
                    }
             );
                if (response.status === 201) {
                    const createdHouse = response.data;
                    const houseId = createdHouse.id; //new house Id, need to upload an image to API
                    await this.uploadImage(houseId);
                } else {
                    console.error('failed to create a new house. Status code:', response.status);
                }                              
               } catch (error) {
                console.error('Error creating a new house:', error);
               }
        },    
        
        async uploadImage(houseId) {
            const fileData = this.$refs.imageUpload; 
            const file = fileData.files[0];

            if (!file) {
                console.log('no image selected for upload.');
                return;
            }

            try {
                const formData = newformData();
                formData.append('image', file);

                await axios.post(
                    `https://api.intern.d-tt.nl/api/houses/${houseId}/upload`,
          formData,
          {
            headers: {
              'X-Api-Key': 'tMwx41d-hU2ej_r6PcpQkymCIHTSauFE',
              'Content-Type': 'multipart/form-data',
            },
          }
                );

                console.log('image uploaded successfully');
            } catch (error) {
                console.log('error uploading the image',error);
            }
        },
        },        
    };

</script>

<style>
</style>