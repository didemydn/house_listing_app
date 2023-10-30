<template>
    <div>
        <h1>Create New Listing</h1>
            <form @submit.prevent="postHouse">
             <label>Street Name*</label>
             <input type="text" required v-model="streetName">

            <label>House Number*</label>
            <input type="number" required v-model="houseNumber">

            <label>Addition (optional)</label>
            <input type="text" required v-model="addition">

            <label>Postal code*</label>
            <input type="text" required v-model="postalCode">

            <label>City*</label>
            <input type="text" required v-model="city">

            <label>Price*</label>
            <input type="number" required v-model="price">

            <label>Size*</label>
            <input type="number" required v-model="size">

            <label>Garage*</label>
            <select v-model="garage">
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select>

            <label>Bedrooms*</label>
            <input type="number" required v-model="bedrooms">

            <label>Bathrooms*</label>
            <input type="number" required v-model="bathrooms">

            <label>Construction Date*</label>
            <input type="text" required v-model="constructionYear">

            <label>Description*</label>        
            <textarea required v-model="description"></textarea>

            <label>Upload picture (PNG or JPG)*</label>
            <input type="file" ref="fileInput" required @change="handleFileChange">

            <button type="submit">POST</button>

        </form>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data () {
        return {         
           StreetName: '',
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
           image: null
           };     
    },

    mounted(){
        //console.log(this.$route.params.id);
        this.getHouse(this.$route.params.id)
    },

    methods: {

        getHouse(id){
            axios.get(`https://api.intern.d-tt.nl/api/houses/${id}`).then((res) => {
                this.house = response.data.house;
            });
        },

        handleFileChange(event) {
            this.house.image = event.target.files[0];
        },
        async editHouse() {           
            //edit the existing house
            try {
                console.log('Sending to update the house...');
                const id = this.$route.params.id;

                const response = await axios.put(
                    `https://api.intern.d-tt.nl/api/houses/${id}`, 
                    this.house, 
                    {
                headers: {
                    'X-Api-Key': 'tMwx41d-hU2ej_r6PcpQkymCIHTSauFE',
                    },    
                }
                );
                console.log('Response:', response); // Log the response

                if (response.status === 200) {
                    console.log('house updated successfully');
                    this.$router.push(`/houses/${id}`);
                    
                if (this.image) {
                    const formData = new FormData();
                    formData.append('image', this.image);
                    const imageUpload = await axios.post(`https://api.intern.d-tt.nl/api/houses/${id}/upload`,
                     formData,
                     {
                        headers: {
                            'X-Api-Key': 'tMwx41d-hU2ej_r6PcpQkymCIHTSauFE',
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
</style>